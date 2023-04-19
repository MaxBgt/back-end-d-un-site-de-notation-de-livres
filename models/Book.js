const mongoose = require("mongoose");

function isValid(value) {
  return value.trim().length > 0;
}

const bookSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: {
    type: String,
    required: true,
    validate: {
      validator: isValid,
      message: "Le titre ne doit pas contenir uniquement des espaces",
    },
  },
  author: {
    type: String,
    required: true,
    validate: {
      validator: isValid,
      message: "L'auteur ne doit pas contenir uniquement des espaces",
    },
  },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: {
    type: String,
    required: true,
    validate: {
      validator: isValid,
      message: "Le genre ne doit pas contenir uniquement des espaces",
    },
  },
  ratings: [
    {
      userId: { type: String },
      grade: { type: Number },
    },
  ],
  averageRating: { type: Number },
});

module.exports = mongoose.model("Book", bookSchema);
