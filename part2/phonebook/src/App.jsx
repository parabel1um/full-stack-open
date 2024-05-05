import React from "react";
import { useState, useEffect } from "react";
import service from "./services/service";

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
      if (
        window.confirm(
          `${props.newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        let id = props.persons.find((p) => p.name === props.newName).id;
        console.log(id);
        let newObject = { name: props.newName, number: props.newNumber };

        service.update(id, newObject).then((response) => {
          console.log(response.data);
          props.setPersons(
            props.persons.map((p) => (p.id === id ? response.data : p))
          );
        });
        props.setNewName("");
        props.setNewNumber("");
      }
    } else {
      let newObject = { name: props.newName, number: props.newNumber };

      service.add(newObject).then((response) => {
        console.log(response.data);
        props.setPersons([...props.persons, response.data]);
      });
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
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      service.remove(id).then(() => {
        service.getAll().then((response) => {
          props.setPersons(response.data);
        });
      });
    }
  };

  const filteredPersons = props.persons.filter((person) =>
    person.name.toLowerCase().includes(props.filter.toLowerCase())
  );

  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.name}>
          <p>
            {person.name} {person.number}
          </p>
          <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    service.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        newNumber={newNumber}
        newName={newName}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} setPersons={setPersons} />
    </div>
  );
};

export default App;
