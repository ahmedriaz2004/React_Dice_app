// import logo from './logo.svg';
// import './App.css';
import Die from "./component/Die";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("you won!!");
    }
  }, [dice]);

  function generateNewDice() {
    return { value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid() };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  function rollDice() {
    if(!tenzies){
      setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDice();
      }));
    }else{
      setTenzies(false)
      setDice(allNewDice())
    }
   
    
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti/>}
      <h1>Tenzies Dice Game</h1>
      <p>
        Roll until all dice are same.Click each die to freeze it as its current
        value between rolls.
      </p>
      <div className="dice_container">{diceElements}</div>
      <button className="roll_dice" onClick={rollDice}>
       {tenzies ? "New Game":"Roll"} 
      </button>
    </main>
  );
}

export default App;
