import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TaskPage from "./TaskPage";

function Dashboard({ handleIsLoggedIn }) {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState("");

  function handleNewClient(clientData) {
    setNewClient(clientData);
  }

  useEffect(_ => {
    fetch("http://localhost:3000/clients")
    .then(response => response.json())
    .then(data => setClients(data));
  }, [newClient]);

  return (
    <div className="min-h-full">
      <Sidebar clients={clients} addClient={handleNewClient} handleIsLoggedIn={handleIsLoggedIn} />
      <TaskPage clients={clients} addClient={handleNewClient} />
    </div>
  );
}

export default Dashboard;