import React from "react";
import { useState } from "react";

const Display = (props) => <p>{props.value}</p>;

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
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

  const sum = good + neutral + bad;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <h1>statistics</h1>
      <Display value={"good " + good} />
      <Display value={"neutral " + neutral} />
      <Display value={"bad " + bad} />
      <Display value={"all " + sum} />
      <Display value={"average " + (good + bad * -1) / sum} />
      <Display value={"positive " + (good / sum) * 100 + " %"} />
    </div>
  );
};

export default App;
