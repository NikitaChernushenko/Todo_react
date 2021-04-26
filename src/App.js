import React, { useState, useEffect, Component } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./Context";
import AddTodo from "./Todo/AddTodos";
import "bootstrap/dist/css/bootstrap.min.css";
import Store from "./Todo/Store";
import { createStore } from "redux";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [displayTodos, setDisplayTodos] = useState([]);
  const [clearCompletedFlag, setClearCompletedFlag] = useState(false);
  const store = createStore(todos);
  store.subscribe(() => {
    localStorage["Local"] = JSON.stringify(store.getState());
  });

  useEffect(() => {
    const data = localStorage.getItem("Local");
    if (data) {
      setTodos(JSON.parse(data));
      setDisplayTodos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem("Local", JSON.stringify(todos));
    }
  }, [todos]);
  useEffect(() => {
    const flag = todos.some((todo) => todo.completed === true);
    setClearCompletedFlag(flag);
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(newTodos);
    setDisplayTodos(newTodos);
  };

  const removeTodo = (id) => {
    const newValues = todos.filter((todo) => todo.id !== id);
    setTodos(newValues);
    setDisplayTodos(newValues);
  };

  const checkAll = () => {
    const checkTodos = todos.map((item) => {
      if (!item.completed) {
        item.completed = true;
      }
      return item;
    });
    setTodos(checkTodos);
    setDisplayTodos(checkTodos);
  };

  const clearCheckAll = () => {
    const checkTodos = todos.filter((item) => !item.completed);
    setTodos(checkTodos);
    setDisplayTodos(checkTodos);
  };

  const addTodo = (title) => {
    const newTodo = {
      title,
      id: Date.now(),
      completed: false,
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setDisplayTodos(newTodos);
  };

  const updateTodoToShow = (value) => {
    let newArrayTodos;
    if (value === "All") {
      setDisplayTodos(todos);
    } else if (value === "ToDo") {
      newArrayTodos = todos.filter((todo) => !todo.completed);
      setDisplayTodos(newArrayTodos);
    } else if (value === "Completed") {
      newArrayTodos = todos.filter((todo) => todo.completed);
      setDisplayTodos(newArrayTodos);
    }
  };
  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1>Your todo list</h1>
        <AddTodo onCreate={addTodo}></AddTodo>
        {todos.length ? (
          <TodoList todos={displayTodos} onToggle={toggleTodo}></TodoList>
        ) : (
          <p>No todos</p>
        )}
        <div>
          <button className="Left" onClick={checkAll}>
            {todos.filter((todo) => !todo.completed).length} tasks left
          </button>
        </div>
        <div>
          <button onClick={() => updateTodoToShow("All")}>All</button>
          <button onClick={() => updateTodoToShow("ToDo")}>ToDo</button>
          <button onClick={() => updateTodoToShow("Completed")}>
            Completed
          </button>
        </div>
        {clearCompletedFlag && (
          <div>
            <button className="Right" onClick={clearCheckAll}>
              Clear Completed
            </button>
          </div>
        )}
      </div>
    </Context.Provider>
  );
}
