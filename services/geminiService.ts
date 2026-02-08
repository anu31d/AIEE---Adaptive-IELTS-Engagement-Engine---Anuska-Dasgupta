
import { GoogleGenAI } from "@google/genai";
import { Task, UserProfile } from "../types";

export class GeminiService {
  // Removed static initialization to ensure fresh instance per call as per guidelines

  async generateTaskExplanation(tasks: Task[], user: UserProfile): Promise<string> {
    // Create a new instance right before the call to ensure latest API key is used
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const taskSummary = tasks.map(t => `${t.title} (${t.category})`).join(', ');
    
    // Explicitly cast to number[] and provide types for reduce to avoid unknown type errors
    const masteryValues = Object.values(user.skillMastery) as number[];
    const avgMastery = masteryValues.length > 0
      ? Math.round((masteryValues.reduce((a: number, b: number) => a + b, 0) / masteryValues.length) * 100)
      : 0;

    const prompt = `
      As an IELTS coach, explain why these tasks are optimal for a student aiming for Band ${user.targetBand}:
      Tasks: ${taskSummary}
      Student Context: Current average mastery is ${avgMastery}%.
      Daily limit: ${user.dailyTimeBudget} minutes.
      Keep it encouraging, transparent, and brief (2 sentences).
    `;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      // response.text is a property, not a method
      return response.text || "This selection targets your immediate score improvement areas.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "These tasks target high-impact skills tailored to your current progress and available time.";
    }
  }

  async getWeeklyFeedback(user: UserProfile): Promise<string> {
     const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
     // Analyze engagement history and mastery
     const prompt = `Analyze this IELTS student's week and provide a motivating summary. Goal: Band ${user.targetBand}. Current mastery across modules is recorded. Generate a 3-sentence summary with one specific tip.`;
     try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      return response.text || "Great job this week! Focus on Writing Task 2 structure next.";
    } catch (error) {
      return "You're making steady progress toward your target band. Keep the consistency going!";
    }
  }

  // Added method to provide motivational insights cleanly for Dashboard
  async getMotivationalInsight(targetBand: number): Promise<string> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const motivationPrompt = `As a high-performance IELTS coach, give one specific, evidence-based motivational insight for a student aiming for Band ${targetBand}. Focus on why consistency matters. One short sentence.`;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: motivationPrompt,
      });
      return response.text || "Consistency is the strongest predictor of achieving a Band 7.5+ score.";
    } catch (e) {
      return "Consistency is the strongest predictor of achieving a Band 7.5+ score.";
    }
  }
}
