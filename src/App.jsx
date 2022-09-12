import { createContext, useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import Login from "./components/Login";
import Todo from "./components/Todo";
import axios from "axios";
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
  const [loadingTodoId, setLoadingTodoId] = useState("");
  const [checkingUsername, setCheckingUsername] = useState(true);
  const [fetchingTodos, setFetchingTodos] = useState(false);
  const loading = checkingUsername || fetchingTodos;

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setSavedUsername(username);
    }
    setCheckingUsername(false);
  }, []);

  useEffect(() => {
    const storageTheme = localStorage.getItem("theme");
    if (storageTheme) {
      setTheme(storageTheme);
    }
  }, []);

  useEffect(() => {
    async function getTodos() {
      setFetchingTodos(true);
      try {
        const response = await axios.get(
          `https://631462d5fc9dc45cb4ecb7bb.mockapi.io/todos`
        );
        setTodoList(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setFetchingTodos(false);
      }
    }
    if (savedUsername) {
      getTodos();
    }
  }, [savedUsername]);

  const handleLogin = () => {
    localStorage.setItem("username", username);
    setSavedUsername(username);
  };

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
    try {
      await axios.delete(
        `https://631462d5fc9dc45cb4ecb7bb.mockapi.io/todos/${id}`
      );
      setTodoList(todoList.filter((task) => task.id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTodoId("");
    }
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
    } finally {
      setLoadingTodoId("");
    }
  };

  const editTask = async (id) => {
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
      setTodoEditing(null);
      setEditingText("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTodoId("");
    }
  };

  const cancelEdit = () => {
    setTodoEditing(null);
    setEditingText("");
  };

  return (
    <ThemeContext.Provider value={{ theme, isLight }}>
      {loading ? (
        <Loading id={theme} isLight={isLight} />
      ) : savedUsername ? (
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
                    setTodoLoading={setLoadingTodoId}
                    editingText={editingText}
                    setEditingText={setEditingText}
                    completeTask={completeTask}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    isCompleted={task.isCompleted}
                    key={task.id}
                    content={task.content}
                    id={task.id}
                    loading={loadingTodoId === task.id}
                  />
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <Login
          handleChange={setUsername}
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
        />
      )}
    </ThemeContext.Provider>
  );
}

export default App;
