const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
const signUpSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [emailRegex, "Veuillez saisir un email valide"],
  },
  password: { type: String, required: true },
});

signUpSchema.plugin(uniqueValidator);

module.exports = mongoose.model("SignUp", signUpSchema);
