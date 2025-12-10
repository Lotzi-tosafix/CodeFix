import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const askAiTutor = async (
  question: string, 
  context: string, 
  language: 'en' | 'he'
): Promise<string> => {
  const client = getClient();
  if (!client) return "Error: API Key is missing.";

  const langPrompt = language === 'he' ? "Answer in Hebrew." : "Answer in English.";
  
  const systemPrompt = `
    You are CodeFix AI, a friendly, encouraging, and expert coding tutor. 
    Your goal is to explain web development concepts to a student.
    The student is currently looking at this lesson content: "${context}".
    
    The student asks: "${question}"
    
    Provide a concise, clear, and encouraging answer. Use simple analogies. 
    If code is needed, provide short snippets.
    ${langPrompt}
  `;

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: systemPrompt,
    });
    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to the brain right now. Please try again later.";
  }
};
