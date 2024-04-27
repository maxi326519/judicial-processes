import { Routes, Route, useNavigate } from "react-router-dom";
import { closeLoading, openLoading } from "./redux/actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { updateUserHistory } from "./redux/actions/history";
import { Configuration } from "./pages/Configuration/Configuration";
import { getUserData } from "./redux/actions/sesion";
import { RootState } from "./interfaces/RootState";
import { getLists } from "./redux/actions/Processes/lists";
import { UserRol } from "./interfaces/users";
import { auth } from "./firebase/config";
import {
  getProcessesConfig,
  getRequirementsConfig,
  getTutelasConfig,
} from "./redux/actions/config";

import ThemeChart from "./pages/Home/Tutelas/ThemeChart/ThemeChart";
import swal from "sweetalert";

import "./App.css";
import "./animation.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "./components/Dashboard/Dashboard";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Loading from "./components/Loading/Loading";

import Login from "./pages/Login/Login";
import ResetEmail from "./pages/ResetEmail/ResetEmail";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import UsersTable from "./pages/Tables/Users/Users";

import ProcessesHome from "./pages/Home/Processes/Home";
import ProcessesTable from "./pages/Tables/Processes/Table/ProcessesTable";
import ProcessesIframe from "./pages/Tables/Processes/Iframes/Iframes";
import ProcessesExcel from "./pages/Tables/Processes/Excel/Excel";

import TutelasHome from "./pages/Home/Tutelas/Home";
import TutelasTable from "./pages/Tables/Tutelage/Table/TutelaTable";
import TutelasIframe from "./pages/Tables/Tutelage/Iframes/Iframes";
import TutelasExcel from "./pages/Tables/Tutelage/Excel/Excel";

import RequirementsHome from "./pages/Home/Requirements/Home";
import RequirementsTable from "./pages/Tables/Requirements/Table/RequirementsTable";
import RequirementsIframe from "./pages/Tables/Requirements/Iframes/Iframes";
import RequirementsExcel from "./pages/Tables/Requirements/Excel/Excel";

import PoderesHome from "./pages/Home/Poderes/Home";
import PoderTable from "./pages/Tables/Poderes/Table/PoderTable";
import PoderesIframe from "./pages/Tables/Poderes/Iframes/Iframes";
import PoderesExcel from "./pages/Tables/Poderes/Excel/Excel";

import ConciliacionTable from "./pages/Tables/Conciliacion/Table/ConciliacionesTable";
import ConciliacionIframe from "./pages/Tables/Conciliacion/Iframes/Iframes";
import ConcilidacionExcel from "./pages/Tables/Conciliacion/Excel/Excel";

function App() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const loading = useSelector((state: RootState) => state.loading);
  const [ingress, setIngress] = useState<boolean>(false);
  let register = false;

  useEffect(() => {
    redirect("/login");
    dispatch(openLoading());
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        dispatch<any>(getUserData())
          .then(() => {
            redirect("/dashboard/home/procesos");
            setIngress(true);
            Promise.all([
              dispatch<any>(getLists()),
              dispatch<any>(getProcessesConfig()),
              dispatch<any>(getTutelasConfig()),
              dispatch<any>(getRequirementsConfig()),
            ])
              .then(async () => {
                dispatch(closeLoading());
              })
              .catch((error: Error) => {
                console.log(error.message);
                dispatch(closeLoading());
                swal("Error", "Hubo un error al cargar algunos datos", "error");
              });
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
    });

    setTimeout(() => {
      if (!auth.currentUser) {
        redirect("/login");
        dispatch(closeLoading());
      }
    }, 5000);
  }, []);

  useEffect(() => {
    if (ingress && !register && user.id) {
      console.log("App");
      console.log(ingress, !register, user.id);
      dispatch<any>(updateUserHistory(user, false, true)).catch(
        (error: any) => {
          console.log(error);
        }
      );
      register = true;
      setIngress(false);
    }
  }, [user, ingress]);

  return (
    <div className="App">
      {loading && <Loading />}
      <div className="deleteComponent">
        <ThemeChart />
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/reset-email" element={<ResetEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/dashboard/home/procesos" element={<ProcessesHome />} />
        <Route path="/dashboard/home/tutelas" element={<TutelasHome />} />
        <Route
          path="/dashboard/home/requerimientos"
          element={<RequirementsHome />}
        />
        <Route path="/dashboard/home/poderes" element={<PoderesHome />} />

        <Route
          path="/dashboard/usuarios"
          element={
            user.rol === UserRol.Admin ? (
              <Dashboard
                element={<UsersTable />}
                title={"Listado de Usuarios"}
              />
            ) : (
              <PageNotFound />
            )
          }
        />

        <Route
          path="/dashboard/configuracion"
          element={
            user.rol === UserRol.Admin ? (
              <Dashboard element={<Configuration />} title={"Configuracion"} />
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
                title={"Listado de Procesos"}
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
        <Route
          path="/dashboard/requerimientos"
          element={
            user.rol === UserRol.Admin || user.permissions.requirements ? (
              <Dashboard
                element={<RequirementsTable />}
                title={"Requerimientos - Tabla"}
              />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/dashboard/requerimientos/graficos"
          element={
            user.rol === UserRol.Admin || user.permissions.requirements ? (
              <Dashboard
                element={<RequirementsIframe />}
                title={"Requerimientos - Gráficos"}
              />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/dashboard/requerimientos/excel"
          element={
            user.rol === UserRol.Admin || user.permissions.requirements ? (
              <Dashboard
                element={<RequirementsExcel />}
                title={"Requerimientos - Excel"}
              />
            ) : (
              <PageNotFound />
            )
          }
        />

        {/* PAGOS */}
        <Route
          path="/dashboard/poderes"
          element={
            user.rol === UserRol.Admin || user.permissions.poderes ? (
              <Dashboard element={<PoderTable />} title={"Poderes - Tabla"} />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/dashboard/poderes/graficos"
          element={
            user.rol === UserRol.Admin || user.permissions.poderes ? (
              <Dashboard
                element={<PoderesIframe />}
                title={"Poderes - Gráficos"}
              />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/dashboard/poderes/excel"
          element={
            user.rol === UserRol.Admin || user.permissions.poderes ? (
              <Dashboard element={<PoderesExcel />} title={"Poderes - Excel"} />
            ) : (
              <PageNotFound />
            )
          }
        />

        {/* CONCILIACION */}
        <Route
          path="/dashboard/concilidaciones"
          element={
            user.rol === UserRol.Admin || user.permissions.conciliaciones ? (
              <Dashboard
                element={<ConciliacionTable />}
                title={"Concilidaciones - Tabla"}
              />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/dashboard/conciliaciones/graficos"
          element={
            user.rol === UserRol.Admin || user.permissions.conciliaciones ? (
              <Dashboard
                element={<ConciliacionIframe />}
                title={"Concilidaciones - Gráficos"}
              />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/dashboard/conciliaciones/excel"
          element={
            user.rol === UserRol.Admin || user.permissions.conciliaciones ? (
              <Dashboard
                element={<ConcilidacionExcel />}
                title={"Concilidaciones - Excel"}
              />
            ) : (
              <PageNotFound />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
