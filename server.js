import express, { json } from "express";
const app = express();
import mongoose from "mongoose";
import router from "./src/routes.js";

const port = process.env.PORT || 8080;
const uri =
  "mongodb+srv://comeet:comeet@comeet.pchfwg0.mongodb.net/?retryWrites=true&w=majority";

//models
import "./src/models/UserModel.js";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(json());

app.use("/api", router);

app.listen(port, function () {
  console.log(`running on ${port}`);
});
