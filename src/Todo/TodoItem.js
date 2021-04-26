import React, { useContext } from "react";
import propTypes from "prop-types";
import Context from "../Context";
import { Checkbox } from "react-bootstrap";
const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem 1rem",
    border: "1px solid #cccc",
    borderRadius: "4px",
    marginBottom: ".5rem",
  },
  input: {
    martginRight: "rem",
  },
  checkbox: {
    backgroundColor: "initial",
    cursor: "default",
    appearance: "auto",
    boxSizing: "border-box",
    margin: "3px 3px 3px 4px",
    padding: "initial",
    border: "initial",
  },
};
function TodoItem({ todo, index, onChange }) {
  const { removeTodo } = useContext(Context);
  const classes = [];
  if (todo.completed) {
    classes.push("done");
  }
  return (
    <li style={styles.li}>
      <span className={classes.join(" ")}>
        <div className="pretty p-default p-round">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onChange(todo.id)}
          />
          <div className="state">
            <label></label>
          </div>
        </div>
        &nbsp;
        {todo.title}
      </span>
      <button className="rm" onClick={removeTodo.bind(null, todo.id)}>
        &times;
      </button>
    </li>
  );
}
TodoItem.propTypes = {
  todo: propTypes.object.isRequired,
  index: propTypes.number,
  onChange: propTypes.func.isRequired,
};
export default TodoItem;
