import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuditService } from '../audit/audit.service';
import { ChatRepository } from './chat.repository';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { ChatMessageRole } from '@prisma/client';
import { randomUUID } from 'crypto';

const FALLBACK_RESPONSE =
  'I’m having trouble reaching my AI engine right now. Your message was saved, and you can try again in a moment.';

const NO_CREDITS_RESPONSE =
  'The assistant is configured, but the xAI account does not have active credits or license access yet. Please add credits in the xAI console and try again.';

const OLLAMA_UNAVAILABLE_RESPONSE =
  'The chatbot fallback is set to Ollama, but Ollama is not reachable. Start Ollama locally and pull the configured model, then try again.';

const XAI_AND_OLLAMA_UNAVAILABLE_RESPONSE =
  'xAI is unavailable for this account and Ollama fallback is not reachable. Add xAI credits or start Ollama locally to continue.';

const DEFAULT_MODEL = 'grok-4-0709';
const XAI_CHAT_URL = 'https://api.x.ai/v1/chat/completions';
const DEFAULT_PROVIDER = 'auto';
const DEFAULT_OLLAMA_BASE_URL = 'http://localhost:11434';
const DEFAULT_OLLAMA_MODEL = 'llama3.1:8b';
const DEFAULT_XAI_TIMEOUT_MS = 15_000;
const DEFAULT_OLLAMA_TIMEOUT_MS = 45_000;
const DEFAULT_MAX_OUTPUT_TOKENS = 280;
const DEFAULT_TEMPERATURE = 0.25;

type AiProvider = 'xai' | 'ollama';

type GrokMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type ProviderResult = {
  text: string;
  provider: AiProvider;
  model: string;
};

type ChatApiMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  model: string | null;
  requestId: string | null;
};

type ChatHistoryResponse = {
  conversationId: string | null;
  messages: ChatApiMessage[];
};

