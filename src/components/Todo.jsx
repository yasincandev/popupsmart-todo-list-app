import React from "react";
import "./Todo.css";

const Todo = (props) => {
  return (
    <div
      style={{
        backgroundColor: props.isCompleted ? " #456d45" : "",
        transition: props.isCompleted
          ? "background-color 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
          : "",
      }}
      className="todo-container"
    >
      <div className="todo-content">
        {props.id === props.todoEditing ? (
          <input
            type="text"
            onChange={(e) => props.setEditingText(e.target.value)}
            value={props.editingText}
            className="todo-editing"
          />
        ) : (
          <p className="todo-lising">{props.content}</p>
        )}
      </div>
      <div className="buttons">
        <button onClick={() => props.deleteTask(props.id)} className="todo-btn">
          <i className="fa-regular fa-trash-can"></i>
        </button>
        {props.id === props.todoEditing ? (
          <div className="edit-cancel-edit-buttons">
            <button
              className="todo-btn"
              onClick={() => props.editTask(props.id)}
            >
              <i className="fa-regular fa-thumbs-up"></i>
            </button>
            <button className="todo-btn" onClick={() => props.cancelEdit()}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ) : (
          <button
            className="todo-btn"
            onClick={() => props.setTodoEditing(props.id)}
          >
            <i className="fa-regular fa-edit"></i>
          </button>
        )}

        <button
          className="todo-btn"
          onClick={() => props.completeTask(props.id, props.isCompleted)}
        >
          <i className="fa-regular fa-square-check"></i>
        </button>
      </div>
    </div>
  );
};

export default Todo;
