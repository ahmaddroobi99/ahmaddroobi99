import { OpenAI } from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompt = `You are an expert AI assistant for Ahmad Droobi, a Robotics & Perception Engineer and Software Engineer.
Ahmad's portfolio emphasizes LiDAR, perception, estimation and controls, autonomy, AI/ML, data pipelines, and real-time systems.
Answer questions clearly, briefly, and accurately using the context below.
If a question is outside Ahmad's portfolio or experience, say you don't have enough detail and keep the answer honest.
`;

const portfolioContext = `
About:
- Builds software at the intersection of backend systems, AI/ML workflows, and perception-oriented data processing.
- Focuses on turning noisy, high-dimensional data into tested, maintainable software for analysis, automation, and decision-making.
- Background includes computer engineering, Python backend development, React interfaces, data pipelines, numerical computing, and machine learning experimentation.
- Interested in AI platforms, robotics, LiDAR/perception, infrastructure for ML, and applied product engineering.

Featured projects:
- Research Software for Turbulent Flow Filtering: filtering and state-estimation workflows for high-dimensional flow models using noisy observation data.
- LiDAR & Perception Data Pipeline: perception data pipeline for LiDAR-style inputs, cleaning, spatial interpretation, visualization, and ML-ready feature preparation.
- Software Reporting System: reporting workflow that structures user-submitted data for easier review and maintenance.
- CookOverflow: capstone recipe application focusing on search, categories, and user workflow design.
- Simple Electric Circuit Builder: engineering tool for circuit construction workflows, automation concepts, and hardware/software interaction.
- Machine Learning Notes and Technical Reviews: technical notes and experiments on generalization, mathematical foundations, and time-dependent behavior.
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = await req.json();
    const question = body.question?.toString()?.trim();
    if (!question) {
      return res.status(400).json({ error: "Question is required." });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        { role: "system", content: systemPrompt + portfolioContext },
        { role: "user", content: question }
      ],
      max_output_tokens: 400
    });

    const answer = response.output?.[0]?.content?.[0]?.text || "I couldn't generate a helpful response right now.";

    return res.status(200).json({ answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to generate chat response." });
  }
}
