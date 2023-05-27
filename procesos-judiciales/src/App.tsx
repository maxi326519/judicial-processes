import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const redirect = useNavigate();

  useEffect(() => {
    redirect("/dashboard");
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
