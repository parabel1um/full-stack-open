const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("dist"));
app.use(cors());

require("dotenv").config();

const Person = require("./modules/person");

let numbers = [];

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/info", (request, response) => {
  let count = Person.length;
  let date = new Date();
  response.send(`<p>Phonebook has info for ${count} people</p>
  <p>${date}</p>
  `);
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((result) => {
    if (result) {
      response.json(result);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

morgan.token("body", (req) => JSON.stringify(req.body));

const postMorgan = morgan(
  ":method :url :status :res[content-length] - :response-time ms :body"
);

app.post("/api/persons", postMorgan, (request, response) => {
  const body = request.body;

  const person = {
    id: Math.floor(Math.random() * 30000),
    name: body.name,
    number: body.number,
  };

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  } else if (numbers.some((person) => person.name === body.name)) {
    return response.status(409).json({
      error: `${body.name} already exists`,
    });
  } else if (numbers.some((person) => person.number === body.number)) {
    return response.status(409).json({
      error: `${body.number} already exists`,
    });
  } else {
    const person = new Person({
      name: body.name,
      number: body.number,
    });

    person.save().then((person) => {
      response.json(person);
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
