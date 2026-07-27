const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const PROMPT = `Analyze the following text and return a JSON object with exactly these fields:
- "summary": a concise summary in 2-3 sentences (in the same language as the text)
- "sentiment": one of "positive", "negative", "neutral", or "mixed"
- "sentimentExplanation": a brief explanation of why that sentiment was chosen (in the same language as the text)
- "keyIdeas": an array of 3-5 key ideas, each as a short string (in the same language as the text)

Return ONLY the raw JSON object, no markdown, no code fences.`;

export async function analyzeText(text) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `${PROMPT}\n\nText to analyze:\n"""\n${text}\n"""`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  return JSON.parse(content);
}
