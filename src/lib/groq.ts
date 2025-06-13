export async function getGroqNudge(siteData: any) {
  const prompt = `I'm building a productivity tracker. The user has been distracted by: ${Object.keys(
    siteData
  )
    .filter((site) => siteData[site].type === "distracted")
    .join(", ")}. Suggest a short motivational nudge to help them refocus.`;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // or use mixtral or gemma
        messages: [
          {
            role: "system",
            content: "You are a motivational productivity coach.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
      }),
    }
  );

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Stay focused!";
}
  