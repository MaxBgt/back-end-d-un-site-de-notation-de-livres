const express = require("express");
const mongoose = require("mongoose");
const SignUp = require("./models/SignUp");
mongoose
  .connect(
    "mongodb+srv://Max:V0jgllSYNiaOtx9z@cluster0.cyqqto2.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.post("/api/auth/signup", (req, res, next) => {
  const signup = new SignUp({
    ...req.body,
  });
  signup
    .save()
    .then(() => res.status(200).json({ message: "Ok" }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
