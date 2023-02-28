import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TaskPage from "./TaskPage";
import TaskList from "./TaskList";

function Dashboard({ handleIsLoggedIn }) {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState("");
  const [newTask, setNewTask] = useState("");
  const [task, setTask] = useState("");

  function handleNewClient(clientData) {
    setNewClient(clientData);
  }

  function handleNewTask(task) {
    setNewTask(task);
  }

  function handleTaskStatus(status) {
    setTask(status);
  }

  useEffect(_ => {
    fetch("http://localhost:3000/clients")
    .then(response => response.json())
    .then(data => setClients(data));
  }, [newClient, task]);

  return (
    <div className="min-h-full">
      <Sidebar clients={clients} addClient={handleNewClient} handleIsLoggedIn={handleIsLoggedIn} />
      <TaskPage clients={clients} addClient={handleNewClient} handleNewTask={handleNewTask} />
      <TaskList clients={clients} handleTaskStatus={handleTaskStatus} />
    </div>
  );
}

export default Dashboard;