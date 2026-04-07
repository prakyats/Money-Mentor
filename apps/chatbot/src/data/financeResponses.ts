const financeResponses: Record<string, string[]> = {
  greeting: [
    "Hello! I'm here to help you with your financial journey. How can I assist you today?",
    "Hi there! Ready to take control of your finances? Let's get started!",
    "Welcome to your financial companion. What would you like to discuss?",
    "Hey! Need help with saving, investing, or budgeting? I've got your back.",
    "Greetings! Your financial wellness matters. How can I help?",
    "Hi! I'm your money-smart assistant. What questions do you have?",
    "Hello and welcome! Whether it's taxes or investments, I'm here for you.",
    "Glad to see you! Let's tackle your financial goals together.",
    "Hi there! Feel free to ask anything about personal finance.",
    "Hello! Let's make your money work smarter. What's on your mind?"
  ],

  investment: [
    "Diversifying your portfolio is crucial—stocks, bonds, and real estate all play a part.",
    "Have you considered index funds for low-cost, diversified investing?",
    "Want to start investing? Begin with small, consistent contributions.",
    "High risk often brings high reward, but don't forget your risk tolerance.",
    "Compound interest is your best friend—start early!",
    "ETFs offer a great mix of diversification and flexibility.",
    "Cryptocurrency is trending—interested in the risks and rewards?",
    "Rebalancing your portfolio ensures it aligns with your goals. Need help?",
    "Interested in sustainable investing or ESG funds?",
    "Not sure how much to invest monthly? I can help calculate that."
  ],

  budget: [
    "Do you follow a monthly budget? I can help you build one.",
    "Tracking your expenses is the first step toward financial clarity.",
    "The 50/30/20 rule is a good starting point. Want to apply it?",
    "Apps like YNAB and Mint can help automate your budgeting. Want suggestions?",
    "Are you overspending in any category? Let's take a look together.",
    "Budgeting doesn't mean cutting out fun—just balancing it!",
    "Need help preparing for irregular expenses?",
    "Emergency funds are a key part of any budget. Do you have one?",
    "Budgeting can reduce stress and increase savings. Want tips?",
    "Let's review your fixed vs. variable expenses. Need a breakdown?"
  ],

  retirement: [
    "When would you like to retire? That helps set a savings goal.",
    "Do you contribute to a retirement account like a 401(k) or IRA?",
    "Roth IRA or Traditional IRA—which is best for you? I can explain.",
    "The earlier you start, the better, thanks to compounding.",
    "Do you have an estimate of your retirement expenses?",
    "Want to calculate how much you'll need to retire comfortably?",
    "Let's explore how Social Security might fit into your retirement plan.",
    "Do you need help reallocating your retirement portfolio?",
    "Healthcare costs can be a big retirement expense. Prepared for that?",
    "Need help building a withdrawal strategy for retirement income?"
  ],

  taxes: [
    "Do you know your current tax bracket? I can help you find out.",
    "Want to reduce taxes? Let's look into deductions and credits.",
    "Tax-loss harvesting can help offset gains. Interested?",
    "Contributing to a traditional IRA or 401(k) may lower taxable income.",
    "Roth contributions are taxed now, but withdrawals are tax-free later.",
    "Charitable donations can offer deductions. Want to learn more?",
    "Are you self-employed? Let's talk about business expense deductions.",
    "Filing jointly or separately? That impacts your tax liability.",
    "Need help understanding capital gains tax?",
    "Want tips to prepare for tax season in advance?"
  ],

  creditScore: [
    "Do you know your current credit score? Let's start there.",
    "Paying bills on time is the biggest factor in your credit score.",
    "Keep credit utilization below 30% to boost your score.",
    "Do you review your credit report annually? I can help you do it.",
    "Limiting new credit applications can help maintain your score.",
    "Want to build credit from scratch? There are safe ways to start.",
    "Mix of credit (cards, loans) shows responsible borrowing habits.",
    "Errors on your credit report? Let's talk about fixing them.",
    "Want to improve your credit for a loan or mortgage?",
    "Secured credit cards are a good option for rebuilding credit."
  ],

  debt: [
    "What kind of debt are you managing? I can tailor advice.",
    "Let's compare debt avalanche vs. debt snowball. Want help choosing?",
    "Debt consolidation can simplify payments. Want to explore that?",
    "High-interest debt should usually be paid off first. Need a plan?",
    "Need tips for negotiating lower interest rates?",
    "Are student loans weighing you down? Income-based plans may help.",
    "Let's create a debt payoff timeline that works for you.",
    "Avoiding new debt is key—need help managing spending?",
    "Emergency savings can prevent new debt in crises. Want to build one?",
    "Balance transfers can offer relief, but know the terms. Want details?"
  ],

  insurance: [
    "Do you have life or health insurance? Let's review your coverage.",
    "Term vs. whole life insurance—which fits your needs?",
    "Bundling home and auto insurance can save money. Interested?",
    "How much life insurance coverage do you actually need?",
    "Health insurance deductibles and copays can be confusing. Want clarity?",
    "Have you considered disability or critical illness coverage?",
    "Insurance isn't one-size-fits-all. I can help customize your plan.",
    "Are your beneficiaries up-to-date on your policies?",
    "Traveling frequently? Travel insurance might be worth it.",
    "Need help understanding liability vs. comprehensive coverage?"
  ],

  estate: [
    "Do you have a will or living trust in place?",
    "Who would manage your finances if you're incapacitated? Let's set that up.",
    "Estate planning includes more than just a will. Want a checklist?",
    "Have you designated beneficiaries for all your accounts?",
    "Trusts can help avoid probate. Want to learn how they work?",
    "Need help with power of attorney or healthcare directives?",
    "Gifting strategies can reduce estate taxes. Interested?",
    "What's your plan for digital assets like crypto or online accounts?",
    "Do you want to ensure a smooth transition of assets for your family?",
    "Let's talk about planning for minor children or dependents."
  ],

  fallback: [
    "I'm here to help—could you tell me more about your financial goal?",
    "Can you clarify your question a bit? I want to give you the best advice.",
    "Let me know what you're aiming for—saving, investing, or something else?",
    "Not sure I got that. Can you rephrase or give an example?",
    "Hmm, I didn't catch that. Are you asking about taxes, investments, or budgeting?",
    "Let's dig deeper. Can you tell me your current financial situation?",
    "I want to guide you properly—what are you trying to achieve financially?",
    "To offer better advice, could you share more details or context?",
    "I'm not quite sure how to help yet—can you specify the topic?",
    "That's a great question! A bit more info will help me tailor the answer."
  ]
};

export default financeResponses;
