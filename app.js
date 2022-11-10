const express = require("express");
const config = require("config");
const PORT = config.get("port");
const app = express();
const routes = require("./routes/index.routes");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

app.use(express.json());
app.use("/api", routes);
app.use(errorHandler);

async function run() {
  try {
    app.listen(PORT, () => {
      console.log("Run Server PORT---->>>" + PORT);
    });
  } catch (error) {
    console.log("Serverda xatolik");
  }
}

run();
