import { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
    socket.on("refreshTasks", fetchTasks);
  }, []);

  const addTask = async () => {
    if (!title) return;
    await API.post("/tasks", { title });
    setTitle("");
  };

  const toggleStatus = async (task) => {
    await API.put(`/tasks/${task._id}`, {
      status: task.status === "pending" ? "completed" : "pending"
    });
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Dashboard</h2>

        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={addTask}>Add</button>

        {tasks.map((t) => (
          <div key={t._id} style={{ border: "1px solid", margin: "10px", padding: "10px" }}>
            <h4>{t.title}</h4>
            <p>Status: {t.status}</p>

            <button onClick={() => toggleStatus(t)}>Toggle</button>
            <button onClick={() => deleteTask(t._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
