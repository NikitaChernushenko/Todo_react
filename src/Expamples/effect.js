import React, { useState, useEffect } from "react";
function App() {
  const [type, setType] = useState("users");
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  // useEffect(() => {
  //   console.log("render");
  // });
  const mouseMoveHandler = (event) => {
    setPos({
      x: event.clientX,
      y: event.clientY,
    });
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, [type]);
  return (
    <div>
      <h1>Ресурс: {type}</h1>
      <button onClick={() => setType("users")}>Пользователи</button>
      <button onClick={() => setType("todos")}>Todo</button>
      <button onClick={() => setType("posts")}>Посты</button>
      <pre>{JSON.stringify(pos, null, 2)}</pre>
    </div>
  );
}

export default App;
