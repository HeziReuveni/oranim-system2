const mongoose = require("mongoose");

const RecyclingBinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    home: {
      type: String,
      required: false,
    },
    dates: {
      type: String,
      required: false,
    },
    stage: {
      type: String,
      required: false,
    },
    medicines: {
      type: String,
      required: false,
    },
    note: {
      type: String,
      required: false,
    },
    order: {
      type: String,
      required: false,
    },
    possibilityVisits: {
      type: String,
      required: false,
    },
    info: {
      type: String,
      required: false,
    },
  },

  { timestamps: true }
);

const RecyclingBin = mongoose.model("RecyclingBin", RecyclingBinSchema);
module.exports = RecyclingBin;
