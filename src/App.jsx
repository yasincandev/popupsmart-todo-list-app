import { createContext, useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import Login from "./components/Login";
import Todo from "./components/Todo";
import axios from "axios";
import { RotateLoader } from "react-spinners";

export const ThemeContext = createContext(null);

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [savedUsername, setSavedUsername] = useState("");
  const [username, setUsername] = useState("");

  const [savedTheme, setSavedTheme] = useState("light" || "dark");
  const [theme, setTheme] = useState("");

  const [loading, setLoading] = useState(false);

  // todo : add loading state for when the app is fetching username from local storage

  const toggleTheme = () => {
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    const storageTheme = localStorage.getItem("theme");
    if (storageTheme) {
      setTheme(storageTheme);
    } else {
      setTheme(savedTheme);
    }
  }, [savedTheme]);

  const handleLogin = (e) => {
    localStorage.setItem("username", username);
    setSavedUsername(username);
  };

  useEffect(() => {
    setLoading(true);
    const storageUsername = localStorage.getItem("username");
    if (storageUsername) {
      setSavedUsername(storageUsername);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function getTodos() {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://631462d5fc9dc45cb4ecb7bb.mockapi.io/todos`
        );
        setTodoList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getTodos();
    setLoading(false);
  }, []);

  const addTask = async (e) => {
    if (newTask.length < 3) {
      alert("Task must be at least 3 characters long");
      return;
    }

    e.preventDefault();
    setLoading(true);
    const task = {
      content: newTask,
      isCompleted: false,
    };

    try {
      const { data: createdTask } = await axios.post(
        `https://631462d5fc9dc45cb4ecb7bb.mockapi.io/todos`,
        task
      );
      setTodoList([...todoList, createdTask]);
      setNewTask("");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://631462d5fc9dc45cb4ecb7bb.mockapi.io/todos/${id}`
      );
      setTodoList(todoList.filter((task) => task.id !== id));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (id, isCompleted) => {
    setLoading(true);
    try {
      await axios.put(
        `https://631462d5fc9dc45cb4ecb7bb.mockapi.io/todos/${id}`,
        {
          isCompleted: !isCompleted,
        }
      );
      setTodoList(
        todoList.map((task) => {
          if (task.id === id) {
            return { ...task, isCompleted: !isCompleted };
          } else {
            return task;
          }
        })
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (id) => {
    setLoading(true);
    try {
      const task = todoList.find((task) => task.id === id);
      const updatedTask = { ...task, content: editingText };
      await axios.put(
        `https://631462d5fc9dc45cb4ecb7bb.mockapi.io/todos/${id}`,
        updatedTask
      );
      setTodoList(
        todoList.map((task) =>
          task.id === id ? { ...task, content: editingText } : task
        )
      );
      setTodoEditing(null);
      setEditingText("");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = () => {
    setTodoEditing(null);
    setEditingText("");
  };

  if (savedUsername) {
    return (
      <ThemeContext.Provider value={{ theme }}>
        {loading ? (
          <div className="loading">
            <RotateLoader
              className="dotloader"
              color="#e87914"
              loading={loading}
            />
          </div>
        ) : (
          <div className="container" id={theme}>
            <div className="welcome-text-add-todo" id={theme}>
              <div className="welcome-text-theme-mode" id={theme}>
                <div className="welcome-heading">
                  <h1 className="welcome-text">Welcome {savedUsername}</h1>
                </div>
                {
                  <div className="theme-buttons">
                    {theme === "light" ? (
                      <button className="mode-btn" onClick={toggleTheme}>
                        <i className="fa-regular fa-lightbulb"></i>
                      </button>
                    ) : (
                      <button className="mode-btn" onClick={toggleTheme}>
                        <i className="fa-solid fa-lightbulb"></i>
                      </button>
                    )}
                  </div>
                }
              </div>
              <div className="add-todo" id={theme}>
                <AddTodo
                  loading={loading}
                  handleChange={setNewTask}
                  addTask={addTask}
                  value={newTask}
                />
              </div>
            </div>
            <div className="todo-component" id={theme}>
              <div className="todos" id={theme}>
                {todoList.map((task) => {
                  return (
                    <Todo
                      cancelEdit={cancelEdit}
                      loading={loading}
                      todoEditing={todoEditing}
                      setTodoEditing={setTodoEditing}
                      editingText={editingText}
                      setEditingText={setEditingText}
                      completeTask={completeTask}
                      editTask={editTask}
                      deleteTask={deleteTask}
                      isCompleted={task.isCompleted}
                      key={task.id}
                      content={task.content}
                      id={task.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </ThemeContext.Provider>
    );
  } else {
    return (
      <ThemeContext.Provider value={{ theme }}>
        {loading ? (
          <RotateLoader
            className="dotloader"
            color="#e87914"
            loading={loading}
            size={100}
          />
        ) : (
          <Login
            loading={loading}
            username={username}
            setUsername={setUsername}
            handleLogin={handleLogin}
          />
        )}
      </ThemeContext.Provider>
    );
  }
}

export default App;
