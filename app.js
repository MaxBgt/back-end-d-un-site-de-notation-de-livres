const express = require("express");

const app = express();

app.use("/api/books", (req, res, next) => {
  const books = [
    {
      id: "1",
      title: "Mon premier livre",
      description: "C'est mon premier livre",
      imageUrl: "",
      price: 400,
      userId: "Max",
    },
  ];
  res.status(200).json(books);
});

module.exports = app;
