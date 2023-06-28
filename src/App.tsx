import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./interfaces/RootState";
import { Routes, Route, useNavigate } from "react-router-dom";
import { closeLoading, openLoading } from "./redux/actions/loading";
import { getUserData } from "./redux/actions/sesion";
import { auth } from "./firebase/config";
import { useEffect } from "react";
import swal from "sweetalert";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Loading from "./components/Loading/Loading";
import ResetEmail from "./pages/ResetEmail/ResetEmail";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import UsersTable from "./pages/Tables/Users/Users";

import ProcessesTable from "./pages/Tables/Processes/Table/ProcessesTable";
import ProcessesIframe from "./pages/Tables/Processes/Iframes/Iframes";
import ProcessesExcel from "./pages/Tables/Processes/Excel/Excel";

import TutelasTable from "./pages/Tables/Tutelage/Table/TutelaTable";
import TutelasIframe from "./pages/Tables/Tutelage/Iframes/Iframes";
import TutelasExcel from "./pages/Tables/Tutelage/Excel/Excel";
import Dashboard from "./components/Dashboard/Dashboard";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { UserRol } from "./interfaces/users";

/* import RequirementsTable from "./pages/Tables/Requirements/Table/RequirementsTables";
import RequirementsIframe from "./pages/Tables/Requirements/Iframes/Iframes";
import RequirementsExcel from "./pages/Tables/Requirements/Excel/Excel"; */

function App() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const loading = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    redirect("/login");
    dispatch(openLoading());
    setTimeout(() => {
      if (auth.currentUser) {
        dispatch<any>(getUserData())
          .then(() => {
            redirect("/dashboard/home");
            dispatch(closeLoading());
          })
          .catch((err: any) => {
            console.log(err);
            dispatch(closeLoading());
            swal(
              "Error",
              "Hubo un error desconocido al iniciar sesion",
              "error"
            );
          });
      } else {
        redirect("/login");
        dispatch(closeLoading());
      }
    }, 1000);
  }, []);

  return (
    <div className="App">
      {loading && <Loading />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-email" element={<ResetEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard/home"
          element={<Dashboard element={<Home/>} title={"Home"} />}
        />
        <Route
          path="/dashboard/usuarios"
          element={
            user.rol === UserRol.Admin ? (
              <Dashboard element={<UsersTable />} title={"Listado de users"} />
            ) : (
              <PageNotFound />
            )
          }
        />

        <Route
          path="/dashboard/procesos"
          element={
            user.rol === UserRol.Admin || user.permissions.processes ? (
              <Dashboard
                element={<ProcessesTable />}
                title={"Listado de processes"}
              />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/dashboard/procesos/graficos"
          element={
            user.rol === UserRol.Admin || user.permissions.processes ? (
              <Dashboard
                element={<ProcessesIframe />}
                title={"Procesos - Gráficos"}
              />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/dashboard/procesos/excel"
          element={
            user.rol === UserRol.Admin || user.permissions.processes ? (
              <Dashboard
                element={<ProcessesExcel />}
                title={"Procesos - Excel"}
              />
            ) : (
              <PageNotFound />
            )
          }
        />

        {/* TUTELAS */}
        <Route
          path="/dashboard/tutelas"
          element={
            user.rol === UserRol.Admin || user.permissions.tutelas ? (
              <Dashboard
                element={<TutelasTable />}
                title={"Listado de Tutelas"}
              />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/dashboard/tutelas/graficos"
          element={
            user.rol === UserRol.Admin || user.permissions.tutelas ? (
              <Dashboard
                element={<TutelasIframe />}
                title={"Tutelas - Gráficos"}
              />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/dashboard/tutelas/excel"
          element={
            user.rol === UserRol.Admin || user.permissions.tutelas ? (
              <Dashboard element={<TutelasExcel />} title={"Tutelas - Excel"} />
            ) : (
              <PageNotFound />
            )
          }
        />

        {/* REQUIREMENTS */}
        <Route path="/dashboard/requerimientos" element={<PageNotFound />} />
        <Route
          path="/dashboard/requerimientos/graficos"
          element={<PageNotFound />}
        />
        <Route
          path="/dashboard/requerimientos/excel"
          element={<PageNotFound />}
        />
      </Routes>
    </div>
  );
}

export default App;
