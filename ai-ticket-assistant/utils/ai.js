import { createAgent, gemini } from "@inngest/agent-kit";

const analyzeTicket = async (ticket) => {
  const supportAgent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "AI Ticket Triage Assistant",
    system: `You are an expert AI assistant that processes technical support tickets. 
Only output strict raw JSON (no markdown, no code fences).`,
  });

  const response = await supportAgent.run(`
Analyze the following support ticket and provide a JSON object with:

- summary: Short 1–2 sentence summary
- priority: "low", "medium", or "high"
- helpfulNotes: Technical explanation with resources/links
- relatedSkills: ["Skill1", "Skill2"]

Ticket info:
- Title: ${ticket.title}
- Description: ${ticket.description}
`);

  // Try to get raw text output safely
  const raw =
    response?.output?.[0]?.content ??
    response?.output?.[0]?.context ??
    response?.outputText ??
    "";

  console.log("🔎 Raw AI response:", raw);

  try {
    // strip code fences if Gemini still sends them
    const match = raw.match(/```json\s*([\s\S]*?)\s*```/i);
    const jsonString = match ? match[1] : raw.trim();

    return JSON.parse(jsonString);
  } catch (e) {
    console.error("❌ Failed to parse AI JSON:", e.message);
    return {
      summary: ticket.title || "No summary",
      priority: "medium",
      helpfulNotes: "AI parsing failed, using default notes.",
      relatedSkills: [],
    };
  }
};

export default analyzeTicket;
