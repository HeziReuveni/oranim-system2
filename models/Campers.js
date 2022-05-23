const mongoose = require("mongoose");

const CampersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    home: {
      type: String,
      required: true,
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

const Campers = mongoose.model("Campers", CampersSchema);
module.exports = Campers;
