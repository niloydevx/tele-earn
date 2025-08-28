// api/entry.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const ua = (req.headers["user-agent"] || "").toLowerCase();

  const isTelegramUA = ua.includes("telegram");
  const hasParam = req.query.tg || req.query.tg_user_id;

  if (isTelegramUA || hasParam) {
    // ✅ Serve nakamura.html (not publicly accessible)
    const filePath = path.join(process.cwd(), "protected", "nakamura.html");
    const html = fs.readFileSync(filePath, "utf8");
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } else {
    // ❌ Not Telegram -> show fake network error
    res.status(403).send(`
      <html><head><title>Network Error</title></head>
      <body style="font-family:sans-serif;padding:40px">
        <h1>This site can’t be reached</h1>
        <p>Connection interrupted.</p>
        <p style="color:#777">Access is restricted. Open inside Telegram.</p>
      </body>
      </html>
    `);
  }
}
