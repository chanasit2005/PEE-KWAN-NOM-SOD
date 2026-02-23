
import { GoogleGenAI, Type } from "@google/genai";

export const getSoyRecommendation = async (mood: string) => {
  // Always create a new instance before making a call to ensure the latest API key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest a soy milk flavor from this menu in Thai language based on the mood/need: "${mood}". 
      Available options: น้ำเต้าหู้ร้อน, น้ำเต้าหู้ร้อนงาดำ, น้ำเต้าหู้ร้อนใส่น้ำขิง, น้ำเต้าหู้ใส่ลูกเดือย, น้ำเต้าหู้ร้อนรสกาแฟ, น้ำเต้าหู้ร้อนมัจฉะ, น้ำเต้าหู้ร้อนโกโก้.
      Give a very brief "Why" in one sentence in Thai.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            flavor: { type: Type.STRING },
            reason: { type: Type.STRING }
          },
          required: ["flavor", "reason"]
        }
      }
    });
    // response.text is a property, not a method.
    const text = response.text;
    return JSON.parse(text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return { flavor: "น้ำเต้าหู้ร้อน", reason: "เป็นเมนูยอดนิยมตลอดกาล หอมอร่อยแบบต้นตำรับค่ะ!" };
  }
};
