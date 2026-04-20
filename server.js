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
          <meta charset="UTF-8">
          <title>Email Viewer</title>
        </head>
        <body>
          <h1>Belum ada email masuk</h1>
        </body>
      </html>
    `);
  }

  const from = latestEmail.from || "-";
  const to = latestEmail.to || "-";
  const time = latestEmail.time || latestEmail.date || "-";
  const cc = latestEmail.cc || "-";
  const html = latestEmail.html || latestEmail.text || "<i>Kosong</i>";
  const attachments = Array.isArray(latestEmail.attachments) ? latestEmail.attachments : [];

  const attachmentHtml = attachments.length
    ? `<ul>${attachments.map(att => `
        <li>
          <b>${att.filename || "unknown"}</b>
          ${att.mimeType ? ` | ${att.mimeType}` : ""}
          ${att.size ? ` | ${att.size} bytes` : ""}
        </li>
      `).join("")}</ul>`
    : `<p>Tidak ada attachment</p>`;

  res.send(`
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Email Viewer</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f5f5f5;
            padding: 20px;
          }
          .box {
            background: white;
            max-width: 900px;
            margin: auto;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 18px rgba(0,0,0,0.08);
          }
          .meta div {
            margin: 8px 0;
          }
          .email-body {
            margin-top: 20px;
            padding: 16px;
            border: 1px solid #ddd;
            border-radius: 10px;
            background: #fff;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>Email Masuk</h1>

          <div class="meta">
            <div><b>From:</b> ${from}</div>
            <div><b>To:</b> ${to}</div>
            <div><b>Time:</b> ${time}</div>
            <div><b>CC:</b> ${cc}</div>
          </div>

          <h3>Attachments</h3>
          ${attachmentHtml}

          <h3>Isi Email</h3>
          <div class="email-body">
            ${html}
          </div>
        </div>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("jalan di http://localhost:3000");
});
