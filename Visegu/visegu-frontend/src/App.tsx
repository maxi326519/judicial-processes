import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import SideBarAccordion from "./components/SideBar/SideBarAccordion";
import Navbar from "./components/Navbar/Navbar";

import './App.css';
import ResetEmail from "./pages/ResetEmail/ResetEmail";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Products from "./pages/Dashboard/Inventory/Products/Products";
import Stocks from "./pages/Dashboard/Inventory/Stock/Stock";
import Storages from "./pages/Dashboard/Inventory/Storages/Storages";
import Users from "./pages/Dashboard/Users/Users";
import Consult from "./pages/Dashboard/Inventory/Stock copy/Consult";
import Movements from "./pages/Dashboard/Movements/Movements";

function App() {
  const redirect = useNavigate();

  useEffect(() => {
    redirect("dashboard");
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-email" element={<ResetEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>

      <div className="dashboard">
        <SideBarAccordion />
        <Navbar />
        <Routes>
          {/* USERS */}
          <Route path="/dashboard/users" element={<Users />} />

          {/* INVENTORY */}
          <Route path="/dashboard/inventory/products" element={<Products />} />
          <Route path="/dashboard/inventory/stock" element={<Stocks />} />
          <Route path="/dashboard/inventory/storages" element={<Storages />} />
          <Route path="/dashboard/inventory/consult" element={<Consult />} />

          {/* MOVEMENTS */}
          <Route path="/dashboard/movements" element={<Movements />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
