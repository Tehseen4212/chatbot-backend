// api/chatbot.js

export default async function handler(req, res) {
  const input = req.body.input || "";
  const useOpenRouter = req.body.useOpenRouter || false;

  try {
    let response, data;

    if (useOpenRouter) {
      // ✅ OpenRouter API request
      response = await fetch("https://openrouter.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral/mistral-7b-instruct", // or any OpenRouter-supported model
          messages: [{ role: "user", content: input }],
        }),
      });

      const result = await response.json();
      data = { reply: result.choices?.[0]?.message?.content || "No reply received." };
    } else {
      // ✅ Hugging Face Inference API request
      response = await fetch("https://api-inference.huggingface.co/models/<model_name>", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: input }),
      });

      data = await response.json();
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
}