type FinanceContext = Awaited<ReturnType<ChatRepository['getFinanceContext']>>;

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly audit: AuditService,
    private readonly config: ConfigService,
  ) {}

  async history(userId: string) {
    const conversation = await this.chatRepository.listHistoryForUser(userId);

    return {
      conversationId: conversation?.id ?? null,
      messages: this.serializeMessages(conversation?.messages ?? []),
    } as ChatHistoryResponse;
  }

  publicHistory() {
    return {
      conversationId: null,
      messages: [],
    } as ChatHistoryResponse;
  }

  async sendMessage(userId: string, dto: CreateChatMessageDto, requestId?: string) {
    const conversation =
      dto.conversationId
        ? await this.chatRepository.getConversationForUser(userId)
        : await this.chatRepository.ensureConversationForUser(userId);

    const activeConversation = conversation ?? (await this.chatRepository.ensureConversationForUser(userId));

    const configuredXaiModel = this.config.get<string>('XAI_MODEL') ?? DEFAULT_MODEL;

    const userMessage = await this.chatRepository.createMessage({
      conversationId: activeConversation.id,
      userId,
      role: ChatMessageRole.USER,
      content: dto.message,
      requestId,
      model: configuredXaiModel,
    });

    await this.audit.log({
      actorId: userId,
      action: 'chat.message.create',
      resource: 'chat_message',
      metadata: {
        conversationId: activeConversation.id,
        messageId: userMessage.id,
      },
      requestId,
    });

    const financeContext = await this.chatRepository.getFinanceContext(userId);
    const conversationHistory = activeConversation.messages.slice(-10).map((message) => ({
      role: message.role === ChatMessageRole.ASSISTANT ? 'assistant' : message.role === ChatMessageRole.USER ? 'user' : 'system',
      content: message.content,
    })) as GrokMessage[];

    const systemPrompt = this.buildSystemPrompt(financeContext);
    const assistantResult = await this.generateAssistantReply(
      systemPrompt,
      [...conversationHistory, { role: 'user', content: dto.message } as GrokMessage],
    );

    const assistantMessage = await this.chatRepository.createMessage({
      conversationId: activeConversation.id,
      userId,
      role: ChatMessageRole.ASSISTANT,
      content: assistantResult.text,
      requestId,
      model: assistantResult.model,
    });

    await this.audit.log({
      actorId: userId,
      action: 'chat.airesponse.generate',
      resource: 'chat_message',
      metadata: {
        conversationId: activeConversation.id,
        messageId: assistantMessage.id,
        model: assistantResult.model,
        provider: assistantResult.provider,
      },
      requestId,
    });

    return {
      conversationId: activeConversation.id,
      userMessage: this.serializeMessage(userMessage),
      assistantMessage: this.serializeMessage(assistantMessage),
      messages: this.serializeMessages([userMessage, assistantMessage]),
    };
  }

  async sendPublicMessage(dto: CreateChatMessageDto, requestId?: string) {
    const financeContext: FinanceContext = {
      budget: null,
      transactions: [],
    };

    const systemPrompt = this.buildSystemPrompt(financeContext);
    const assistantResult = await this.generateAssistantReply(systemPrompt, [
      { role: 'user', content: dto.message },
    ]);

    const createdAt = new Date().toISOString();

    const userMessage: ChatApiMessage = {
      id: randomUUID(),
      role: 'user',
      content: dto.message,
      createdAt,
      model: assistantResult.model,
      requestId: requestId ?? null,
    };

    const assistantMessage: ChatApiMessage = {
      id: randomUUID(),
      role: 'assistant',
      content: assistantResult.text,
      createdAt,
      model: assistantResult.model,
      requestId: requestId ?? null,
    };

    return {
      conversationId: null,
      userMessage,
      assistantMessage,
      messages: [userMessage, assistantMessage],
    };
  }

  private serializeMessages(messages: Array<{
    id: string;
    role: ChatMessageRole;
    content: string;
    createdAt: Date;
    model: string | null;
    requestId: string | null;
  }>) {
    return messages.map((message) => this.serializeMessage(message));
  }

  private serializeMessage(message: {
    id: string;
    role: ChatMessageRole;
    content: string;
    createdAt: Date;
    model: string | null;
    requestId: string | null;
  }): ChatApiMessage {
    return {
      id: message.id,
      role: message.role === ChatMessageRole.ASSISTANT ? 'assistant' : 'user',
      content: message.content,
      createdAt: message.createdAt.toISOString(),
      model: message.model,
      requestId: message.requestId,
    };
  }

  private buildSystemPrompt(financeContext: FinanceContext) {
    const budgetLine = financeContext.budget
      ? `Current month budget: ${financeContext.budget.amount.toString()} for ${financeContext.budget.month}/${financeContext.budget.year}.`
      : 'No current month budget is set yet.';

    const transactionsLine = financeContext.transactions.length
      ? financeContext.transactions
          .map((transaction) => {
            const categoryName = transaction.category?.name ?? 'Uncategorized';
            const note = transaction.note ? ` - ${transaction.note}` : '';
            return `${transaction.happenedAt.toISOString().slice(0, 10)} | ${transaction.type} | ${transaction.amount.toString()} | ${categoryName}${note}`;
          })
          .join('\n')
      : 'No recent transactions recorded.';

    return [
      'You are Money Mentor, a practical, supportive finance assistant.',
      'Use concise, actionable advice and keep the tone calm and direct.',
      'Answer the user\'s exact question first, then provide short next steps only if needed.',
      'Keep replies focused on the user\'s request; avoid unrelated tips and avoid long generic lectures.',
      'Prefer clear steps users can do inside Money Mentor right now.',
      'Do not claim to be a financial advisor or provide certainty about outcomes.',
      'Never suggest using external finance tracking apps or competitors (for example Mint, YNAB, Personal Capital, or similar tools).',
      'Always guide users to use Money Mentor for tracking transactions, setting budgets, and reviewing progress.',
      'When asking users to track spending or income, explicitly tell them to log it in Money Mentor.',
      'Do not invent user data, balances, or transaction details that are not present in context.',
      'Do not provide unrealistic examples (such as impossible savings rates, guaranteed returns, or made-up account outcomes).',
      'If context is missing, say what is missing and ask one concise clarifying question.',
      'When giving numbers, use only the provided context and state assumptions explicitly.',
      'When relevant, reference the user\'s current budget and recent spending patterns.',
      budgetLine,
      'Recent transactions:',
      transactionsLine,
    ].join('\n');
  }

  private getModelTimeoutMs(provider: AiProvider) {
    const configuredGlobal = this.config.get<number>('AI_MODEL_TIMEOUT_MS');
    if (configuredGlobal && configuredGlobal > 0) {
      return configuredGlobal;
    }

    if (provider === 'xai') {
      const configuredXai = this.config.get<number>('XAI_TIMEOUT_MS');
      return configuredXai && configuredXai > 0 ? configuredXai : DEFAULT_XAI_TIMEOUT_MS;
    }

    const configuredOllama = this.config.get<number>('OLLAMA_TIMEOUT_MS');
    return configuredOllama && configuredOllama > 0 ? configuredOllama : DEFAULT_OLLAMA_TIMEOUT_MS;
  }

  private createAbortController(provider: AiProvider) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.getModelTimeoutMs(provider));
    return { controller, timeout };
  }

  private async generateAssistantReply(
    systemPrompt: string,
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  ): Promise<ProviderResult> {
    const order = this.getProviderOrder();

    let sawXaiCreditError = false;
    let sawOllamaError = false;

    for (const provider of order) {
      try {
        if (provider === 'xai') {
          return await this.generateWithXai(systemPrompt, messages);
        }

        return await this.generateWithOllama(systemPrompt, messages);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        if (provider === 'xai') {
          if (/does not have permission|doesn\'?t have any credits|credits|license/i.test(message)) {
            sawXaiCreditError = true;
          }
          console.error('xAI chat error:', error);
        } else {
          sawOllamaError = true;
          console.error('Ollama chat error:', error);
        }
      }
    }

    if (sawXaiCreditError && sawOllamaError) {
      return {
        text: XAI_AND_OLLAMA_UNAVAILABLE_RESPONSE,
        provider: 'xai',
        model: this.config.get<string>('XAI_MODEL') ?? DEFAULT_MODEL,
      };
    }

    if (sawXaiCreditError) {
      return {
        text: NO_CREDITS_RESPONSE,
        provider: 'xai',
        model: this.config.get<string>('XAI_MODEL') ?? DEFAULT_MODEL,
      };
    }

    if (sawOllamaError) {
      return {
        text: OLLAMA_UNAVAILABLE_RESPONSE,
        provider: 'ollama',
        model: this.config.get<string>('OLLAMA_MODEL') ?? DEFAULT_OLLAMA_MODEL,
      };
    }

    return {
      text: FALLBACK_RESPONSE,
      provider: 'xai',
      model: this.config.get<string>('XAI_MODEL') ?? DEFAULT_MODEL,
    };
  }

  private getProviderOrder(): AiProvider[] {
    const configured = (this.config.get<string>('AI_PROVIDER') ?? DEFAULT_PROVIDER).toLowerCase();
    const hasXaiKey = Boolean(this.config.get<string>('XAI_API_KEY'));

    if (configured === 'xai') {
      return hasXaiKey ? ['xai'] : ['ollama'];
    }

    if (configured === 'ollama') {
      return ['ollama'];
    }

    return hasXaiKey ? ['xai', 'ollama'] : ['ollama'];
  }

  private async generateWithXai(
    systemPrompt: string,
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  ): Promise<ProviderResult> {
    const apiKey = this.config.get<string>('XAI_API_KEY');
    const model = this.config.get<string>('XAI_MODEL') ?? DEFAULT_MODEL;

    if (!apiKey) {
      throw new Error('XAI_API_KEY is not configured');
    }

    const { controller, timeout } = this.createAbortController('xai');

    let response: Response;
    try {
      response = await fetch(XAI_CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          temperature: DEFAULT_TEMPERATURE,
          max_tokens: DEFAULT_MAX_OUTPUT_TOKENS,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.filter((message) => message.role !== 'system'),
          ],
        }),
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`xAI request timed out after ${this.getModelTimeoutMs('xai')}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`xAI request failed with status ${response.status}: ${errorText}`);
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };
    const text = data.choices?.[0]?.message?.content?.trim();

    return {
      text: text || FALLBACK_RESPONSE,
      provider: 'xai',
      model,
    };
  }

  private async generateWithOllama(
    systemPrompt: string,
    messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  ): Promise<ProviderResult> {
    const baseUrl = (this.config.get<string>('OLLAMA_BASE_URL') ?? DEFAULT_OLLAMA_BASE_URL).replace(/\/$/, '');
    const model = this.config.get<string>('OLLAMA_MODEL') ?? DEFAULT_OLLAMA_MODEL;

    const { controller, timeout } = this.createAbortController('ollama');

    let response: Response;
    try {
      response = await fetch(`${baseUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          stream: false,
          options: {
            temperature: DEFAULT_TEMPERATURE,
            num_predict: DEFAULT_MAX_OUTPUT_TOKENS,
          },
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.filter((message) => message.role !== 'system'),
          ],
        }),
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(`Ollama request timed out after ${this.getModelTimeoutMs('ollama')}ms`);
      }
      throw error;
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ollama request failed with status ${response.status}: ${errorText}`);
    }

    const data = (await response.json()) as {
      message?: { content?: string };
    };

    const text = data.message?.content?.trim();

    return {
      text: text || FALLBACK_RESPONSE,
      provider: 'ollama',
      model,
    };
  }
}
