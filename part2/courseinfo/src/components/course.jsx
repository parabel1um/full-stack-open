import React from "react";

const Total = (props) => {
  return <b>total of {props.total} exercises</b>;
};

const Header = (props) => {
  return <h1>{props.header}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Course = (props) => {
  const total = props.course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  return (
    <div>
      <Header header={props.course.name} />
      <Content parts={props.course.parts} />
      <Total total={total} />
    </div>
  );
};

export default Course;
