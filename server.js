const express = require("express");

const app = express();
app.use(express.json({ limit: "25mb" }));

let latestEmail = null;

app.post("/email", (req, res) => {
  latestEmail = req.body;
  res.json({ ok: true });
});

app.get("/", (req, res) => {
  if (!latestEmail) {
    return res.send(`
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Email Viewer</title>
          <style>
            body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
            .box { max-width: 1000px; margin: auto; background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 18px rgba(0,0,0,.08); }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>Belum ada email masuk</h1>
          </div>
        </body>
      </html>
    `);
  }

  const esc = (str = "") =>
    String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");

  res.send(`
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Email Viewer</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            padding: 20px;
          }
          .box {
            max-width: 1000px;
            margin: auto;
            background: #fff;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 18px rgba(0,0,0,.08);
          }
          .meta div {
            margin: 8px 0;
            word-break: break-word;
          }
          pre {
            white-space: pre-wrap;
            word-break: break-word;
            background: #111;
            color: #eee;
            padding: 16px;
            border-radius: 10px;
            overflow: auto;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>Email Mentah</h1>

          <div class="meta">
            <div><b>From:</b> ${esc(latestEmail.from)}</div>
            <div><b>To:</b> ${esc(latestEmail.to)}</div>
            <div><b>Subject:</b> ${esc(latestEmail.subject)}</div>
            <div><b>Time:</b> ${esc(latestEmail.time)}</div>
            <div><b>CC:</b> ${esc(latestEmail.cc)}</div>
          </div>

          <h3>Raw Email</h3>
          <pre>${esc(latestEmail.raw || "")}</pre>
        </div>
      </body>
    </html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("jalan di port " + port);
});
