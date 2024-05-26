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

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((result) => {
      response.json(result);
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  Person.find({}).then((result) => {
    const count = result.length;
    let date = new Date();
    response.send(
      `<p>Phonebook has info for ${count} people</p>
    <p>${date}</p>
    `
    );
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((result) => {
      if (result) {
        response.json(result);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  Person.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updated) => {
      if (updated) {
        response.json(updated);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

morgan.token("body", (req) => JSON.stringify(req.body));

const postMorgan = morgan(
  ":method :url :status :res[content-length] - :response-time ms :body"
);

app.post("/api/persons", postMorgan, (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  Person.findOne({ name: body.name })
    .then((existing) => {
      if (existing) {
        return response.status(409).json({
          error: `${body.name} already exists`,
        });
      }

      const person = new Person({
        name: body.name,
        number: body.number,
      });

      person
        .save()
        .then((savedPerson) => {
          response.json(savedPerson);
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (response.headersSent) {
    return next(error);
  }

  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  response.status(500).json({ error: "An unknown error occurred" });
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
