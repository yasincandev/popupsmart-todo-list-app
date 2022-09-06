import React from "react";
import "./AddTodo.css";

const AddTodo = (props) => {
  return (
    <div className="add-todo-container" id={props.theme}>
      <div className="header" id={props.theme}>
        <h1 className="header-text" id={props.theme}>
          What Do You Want ToDo?
        </h1>
      </div>
      <div className="input-button-container" id={props.theme}>
        <input
          onChange={(e) => props.handleChange(e.target.value)}
          type="text"
          value={props.value}
          className="todo-input"
          placeholder="Add a todo"
          id={props.theme}
        />

        <button className="add-btn" onClick={props.addTask} id={props.theme}>
          Add To Do
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
