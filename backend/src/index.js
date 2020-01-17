const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();

mongoose.connect(
  "mongodb+srv://omnistack:334412852@cluster0-k7om5.mongodb.net/test?retryWrites=true&w=majority",
  // "mongodb://localhost:27017/week10",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(3333);
