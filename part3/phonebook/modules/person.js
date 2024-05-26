const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log(url);
mongoose
  .connect(String(url))
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: (v) => /\d{2,3}-\d/.test(v),
      message:
        "must be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers",
    },
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
