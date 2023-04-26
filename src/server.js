require("dotenv").config();
const cors = require("cors");

const express = require("express");

const port = process.env.PORT || 5002;
const User = require("./users/model");
const userRouter = require("./users/routes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);


const syncTables = () => {
    User.sync({alter:true});
};

app.get("/health", (req, res) => {
  res.status(200).json({ message: "App is healthy" });
});
app.listen(port, () => {
  syncTables();
  console.log("Server is listening on port " + port);
});
