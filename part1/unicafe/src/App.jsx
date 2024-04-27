import React from "react";
import { useState } from "react";

const Display = (props) => <p>{props.value}</p>;

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Statistics = (props) => {
  const sum = props.good + props.neutral + props.bad;

  if (sum == 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <Display value={"good " + props.good} />
      <Display value={"neutral " + props.neutral} />
      <Display value={"bad " + props.bad} />
      <Display value={"all " + sum} />
      <Display value={"average " + (props.good + props.bad * -1) / sum} />
      <Display value={"positive " + (props.good / sum) * 100 + " %"} />
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
