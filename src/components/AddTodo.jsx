import React from "react";
import "./AddTodo.css";

const AddTodo = (props) => {
  const pressEnter = (event) => {
    if (event.key === "Enter") {
      props.addTodo();
    }
  };

  return (
    <div className="left-container">
      <h1 className="header">What Do You Want ToDo?</h1>
      <div className="input-button-container" onSubmit={props.formSubmit}>
        <input
          onChange={props.handleChange}
          type="text"
          value={props.value}
          className="todo-input"
          placeholder="Add a todo"
          onKeyPress={pressEnter}
        />

        <button className="add-btn" onClick={props.addTask}>
          Add To Do
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
