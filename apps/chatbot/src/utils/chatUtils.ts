import axios from 'axios';

export const generateId = (): string =>
  Math.random().toString(36).substr(2, 9);

export const getTypingDelay = (text: string): number =>
  Math.min(2000, text.length * 50);

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not defined in your .env');
}

const MODEL_ID = 'gemini-1.5-pro-latest';

const GEMINI_API_URL =
  `https://generativelanguage.googleapis.com/v1beta/` +
  `models/${MODEL_ID}:generateContent?key=${API_KEY}`;


export const generateBotResponse = async (
  userInput: string
): Promise<string> => {
  try {
    const payload = {
      contents: [
        {
          role: 'user',         
          parts: [{ text: userInput }]
        }
      ]
    };

    const resp = await axios.post(GEMINI_API_URL, payload);
    const text =
      resp.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    return text || "Sorry, I didn't catch that. Can you rephrase?";
  } catch (err) {
    console.error('Gemini API error:', err);
    return 'Oops—something went wrong. Please try again later.';
  }
};
