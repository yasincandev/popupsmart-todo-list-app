import React from "react";
import "./Todo.css";
import { BeatLoader } from "react-spinners";

const Todo = ({
  cancelEdit,
  loading,
  todoEditing,
  setTodoEditing,
  setTodoLoading,
  editingText,
  setEditingText,
  completeTask,
  editTask,
  deleteTask,
  isCompleted,
  content,
  id,
}) => {
  return (
    <div
      style={{
        backgroundColor: isCompleted ? " #456d45" : "",
        transition: isCompleted
          ? "background-color 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)"
          : "",
      }}
      className="todo-container"
    >
      <div className="todo-content">
        {loading && (
          <BeatLoader
            color="#201f1f4b"
            size={30}
            style={{
              position: "absolute",
            }}
          />
        )}
        {id === todoEditing ? (
          <input
            type="text"
            onChange={(e) => setEditingText(e.target.value)}
            value={editingText}
            className="todo-editing"
          />
        ) : (
          <p>{content}</p>
        )}
      </div>

      <div className="buttons">
        <button
          onClick={() => {
            deleteTask(id);
            setTodoLoading(id);
          }}
          className="todo-btn"
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>

        {id === todoEditing ? (
          <div className="edit-cancel-edit-buttons">
            <button
              className="todo-btn"
              onClick={() => {
                setTodoLoading(id, content);
                editTask(id);
              }}
            >
              <i className="fa-regular fa-thumbs-up"></i>
            </button>
            <button className="todo-btn" onClick={() => cancelEdit()}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ) : (
          <button
            className="todo-btn"
            onClick={() => {
              setTodoEditing(id);
              setEditingText(content);
            }}
          >
            <i className="fa-regular fa-edit"></i>
          </button>
        )}

        <button
          className="todo-btn"
          onClick={() => {
            completeTask(id, isCompleted);
          }}
        >
          <i className="fa-regular fa-square-check"></i>
        </button>
      </div>
    </div>
  );
};

export default Todo;
