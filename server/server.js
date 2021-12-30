const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const config = require("config");
const index = require("./routers/index.js");

if (!config.get("apiKey")) {
  console.error("apiKey is not defined.");
  process.exit(1);
}

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/", index);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`The server is running at PORT= ${PORT}`));
