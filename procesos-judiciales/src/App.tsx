import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { RootState } from "./interfaces/RootState";
import Loading from "./components/Loading/Loading";

function App() {
  const redirect = useNavigate();
  const loading = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    redirect("/dashboard");
  }, []);

  return (
    <div className="App">
      {loading ? <Loading /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
