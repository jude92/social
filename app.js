const mongoose = require("mongoose");
const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/index");
const postrouter = require("./routes/postIndex")

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use("/api/v1", router);
app.use("/api/v1",postrouter)

const port = 1010;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(
      port,
      console.log(`connected to the db and aerver is listen to port  ${port}`)
    );
  })
  .catch((err) => console.log(err));
