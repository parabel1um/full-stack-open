const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

if (process.argv.length === 3) {
  const url = `mongodb+srv://parabellmo:${password}@cluster0.nzl6whc.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.connect(url);

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("Person", personSchema);

  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length === 5) {
  const url = `mongodb+srv://parabellmo:${password}@cluster0.nzl6whc.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

  mongoose.connect(url);

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });

  const Person = mongoose.model("Person", personSchema);

  const person = new Person({
    name: name,
    number: number,
  });

  person
    .save()
    .then((result) => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    })
    .catch((err) => {
      console.error(err);
      mongoose.connection.close();
    });
} else {
  console.log(
    "Make sure to give password, name and the phone number as arguments"
  );
  process.exit(1);
}
