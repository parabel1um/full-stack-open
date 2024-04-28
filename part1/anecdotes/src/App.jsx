import React, { useState } from "react";

const AnecdoteWithMostVotes = (props) => {
  let mostVotes = Math.max(...props.points);
  console.log(mostVotes);
  let indexOfMostVotes = 0;

  for (let i = 0; i <= props.points.length; i++) {
    if (mostVotes === props.points[i]) {
      indexOfMostVotes = i;
    }
  }

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[indexOfMostVotes]}</p>
      <p>has {mostVotes} votes</p>
    </>
  );
};

const DisplayVotes = (props) => {
  const votesCount = props.points[props.selected];

  return <p>has {votesCount} votes</p>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

  const getRandomAnecdote = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };

  const handleClick = () => {
    getRandomAnecdote();
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <DisplayVotes selected={selected} points={points} />
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleClick}>Next Anecdote</button>
      <AnecdoteWithMostVotes points={points} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
