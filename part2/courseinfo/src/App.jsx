import React from "react";

const Header = (props) => {
  return <h1>{props.header}</h1>;
};

const Part = (props) => {
  return (
    <li>
      {props.name} {props.exercises}
    </li>
  );
};

const Content = (props) => {
  return (
    <ul>
      {props.content.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </ul>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header header={props.course.name} />
      <Content content={props.course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
