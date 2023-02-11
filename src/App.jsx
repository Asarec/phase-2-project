import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import Protected from "./Protected";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleIsLoggedIn(authentication) {
    setIsLoggedIn(authentication);
  }

  return (
    <h1>Hello, World!</h1>
  );
}

export default App;
