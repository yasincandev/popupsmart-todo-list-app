import { createContext, useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import Login from "./components/Login";
import TodoList from "./components/TodoList";
import axios from "axios";

export const ThemeContext = createContext(null);

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [savedUsername, setSavedUsername] = useState("");
  const [username, setUsername] = useState("");

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storageUsername = localStorage.getItem("username");
    if (storageUsername) {
      setSavedUsername(storageUsername);
    }
  }, []);

  useEffect(() => {
    async function getTodos() {
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
  }, [todoList]);

  const addTask = async (e) => {
    e.preventDefault();
    const task = {
      content: newTask,
      isCompleted: false,
      id: Math.floor(Math.random() * 1000),
    };

    if (newTask.length < 3) {
      alert("Task must be at least 3 characters long");
      return;
    }

    try {
      await axios.post(
        `https://631462d5fc9dc45cb4ecb7bb.mockapi.io/todos`,
        task
      );

      setTodoList([...todoList, task]);
      setNewTask("");
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
    }
  };

  const completeTask = async (id) => {
    try {
      await axios.put(
        `https://631462d5fc9dc45cb4ecb7bb.mockapi.io/todos/${id}`,
        {
          isCompleted: true,
        }
      );
      setTodoList(
        todoList.map((task) => {
          if (task.id === id) {
            return { ...task, isCompleted: true };
          } else {
            return task;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const submitEdits = async (id) => {
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
    } catch (error) {
      console.log(error);
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    e.preventDefault();
    setNewTask(e.target.value);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleLogin = (e) => {
    localStorage.setItem("username", username);
    setSavedUsername(username);
  };
  return savedUsername ? (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="container" id={theme}>
        <div className="text-toggle-container">
          <h1 className="welcome-text">Welcome {savedUsername}</h1>
          {theme === "light" ? (
            <button className="mode-btn" onClick={toggleTheme}>
              <i class="fa-regular fa-moon"></i>
            </button>
          ) : (
            <button className="mode-btn" onClick={toggleTheme}>
              <i class="fa-regular fa-sun"></i>
            </button>
          )}
        </div>
        <div className="todo-app" id={theme}>
          <AddTodo
            formSubmit={formSubmit}
            handleChange={handleChange}
            addTask={addTask}
            value={newTask}
          />
          <div className="list-container" id={theme}>
            {todoList.map((task) => {
              return (
                <TodoList
                  todoEditing={todoEditing}
                  setTodoEditing={setTodoEditing}
                  editingText={editingText}
                  setEditingText={setEditingText}
                  completeTask={completeTask}
                  submitEdits={submitEdits}
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
    </ThemeContext.Provider>
  ) : (
    <ThemeContext.Provider>
      <Login
        username={username}
        setUsername={setUsername}
        handleLogin={handleLogin}
      />
    </ThemeContext.Provider>
  );
}

export default App;

/*   const submitEdits = (id) => {
    setTodoList(
      todoList.map((task) => {
        if (task.id === id) {
          return { ...task, taskName: editingText };
        } else {
          return task;
        }
      })
    );
    setTodoEditing(null);
  }; */

/*   const completeTask = (id) => {
  setTodoList(
    todoList.map((task) => {
      if (task.id === id) {
        return { ...task, completed: true };
      } else {
        return task;
      }
    })
  );
}; */

/* const addTask = async () => {
  const task = {
    id: new Date().getTime(),
    taskName: newTask,
    completed: false,
  };
  setTodoList([...todoList, task]);
  setNewTask("");
};
*/

/*   const deleteTask = (id) => {
  setTodoList(todoList.filter((task) => task.id !== id));
}; */
