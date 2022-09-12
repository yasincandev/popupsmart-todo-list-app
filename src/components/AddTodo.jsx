import React from "react";
import "./AddTodo.css";
import { BeatLoader } from "react-spinners";

const AddTodo = ({ addLoading, handleChange, addTask, value, theme }) => {
  return (
    <div className="add-todo-container" id={theme}>
      <div className="header" id={theme}>
        <h1 className="header-text" id={theme}>
          What Do You Want ToDo?
        </h1>
      </div>
      <div className="input-button-container" id={theme}>
        <input
          onChange={(e) => handleChange(e.target.value)}
          type="text"
          value={value}
          className="todo-input"
          placeholder="Add a todo"
          id={theme}
          disabled={addLoading}
        />

        <button
          className="add-btn"
          onClick={addTask}
          id={theme}
          style={{
            pointerEvents: addLoading ? "none" : "all",
          }}
        >
          {addLoading ? <BeatLoader size={16} /> : "Add To Do"}
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
