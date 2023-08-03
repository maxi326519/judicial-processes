import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./interfaces/RootState";
import { Routes, Route, useNavigate } from "react-router-dom";
import { closeLoading, openLoading } from "./redux/actions/loading";
import { getUserData } from "./redux/actions/sesion";
import { auth, db } from "./firebase/config";
import { useEffect } from "react";
import { UserRol } from "./interfaces/users";
import { Configuration } from "./pages/Configuration/Configuration";
import { getLists } from "./redux/actions/Processes/lists";
import {
  getProcessesConfig,
  getRequirementsConfig,
  getTutelasConfig,
} from "./redux/actions/config";
import ThemeChart from "./pages/Home/Tutelas/ThemeChart/ThemeChart";
import swal from "sweetalert";

import "./App.css";
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

import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import ProcessesChart from "./pages/Home/Processes/ProcessesChart/ProcessesChart";
import TutelasChart from "./pages/Home/Tutelas/TutelasChart/TutelasChart";
import { setItem } from "./redux/actions/Requirements/lists";

const listas = [
  {
    name: "remitenteGeneral",
    data: [
      "APODERADO",
      "JUZGADO",
    ]
  },
  {
    name: "areaApoyo",
    data: [
      "SUBSECRETARÍA DE PLANEACIÓN TERRITORIAL",
      "DIRECCIÓN ADMINISTRATIVA",
      "DIRECCIÓN DE CARTOGRAFÍA SUBSECRETARÍA DE PLANEACIÓN TERRITORIAL",
    ]
  },
  {
    name: "tipoProceso",
    data: [
      "EXTRAORDINARIA ADQUISITIVA DE DOMINIO",
      "PERTENENCIA",
      "RESTITUCION DE TIERRAS",
      "VERBAL",
      "VERBAL DE PERTENENCIA",
      "VERBAL DIVISORIO",
      "VERBAL ESPECIAL"
    ]
  },
  {
    name: "estado",
    data: [
      "ACTIVO",
      "TERMINADO",
    ]
  },
  {
    name: "remitenteEspecifico",
    data: [
      "JUZGADO (18) DIECIOCHO CIVIL DEL CIRCUITO",
      "JUZGADO 008 CIVIL DEL CIRCUITO DE BOGOTÁ D.C.",
      "JUZGADO 011 CIVIL DE CIRCUITO DE BOGOTÁ D.C.",
      "JUZGADO 015 CIVIL MUNICIPAL DE BOGOTA D.C.",
      "JUZGADO 017 CIVIL MUNICIPAL DE BOGOTA D.C.",
      "JUZGADO 018 CIVIL DEL CIRCUITO DE BOGOTA",
      "JUZGADO 018 CIVIL MUNICIPAL DE BOGOTA",
      "JUZGADO 019 DIECINUEVE CIVIL MUNICIPAL DE ORALIDAD",
      "JUZGADO 02 CIVIL MUNICIPAL - BOGOTÁ",
      "JUZGADO 020 CIVIL MUNICIPAL DE ORALIDAD DE BOGOTA",
      "JUZGADO 021 CIVIL DEL CIRCUITO DE BOGOTA DC",
      "JUZGADO 022 CIVIL DE CIRCUITO DE BOGOTA D.C.",
      "JUZGADO 022 CIVIL MUNICIPAL DE BOGOTA D.C.",
      "JUZGADO 025 CIVIL MUNICIPAL DE BOGOTA DC",
      "JUZGADO 026 CIVIL MUNICIPAL DE BOGOTA D.C",
      "JUZGADO 026 CIVIL MUNICIPAL DE BOGOTA D.C.",
      "JUZGADO 027 CIVIL DE CIRCUITO DE BOGOTA DC",
      "JUZGADO 027 CIVIL MUNICIPAL DE BOGOTA D.C.",
      "JUZGADO 027 CIVIL MUNICIPAL DE ORALIDAD",
      "JUZGADO 027 VEINTISIETE CIVIL DEL CIRCUITO DE BOGOTA",
      "JUZGADO 028 CIVIL MUNICIPAL DE BOGOTA D.C.",
      "JUZGADO 031 CIVIL DEL CIRCUITO DE ORALIDAD DE BOGOTA",
      "JUZGADO 031 CIVIL MUNICIPAL DE BOGOTA",
      "JUZGADO 032 CIVIL DEL CIRCUITO",
      "JUZGADO 033 CIVIL DEL CIRCUITO",
      "JUZGADO 037 CIVIL MUNICIPAL DE BOGOTA D.C.",
      "JUZGADO 04 CIVIL MUNICIPAL",
      "JUZGADO 043 CIVIL MUNICIPAL DE BOGOTA D.C.",
      "JUZGADO 044 CIVIL MUNICIPAL DE BOGOTA D.C.",
      "JUZGADO 046 CIVIL DEL CIRCUITO DE BOGOTA",
      "JUZGADO 046 CIVIL MUNICIPAL DE ORALIDAD",
      "JUZGADO 048 CIVIL MUNICIPAL DE BOGOTA DC",
      "JUZGADO 05 CIVIL MUNICIPAL DE BOGOTA D.C",
      "JUZGADO 054 CIVIL MUNICIPAL DE BOGOTA D.C.",
      "JUZGADO 055 CIVIL MUNICIPAL DE BOGOTÀ",
      "JUZGADO 057 CIVIL MUNICIPAL DE ORALIDAD DE BOGOTÁ D.C.",
      "JUZGADO 059 DE PEQUEÑAS CAUSAS CAUSAS Y COMPETENCIA MULTIPLE DE BOGOTA",
      "JUZGADO 06 CIVIL MUNICIPAL DE BOGOTA D.C",
      "JUZGADO 066 DE PEQUEÑAS CAUSAS Y COMPETENCIA MULTIPLE",
      "JUZGADO 08 CIVIL MUNICIPAL - BOGOTÁ",
      "JUZGADO 1 CIVIL MUNICIPAL DE BOGOTA",
      "JUZGADO 11 CIVIL MUNICIPAL",
      "JUZGADO 11 CIVIL MUNICIPAL DE BOGOTA",
      "JUZGADO 11 CIVIL MUNICIPAL DE BOGOTÁ",
      "JUZGADO 11 CIVIL MUNICIPAL DE BOGOTÁ DE BOGOTÁ,",
      "JUZGADO 11 CIVIL MUNICIPAL DE BOGOTÁ,",
      "JUZGADO 14 CIVIL MUNICIPAL - BOGOTÁ",
      "JUZGADO 17 CIVIL MUNICIPAL DE BOGOTA",
      "JUZGADO 17 CIVIL MUNICIPAL DE BOGOTÁ D.C",
      "JUZGADO 22 CIVIL MUNICIPAL - BOGOTÁ",
      "JUZGADO 23 CIVIL CIRCUITO DE BOGOTÁ",
      "JUZGADO 23 CIVIL DEL CIRCUITO DE BOGOTÁ",
      "JUZGADO 25 CIVIL MUNICIPAL - BOGOTÁ",
      "JUZGADO 26 CIVIL MUNICIPAL",
      "JUZGADO 28 DE PEQUEÑAS CAUSAS Y COMPENTENCIA MULTIPLE DE BOGOTÁ D.C.",
      "JUZGADO 29 CIVIL MUNICIPAL DE BOGOTÁ",
      "JUZGADO 29 CIVIL MUNICIPAL DE BOGOTÁ,",
      "JUZGADO 31 CIVIL CIRCUITO - BOGOTÁ",
      "JUZGADO 31 CIVIL MUNICIPAL",
      "JUZGADO 33 CIVIL CIRCUITO - BOGOTÁ",
      "JUZGADO 33 CIVIL DEL CIRCUITO DE BOGOTÁ",
      "JUZGADO 33 CIVIL DEL CIRCUITO DE BOGOTÁ,",
      "JUZGADO 33 CIVIL MUNICIPAL DE BOGOTA",
      "JUZGADO 35 CIVIL DEL CIRCUITO DE BOGOTÁ D.C",
      "JUZGADO 35 CIVIL DEL CIRCUITO DE BOGOTÁ,",
      "JUZGADO 35 CIVIL MUNICIPAL DE BOGOTÁ",
      "JUZGADO 36 CIVIL CIRCUITO - BOGOTÁ",
      "JUZGADO 36 CIVIL DEL CIRCUITO DE BOGOTÁ D.C",
      "JUZGADO 38 DE PEQUEÑAS CAUSAS Y COMPETENCIA MÚLTIPLE DE BOGOTÁ,",
      "JUZGADO 40 CIVIL DE CIRCUITO DE BOGOTA D.C.",
      "JUZGADO 41 CIVIL MUNICIPAL",
      "JUZGADO 42 CIVIL CIRCUITO - BOGOTA - BOGOTA D.C.",
      "JUZGADO 43 CIVIL MUNICIPAL - BOGOTÁ",
      "JUZGADO 46 CIVIL CIRCUITO - BOGOTÁ",
      "JUZGADO 46 CIVIL MUNICIPAL DE ORALIDAD DE BOGOTÁ,",
      "JUZGADO 48 CIVIL MUNICIPAL - BOGOTÁ",
      "JUZGADO 48 CIVIL MUNICIPAL DE BOGOTÁ",
      "JUZGADO 48° CIVIL MUNICIPAL DE BOGOTÁ",
      "JUZGADO 4TO CIVIL MUNICIPAL",
      "JUZGADO 5° CIVIL MUNICIPAL DE BOGOTÁ",
      "JUZGADO 51 CIVI MUNICIPAL",
      "JUZGADO 53 CIVIL CIRCUITO DE BOGOTÁ",
      "JUZGADO 53 CIVIL MUNICIPAL DE BOGOTÁ",
      "JUZGADO 55 CIVIL MUNICIPAL",
      "JUZGADO 55 CIVIL MUNICIPAL DE BOGOTÁ",
      "JUZGADO 55 CIVIL MUNICIPAL DE BOGOTÁ,",
      "JUZGADO 71 CIVIL MUNICIPAL DE BOGOTÁ",
      "JUZGADO 78 CIVIL MUNICIPAL AHORA JUZGADO 60 DE PEQUEÑAS CAUSAS Y COMPETENCIA MÚLTIPLE DE BOGOTÁ D. C.",
      "JUZGADO 79 CIVIL MUNICIPAL BOGOTÁ D.C",
      "JUZGADO CINCUENTA Y CINCO CIVIL MUNICIPAL DE BOGOTÁ D.C",
      "JUZGADO CINCUENTA Y DOS (52) CIVIL MUNICIPAL DE BOGOTÁ",
      "JUZGADO CINCUENTA Y OCHO DE PEQUEÑAS CAUSAS Y COMPETENCIA MULTIPLE DE BOGOTA D.C. (TRANSITORIAMENTE)",
      "JUZGADO CINCUENTA Y SIETE (57) CIVIL MUNICIPAL DE BOGOTÁ D.C.",
      "JUZGADO CINCUENTA Y TRES (53) CIVIL MUNICIPAL DE BOGOTÁ D.C",
      "JUZGADO CIRCUITO 002 ESPECIALIZADO EN RESTITUCIÓN DE TIERRAS DE VILLAVICENCIO (META)",
      "JUZGADO CIVIL DEL CIRCUITO ESPECIALIZADO EN RESTITUCION DE TIERRAS DE CUNDINAMARCA",
      "JUZGADO CIVIL DEL CIRCUITO ESPECIALIZADO EN RESTITUCIÓN DE TIERRAS DEL DISTRITO JUDICIAL DE CUNDINAMARCA",
      "JUZGADO CIVIL- MUNICIPAL- 033",
      "JUZGADO CUARENT",
      "JUZGADO CUARENTA CIVIL DEL CIRCUITO",
      "JUZGADO CUARENTA CIVIL DEL CIRCUITO DE BOGOTÁ D.C.",
      "JUZGADO CUARENTA CIVIL MUNICIPAL",
      "JUZGADO CUARENTA CIVIL MUNICIPAL DE ORALIDAD DE BOGOTA D.C",
      "JUZGADO CUARENTA CIVIL MUNICIPAL DE ORALIDAD DE BOGOTA D.C.",
      "JUZGADO CUARENTA Y CUATRO (44) CIVIL MUNICIPAL DE BOGOTÁ",
      "JUZGADO CUARENTA Y CUATRO (44) MUNICIPAL DE BOGOTA",
      "JUZGADO CUARENTA Y CUATRO CIVIL DEL CIRCUITO",
      "JUZGADO CUARENTA Y OCHO CIVIL MUNICIPAL",
      "JUZGADO CUARENTA Y SEIS (46) CIVIL DEL CIRCUITO DE BOGOTÁ D.C",
      "JUZGADO CUARENTA Y SEIS (46) CIVIL MUNICIPAL DE ORALIDAD BOGOTA D.C.",
      "JUZGADO CUARENTA Y SEIS CIVIL DEL CIRCUITO DE BOGOTÁ",
      "JUZGADO CUARENTA Y SEIS CIVIL MUNICIPAL DE ORALIDAD BOGOTA D.C - YAMILE RINCON HERNANDEZ",
      "JUZGADO CUARENTA Y SIETE CIVIL MUNICIPAL DE BOGOTÁ DC.",
      "JUZGADO CUARENTA Y TRES CIVIL MUNICIPAL",
      "JUZGADO CUARENTA Y UNO (41) CIVIL MUNICIPAL DE BOGOTÁ D.C.",
      "JUZGADO CUARENTA Y UNO (41) CIVIL MUNICIPAL DE BOGOTÁ, D.C.",
      "JUZGADO CUARENTA Y UNO CIVIL MUNICIPAL DE BOGOTÁ D.C.",
      "JUZGADO CUARTO CIVIL MUNICIPAL DE EJECUCIÓN DE SENTENCIAS",
      "JUZGADO CUARTO DE PEQUEÑAS CAUSAS Y COMPETENCIA MULTIPLE POPAYAN",
      "JUZGADO DÉCIMO CIVIL MUNICIPAL DE BOGOTÁ D.C",
      "JUZGADO DÉCIMO CIVIL MUNICIPAL DE BOGOTÁ D.C.",
      "JUZGADO DIECINUEVE (19) CIVIL DEL CIRCUITO DE BOGOTÁ D.C.",
      "JUZGADO DIECINUEVE CIVIL DEL CIRCUITO DE BOGOTA",
      "JUZGADO DIECINUEVE CIVIL MUNICIPAL DE BOGOTÁ D.C.",
      "JUZGADO DIECISIETE (17) CIVIL MUNICIPAL",
      "JUZGADO NOVENO (9O) CIVIL DEL CIRCUITO DE BOGOTÁ D.C.",
      "JUZGADO NOVENO CIVIL MUNICIPAL",
      "JUZGADO PRIMERO 001 CIVIL MUNICIPAL DE SOACHA",
      "JUZGADO PRIMERO CIVIL MUNICIPAL",
      "JUZGADO PRIMERO CIVIL MUNICIPAL DE ORALIDAD",
      "JUZGADO SEGUNDO CIVIL MUNICIPAL",
      "JUZGADO SEGUNDO CIVIL MUNICIPAL DE BOGOTA",
      "JUZGADO SEGUNDO CIVIL MUNICIPAL DE BOGOTÁ D.C.",
      "JUZGADO SEGUNDO CIVIL MUNICIPAL PEREIRA RISARALDA",
      "JUZGADO SEGUNDO CIVIL MUNICIPAL SOACHA - CUNDINAMARCA",
      "JUZGADO SÉPTIMO CIVIL MUNICIPAL DE ORALIDAD DE BOGOTÁ",
      "JUZGADO SESENTA Y OCHO (68) CIVIL MUNICIPAL DE ORALIDAD TRANSITORIAMENTEJUZGADO CINCUENTA (50) DE PEQUEÑAS CAUSAS Y COMPETENCIA MÚLTIPLE DELDISTRITO JUDICIAL DE BOGOTÁ",
      "JUZGADO SEXTO CIVIL MUNICIPAL DE BOGOTÁ D.C.",
      "JUZGADO SEXTO CIVIL MUNICIPAL DE ORALIDAD DE BOGOTA",
      "JUZGADO SEXTO CIVIL MUNICIPAL DE ORALIDAD DE BOGOTÁ",
      "JUZGADO SEXTO CIVIL MUNICIPAL DE ORALIDAD DE BOGOTÁ D.C.",
      "JUZGADO TERCERO CIVIL MUNICIPAL DE BOGOTÁ D.C.",
      "JUZGADO TREINTA CIVIL DEL CIRCUITO DE BOGOTÁ D.C.",
      "JUZGADO TREINTA Y CINCO CIVIL DEL CIRCUITO DE BOGOTA DC",
      "JUZGADO TREINTA Y DOS CIVIL DEL CIRCUIT",
      "JUZGADO TREINTA Y DOS CIVIL DEL CIRCUITO",
      "JUZGADO TREINTA Y OCHO (38) CIVIL MUNICIPAL DE BOGOTÁ D.C.",
      "JUZGADO TREINTA Y SEIS (36) CIVIL MUNICIPAL DE BOGOTÁ D.C.",
      "JUZGADO TREINTA Y SIETE (37) CIVIL MUNICIPAL DE BOGOTÁ D.C.",
      "JUZGADO TREINTA Y SIETE CIVIL DEL CIRCUITO",
      "JUZGADO TREINTA Y UNO (31) CIVIL MUNICIPAL DE ORALIDAD",
      "JUZGADO TREINTA Y UNO (31°) CIVIL DEL CIRCUITO DE BOGOTÁ D.C.",
      "JUZGADO TREINTA Y UNO CIVIL MUNICIPAL",
      "JUZGADO TREINTA Y UNO CIVIL MUNICIPAL DE BOGOTÁ D.C.",
      "JUZGADO TREINTA Y UNO DEL CIRCUITO DE BOGOTA",
      "JUZGADO TREINTAY CINCO CIVIL DEL CIRCUITO DE BOGOTA DC",
      "JUZGADO VEINTE CIVIL MUNICIPAL DE ORALIDAD DE BOGOTÁ",
      "JUZGADO VEINTICINCO (25) CIVIL MUNICIPAL DE BOGOTÁ.",
      "JUZGADO VEINTICINCO CIVIL MUNICIPAL DE BOGOTÁ",
      "JUZGADO VEINTICUATRO CIVIL DEL CIRCUITO DE ORALIDAD",
      "JUZGADO VEINTICUATRO CIVIL MUNICIPAL",
      "JUZGADO VEINTIDOS 22 CIVIL DEL CIRCUITO DE BOGOTA",
      "JUZGADO VEINTIDÓS CIVIL DEL CIRCUITO DE BOGOTÁ D.C.",
      "JUZGADO VEINTIDÓS CIVIL MUNICIPAL",
      "JUZGADO VEINTINUEVE CIVIL MUNICIPAL",
      "JUZGADO VEINTIOCHO CIVIL MUNICIPAL DE BOGOTA D.C.",
      "JUZGADO VEINTISÉIS (26) CIVIL MUNICIPAL DE BOGOTÁ D.C",
      "JUZGADO VEINTISEIS CIVIL MUNICIPAL DE BOGOTA",
      "JUZGADO VEINTISÉIS CIVIL MUNICIPAL DE BOGOTÁ D.C.",
      "JUZGADO VEINTISIETE (27) CIVIL DEL CIRCUITO DE BOGOTÁ D.C.",
      "JUZGADO VEINTISIETE (27) CIVIL MUNICIPAL DE BOGOTÁ D.C.",
      "JUZGADO VEINTISIETE CIVIL DEL CIRCUITO DE BOGOTÁ D.C.",
      "JUZGADO VENTICUATRO CIVIL DEL CIRCUITO DE BOGOTA"
    ]
  }];


function App() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.sesion);
  const loading = useSelector((state: RootState) => state.loading);

  useEffect(() => {

/*     listas.forEach((item, i) => {
      setTimeout(() => {
        dispatch<any>(setItem(item.name, item.data));
      }, i * 1000);
    }); */

    redirect("/login");
    dispatch(openLoading());
    auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        dispatch<any>(getUserData())
          .then(() => {
            redirect("/dashboard/home/procesos");
            Promise.all([
              dispatch<any>(getLists()),
              dispatch<any>(getProcessesConfig()),
              dispatch<any>(getTutelasConfig()),
              dispatch<any>(getRequirementsConfig()),
            ])
              .then(() => {
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
      </Routes>
    </div>
  );
}

export default App;
