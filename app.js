const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("build"));
//   app.get("*", (req, res) => {
//     req.sendFile(path.resolve(__dirname, "build", "index.html"));
//   });
// }

const Campers = require("./models/Campers");
const Password = require("./models/Password");
const ExitPassword = require("./models/ExitPassword");
const RecyclingBin = require("./models/RecyclingBin");
const ClearanceExit = require("./models/ClearanceExit");
const VerificationCode = require("./models/VerificationCode");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// fs.readFile("./docs/details.txt", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   const dbURI = `mongodb+srv://${data.toString()}@crud.zwclg.mongodb.net/campers?retryWrites=true&w=majority`;

//   const PASSWORD_URI = `mongodb+srv://${data.toString()}@crud.zwclg.mongodb.net/password?retryWrites=true&w=majority`;

//   const DELETIONS_URI = `mongodb+srv://${data.toString()}@crud.zwclg.mongodb.net/deletions?retryWrites=true&w=majority`;

//   const CLEAR = `mongodb+srv://${data.toString()}@crud.zwclg.mongodb.net/clearance?retryWrites=true&w=majority`;

//   // Connecting to mongo DB
//   mongoose
//     .connect(
//       CLEAR &&
//         DELETIONS_URI &&
//         PASSWORD_URI &&
//         (process.env.MONGODB_URI || dbURI),
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     )
//     .then(() => {
//       console.log("mongoDB is connected");
//     })
//     .then((result) =>
//       app.listen(port, () => console.log("Server running on port", port))
//     );
// });

app.post("/insert-password", async (req, res) => {
  const currentPassword = req.body.currentPassword;
  const password = new Password({
    currentPassword: currentPassword,
  });
  password.save();
});

app.post("/insert-exit-password", async (req, res) => {
  const exitPassword = req.body.exitPassword;
  const newPassword = new ExitPassword({
    exitPassword: exitPassword,
  });
  newPassword.save();
});

app.post("/inserting-clearance", async (req, res) => {
  const name = req.body.name;
  const home = req.body.home;
  const crewMember = req.body.crewMember;
  const thisDate = req.body.thisDate;
  const thisHour = req.body.thisHour;
  const imageURL = req.body.imageURL;

  const clearance = new ClearanceExit({
    name: name,
    home: home,
    crewMember: crewMember,
    thisDate: thisDate,
    thisHour: thisHour,
    imageURL: imageURL,
  });
  clearance
    .save()
    .then((result) => {
      res.send(`Insert to database this data:
       ${result}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/read-clearance", async (req, res) => {
  ClearanceExit.find((err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.delete("/delete-clearance/:id", async (req, res) => {
  const id = req.params.id;
  ClearanceExit.findByIdAndRemove(id).exec();
  res.send("Deleted!");
});

app.post("/inserting-deletions", async (req, res) => {
  const newName = req.body.newName;
  const newHome = req.body.newHome;
  const newDates = req.body.newDates;
  const newStage = req.body.newStage;
  const newMedicines = req.body.newMedicines;
  const newNote = req.body.newNote;
  const newPossibilityVisits = req.body.newPossibilityVisits;
  const newOrder = req.body.newOrder;
  const newInfo = req.body.newInfo;

  const recyclingBin = new RecyclingBin({
    name: newName,
    home: newHome,
    dates: newDates,
    stage: newStage,
    medicines: newMedicines,
    note: newNote,
    possibilityVisits: newPossibilityVisits,
    order: newOrder,
    info: newInfo,
  });
  recyclingBin
    .save()
    .then((result) => {
      res.send(`Insert to database this data:
       ${result}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create Data
app.post("/insert", async (req, res) => {
  const name = req.body.name;
  const home = req.body.home;
  const dates = req.body.dates;
  const stage = req.body.stage;
  const medicines = req.body.medicines;
  const note = req.body.note;
  const possibilityVisits = req.body.possibilityVisits;
  const order = req.body.order;
  const info = req.body.info;

  const campers = new Campers({
    name: name,
    home: home,
    dates: dates,
    stage: stage,
    medicines: medicines,
    note: note,
    possibilityVisits: possibilityVisits,
    order: order,
    info: info,
  });
  campers
    .save()
    .then((result) => {
      res.send(`Insert to database this data:
       ${result}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/read-deletions", async (req, res) => {
  RecyclingBin.find((err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.get("/read-password", async (req, res) => {
  Password.find((err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.get("/read-exit-password", async (req, res) => {
  ExitPassword.find((err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// Read Data
app.get("/read", async (req, res) => {
  Campers.find((err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// Update Data
app.put("/update-dates", async (req, res) => {
  const dates = req.body.dates;
  const id = req.body.id;

  Campers.findById(id, (err, updateDates) => {
    updateDates.dates = dates;
    updateDates.save();
    res.send("Update!");
  }).catch((err) => console.log(err));
});

// Delete Data
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  Campers.findByIdAndRemove(id).exec();
  res.send("Deleted!");
});

// לרוקן את סל המיחזור
app.delete("/delete-all-items/:object", async (req, res) => {
  const object = req.params.object;
  const listObject = object.split(",");
  for (let num of listObject) {
    RecyclingBin.findByIdAndRemove(num).exec();
  }
  res.send("All items have been deleted!");
});

app.delete("/delete-all-clearance/:object", async (req, res) => {
  const object = req.params.object;
  const listObject = object.split(",");
  for (let num of listObject) {
    ClearanceExit.findByIdAndRemove(num).exec();
  }
  res.send("All items have been deleted!");
});

app.put("/update-note", async (req, res) => {
  const note = req.body.note;
  const id = req.body.id;

  Campers.findById(id, (err, updateNote) => {
    updateNote.note = note;
    updateNote.save();
    res.send("Update!");
  }).catch((err) => console.log(err));
});

app.get("/read-code", async (req, res) => {
  VerificationCode.find((err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

app.use(express.static("build"));
app.get("*", (req, res) => {
  req.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log("Server connected port", port);
});
