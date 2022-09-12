import { createContext, useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import Login from "./components/Login";
import Todo from "./components/Todo";
import axios from "axios";
import { BarLoader } from "react-spinners";
import Loading from "./components/Loading";

export const ThemeContext = createContext(null);

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [username, setUsername] = useState("");
  const [savedUsername, setSavedUsername] = useState("");
  const [theme, setTheme] = useState("light");
  const [addLoading, setAddLoading] = useState(false);
  const [todoLoading, setTodoLoading] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    setLoginLoading(true);
    const storageUsername = localStorage.getItem("username");
    if (storageUsername) {
      setSavedUsername(storageUsername);
    }

    setLoginLoading(false);
  }, []);

  useEffect(() => {
    async function getTodos() {
      setLoginLoading(true);
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
    setLoginLoading(false);
  }, []);

  const handleLogin = () => {
    localStorage.setItem("username", username);
    setSavedUsername(username);
  };

  useEffect(() => {
    setLoginLoading(true);
    const storageTheme = localStorage.getItem("theme");
    if (storageTheme) {
      setTheme(storageTheme);
    }
    setLoginLoading(false);
  }, []);

  const isLight = theme === "light";

  const toggleTheme = () => {
    const selectedTheme = isLight ? "dark" : "light";
    localStorage.setItem("theme", selectedTheme);
    setTheme(selectedTheme);
  };

  const addTask = async (e) => {
    if (newTask.length < 3) {
      alert("Task must be at least 3 characters long");
      return;
    }
    e.preventDefault();
    setAddLoading(true);
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
      setAddLoading(false);
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
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const completeTask = async (id, isCompleted) => {
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
            return {
              ...task,
              isCompleted: !isCompleted,
            };
          } else {
            return task;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (id) => {
    setLoading(true);
    try {
      const task = todoList.find((task) => task.id === id);
      const updatedTask = {
        ...task,
        content: editingText,
      };
      await axios.put(
        `https://631462d5fc9dc45cb4ecb7bb.mockapi.io/todos/${id}`,
        updatedTask
      );
      setTodoList(
        todoList.map((task) =>
          task.id === id ? { ...task, content: editingText } : task
        )
      );
      setLoading(false);
      setTodoLoading(null);
      setTodoEditing(null);
      setEditingText("");
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEdit = () => {
    setTodoEditing(null);
    setEditingText("");
  };

  return (
    <ThemeContext.Provider value={{ theme }} style={{ position: "relative" }}>
      {savedUsername ? (
        <div className="container" id={theme}>
          <div className="welcome-text-add-todo" id={theme}>
            <div className="welcome-text-theme-mode" id={theme}>
              <div className="welcome-heading">
                <h1 className="welcome-text">Welcome {savedUsername}</h1>
              </div>
              <div className="theme-buttons">
                <button className="mode-btn" onClick={toggleTheme}>
                  <i
                    className={`fa-${
                      theme === "light" ? "regular" : "solid"
                    } fa-lightbulb`}
                  ></i>
                </button>
              </div>
            </div>
            <div className="add-todo" id={theme}>
              <AddTodo
                handleChange={setNewTask}
                addTask={addTask}
                value={newTask}
                addLoading={addLoading}
              />
            </div>
          </div>
          <div className="todo-component" id={theme}>
            <div className="todos" id={theme}>
              {todoList.map((task) => {
                return (
                  <Todo
                    cancelEdit={cancelEdit}
                    todoEditing={todoEditing}
                    setTodoEditing={setTodoEditing}
                    setTodoLoading={setTodoLoading}
                    editingText={editingText}
                    setEditingText={setEditingText}
                    completeTask={completeTask}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    isCompleted={task.isCompleted}
                    key={task.id}
                    content={task.content}
                    id={task.id}
                    loading={todoLoading === task.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="login-container" id={theme}>
          {loginLoading ? (
            <Login
              handleChange={setUsername}
              handleLogin={handleLogin}
              value={username}
            />
          ) : (
            <Loading />
          )}
        </div>
      )}
    </ThemeContext.Provider>
  );
}

export default App;
