const mongoose = require("mongoose");

const ExitPasswordSchema = new mongoose.Schema(
  {
    exitPassword: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ExitPassword = mongoose.model("ExitPassword", ExitPasswordSchema);
module.exports = ExitPassword;
