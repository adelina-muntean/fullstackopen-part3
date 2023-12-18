const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(morgan('tiny'));

let persons = [
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

// get all persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// get one person
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

// delete a person
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((note) => note.id !== id);

  response.status(204).end();
});

// add new person
app.post("/api/persons", (request, response) => {
  const body = request.body;

  // error if name is missing
  if (!body.name) {
    return response.status(400).json({
      error: "please enter a name for the person",
    });
  }

  // error if number is missing
  if (!body.number) {
    return response.status(400).json({
      error: "please enter a number for the person",
    });
  }

  // error if name is duplicate
  const names = persons.map((person) => person.name);
  if (names.includes(request.body.name)) {
    return response.status(400).json({
      error: "this person already exists in the phonebook",
    });
  }

  const person = {
    id: Math.floor(Math.random() * (1000000 - 1) + 1),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  response.json(person);
});

app.get("/info", (request, response) => {
  const totalPersons = persons.length;
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${totalPersons} people</p><p>${date}</p>`
  );
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
