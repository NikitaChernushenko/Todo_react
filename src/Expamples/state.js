import React, { useState } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./Context";
import AddTodo from "./Todo/AddTodos";
import { arrayOf, number } from "prop-types";

let Jojo = function Addp() {
  Jojo = Number(prompt("Начальное число"));
};

function App() {
  const [cut, setCut] = useState(Jojo);

  const [state, setState] = useState({
    time: "Jojo-time",
    age: 14,
    name: "dead inside",
  });

  function increment() {
    setCut(cut + Number(prompt("На какое значение будем увеличивать")));
  }

  function decriment() {
    let a = Number(prompt("На какое значение будем уменьшать"));
    setCut(cut - a);
  }

  function updateTitle() {
    setState((prev) => {
      return {
        ...prev,
        time: 1337,
      };
    });
  }

  return (
    <div>
      <h1>schet:{cut}</h1>
      <button onClick={increment} className="btn btn-success">
        Up
      </button>
      <button onClick={decriment} className="btn btn-danger">
        down
      </button>
      <button onClick={updateTitle} className="btn btn-default">
        Change
      </button>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}

export default App;
