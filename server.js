const express = require("express");

const app = express();

app.use(express.json({ limit: "25mb" }));

app.post("/email", (req, res) => {
  const { from, to, time, cc, html, attachments } = req.body;

  console.log("📬 EMAIL MASUK");
  console.log("From:", from);
  console.log("To:", to);
  console.log("Time:", time);
  console.log("Cc:", cc);
  console.log("HTML FULL:");
  console.log(html);

  console.log("Attachments:");
  console.dir(attachments, { depth: null });

  res.json({ ok: true });
});

app.listen(3000, () => {
  console.log("API jalan di http://localhost:3000");
});
