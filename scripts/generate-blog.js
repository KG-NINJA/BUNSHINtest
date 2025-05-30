const fs = require('fs');
const https = require('https');

const API_KEY = process.env.GEMINI_API_KEY;
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

const prompt = {
  contents: [
    {
      parts: [
        { text: "Write a short inspirational blog post related to AI, technology, or creativity." }
      ]
    }
  ]
};

const req = https.request(URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  }
}, res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const result = JSON.parse(data);
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
    const content = `# Daily AI Blog\n\n${text}\n\n---\n#KG-NINJA\n\n[Support me on BuyMeACoffee](https://buymeacoffee.com/kgninja)`;
    fs.writeFileSync('docs/index.md', content);
  });
});

req.write(JSON.stringify(prompt));
req.end();
