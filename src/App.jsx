import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import Protected from "./Protected";
import Dashboard from "./Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleIsLoggedIn(authentication) {
    setIsLoggedIn(authentication);
  }

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          isLoggedIn
          ? <Navigate replace to={"/dashboard"} />
          : <LoginForm handleIsLoggedIn={handleIsLoggedIn} />
        }
      />
      <Route
        exact
        path="/dashboard"
        element={
          <Protected loginStatus={handleIsLoggedIn}>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/dashboard/:id"
        element={
          <Protected loginStatus={handleIsLoggedIn}>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/dashboard/new-task"
        element={
          <Protected loginStatus={handleIsLoggedIn}>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/dashboard/:id/new-task"
        element={
          <Protected loginStatus={handleIsLoggedIn}>
            <Dashboard />
          </Protected>
        }
      />
    </Routes>
  );
}

export default App;
