require("dotenv").config();

const path = require("path");
const { Deta } = require("deta");
const express = require("express");
const schemas = require("./src/schemas");
const { JoiValidate } = require("./src/middleware");
const { pages, generateKey, generateDomainName } = require("./src/utils");

const app = express();
const deta = Deta(process.env.DETA_PROJECT_KEY);
const db = deta.Base(process.env.DETA_BASE_NAME || "pasting");

const port = process.argv[3] || process.env.PORT || 8000;
const hostname = process.argv[2] || process.env.HOST || "127.0.0.1";
const domain = generateDomainName(hostname, port);
const websiteName = process.env.WEBSITE_NAME || "pasting";

app.use(async (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(express.json({ limit: "2mb" }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));

app.get("/", async (req, res) => {
  res.render("main", { website_name: websiteName });
});

app.get("/error", async (req, res) => {
  res.render("error");
});

app.post("/api", JoiValidate(schemas.Paste), async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.key) {
      req.body.key = await generateKey();
    }
    data = await db.insert(req.body);
    res.json({
      key: data.key,
      url: `https://${domain}/${data.key}`,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.get("/:key", async (req, res) => {
  data = await db.get(req.params.key);
  if (data) {
    res.render("paste", { data: data, website_name: websiteName });
  } else {
    res.render("error");
  }
});

if (process.env.DETA_RUNTIME) {
  module.exports = app;
} else {
  app.listen(port, hostname, async () => {
    console.log(`Listening at ${hostname}:${port}`);
  });
}
