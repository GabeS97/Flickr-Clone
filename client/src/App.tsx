import React, { useEffect } from "react";
import { Counter } from "./features/Counter/Counter";
import SplashPage from "./features/SplashPage/SplashPage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./features/Auth/LoginPage/LoginPage";
import SignupPage from "./features/Auth/SignupPage/SignupPage";
import Header from "./features/Header/Header";

function App() {
  let path: string = window.location.pathname;

  useEffect(() => {}, [path]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
}

export default App;
