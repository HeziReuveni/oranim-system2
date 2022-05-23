const mongoose = require("mongoose");

const PasswordSchema = new mongoose.Schema(
  {
    currentPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Password = mongoose.model("Password", PasswordSchema);
module.exports = Password;
