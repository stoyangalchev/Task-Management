import "./App.css";
import Header from "./components/Header";
import AddForm from "./components/AddForm";
import Item from "./components/Item";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function deleteTask(id) {
    const updatedTasks = tasks.filter((item) => item.id !== id);
    setTasks(updatedTasks);
  }

  function editTask(id) {
    setEditId(id);
    const taskToEdit = tasks.find((item) => item.id === id);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
    }
  }

  function saveTask(e) {
    e.preventDefault();
    if (!title) {
      alert("Please enter a task!");
      return;
    }

    if (editId) {
      const updatedTasks = tasks.map((item) =>
        item.id === editId ? { ...item, title: title } : item
      );
      setTasks(updatedTasks);
      setEditId(null);
    } else {
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        title: title,
      };
      setTasks([...tasks, newTask]);
    }
    setTitle(""); 
  }

  return (
    <div className={`App ${theme}`}>
      <Header theme={theme} setTheme={setTheme} />
      <div className="container">
        <AddForm
          title={title}
          setTitle={setTitle}
          saveTask={saveTask}
          editId={editId}
        />
        <section>
          {tasks.map((task) => (
            <Item
              key={task.id}
              data={task}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default App;
