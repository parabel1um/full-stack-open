import React from "react";
import { useState } from "react";

const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input
        value={props.filter}
        onChange={(event) => props.setFilter(event.target.value)}
      />
    </div>
  );
};

const PersonForm = (props) => {
  const nameAlreadyExists = (nameToCheck) => {
    return props.persons.some((person) => person.name === nameToCheck);
  };

  const handleNewSubmit = (event) => {
    event.preventDefault();

    if (nameAlreadyExists(props.newName)) {
      alert(`${props.newName} is already added to phonebook`);
    } else {
      props.setPersons([
        ...props.persons,
        { name: props.newName, number: props.newNumber },
      ]);
      props.setNewName("");
      props.setNewNumber("");
    }
  };

  return (
    <form onSubmit={handleNewSubmit}>
      <div>
        name:{" "}
        <input
          value={props.newName}
          onChange={(event) => props.setNewName(event.target.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={props.newNumber}
          onChange={(event) => props.setNewNumber(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  const filteredPersons = props.persons.filter((person) =>
    person.name.toLowerCase().includes(props.filter.toLowerCase())
  );

  return (
    <div>
      {filteredPersons.map((person, index) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add a new</h2>
      <PersonForm
        persons={persons}
        newNumber={newNumber}
        newName={newName}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
