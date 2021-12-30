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

//3e59c733aa4308c209ba4bb0374b0388

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`The server is running at PORT= ${PORT}`));
