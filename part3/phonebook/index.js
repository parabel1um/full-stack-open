const express = require("express");
const morgan = require("morgan");
const app = express();

let numbers = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());
app.use(morgan("tiny"));

app.get("/api/persons", (request, response) => {
  response.json(numbers);
});

app.get("/info", (request, response) => {
  let count = Object.keys(numbers).length;
  let date = new Date();

  response.send(`<p>Phonebook has info for ${count} people</p>
  <p>${date}</p>
  `);
});

app.get("/api/persons/:id", (request, response) => {
  let data = numbers.find((number) => number.id == Number(request.params.id));

  if (data) {
    response.json(data);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  numbers = numbers.filter((person) => person.id !== Number(request.params.id));

  response.status(204).end();
});

const postMorgan = morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
    JSON.stringify(req.body),
  ].join(" ");
});

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
  }

  numbers.concat(person);

  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
