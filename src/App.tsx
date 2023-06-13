import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./interfaces/RootState";
import Loading from "./components/Loading/Loading";
import { getUserData } from "./redux/actions/users";
import { closeLoading, openLoading } from "./redux/actions/loading";
import swal from "sweetalert";
import { auth } from "./firebase";

function App() {
  const redirect = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    dispatch(openLoading());
    setTimeout(() => {
      if (auth.currentUser) {
        dispatch<any>(getUserData())
          .then(() => {
            dispatch<any>(getUserData())
              .then(() => {
                console.log("Termino de cargar");
                redirect("/dashboard/");
                dispatch(closeLoading());
              })
              .catch((err: any) => {
                console.log(err);
                redirect("/dashboard/");
                dispatch(closeLoading());
                swal(
                  "Error",
                  "Error al cargar los datos del usuario, intentelo mas tarde",
                  "error"
                );
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
      }else{
        redirect("/login");
        dispatch(closeLoading());
      }
    }, 1000);
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
