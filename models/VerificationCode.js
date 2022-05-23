const mongoose = require("mongoose");

const VerificationCodeSchema = new mongoose.Schema(
  {
    VerificationCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Code = mongoose.model("Code", VerificationCodeSchema);
module.exports = Code;
