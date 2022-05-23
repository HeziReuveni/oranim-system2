const mongoose = require("mongoose");

const ClearanceExitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    home: {
      type: String,
      required: true,
    },
    crewMember: {
      type: String,
      required: true,
    },
    thisDate: {
      type: String,
      required: false,
    },
    thisHour: {
      type: String,
      required: false,
    },
    imageURL: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

const ClearanceExit = mongoose.model("ClearanceExit", ClearanceExitSchema);
module.exports = ClearanceExit;
