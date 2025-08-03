// Testing Redeploy
export default async function handler(req, res) {
  const input = req.body.input || "";

  const response = await fetch("https://api-inference.huggingface.co/models/<model_name>", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: input })
  });

  const data = await response.json();
  res.status(200).json(data);
}
