import * as XLSX from "xlsx";
import swal from "sweetalert";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  TutelaDetails,
  TutelaHeads,
} from "../../../../../../interfaces/Tutelas/data";
import {
  closeLoading,
  openLoading,
} from "../../../../../../redux/actions/loading";

import styles from "./ImportExcel.module.css";

interface Props {
  handleData: (data: any) => void;
  handleClose: () => void;
}

export default function ImportExcel({ handleData, handleClose }: Props) {
  const dispatch = useDispatch();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(openLoading());
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        dispatch(openLoading());
        try {
          let data: any = [];
          const workbook = XLSX.read(e.target?.result, { type: "binary" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const worksheetData: any = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            raw: false,
          });

          worksheetData
            .slice(1)
            .forEach((item: any) => (item[2] ? data.push(item) : null));

          const convert = dataConvert(data);
          handleData(convert);
          handleClose();

          dispatch(closeLoading());
        } catch (err: any) {
          console.log(err);
          dispatch(closeLoading());

          if (
            err.message.includes("La fila") ||
            err.message.includes("El id")
          ) {
            swal("Error", err.message, "error");
          } else {
            swal("Error", "No se pudo cargar el archivo", "error");
          }
        }
      };
      reader.readAsBinaryString(event.target.files[0]);
    }
  };

  function dataConvert(data: any) {
    let newData: TutelaDetails[] = [];
    let idList: number[] = [];

    data.forEach((processes: any, i: number) => {
      const idSiproj = Number(processes[2]);
      if (!idSiproj)
        throw new Error(
          `La fila ${i} tiene problemas con el id: (${processes[2]})`
        );
      if (idList.some((id) => id === idSiproj))
        throw new Error(`El id ${idSiproj} ya existe`);
      idList.push(idSiproj);

      const currentData: TutelaDetails = {
        idSiproj: Number(processes[2]) || 0,
        nroTutela: textParser(processes[0] || ""),
        tipo: textParser(processes[0] || ""),
        fecha: newDate(processes[25]),
        radicado: textParser(processes[0] || ""),
        demandanteId: textParser(processes[0] || ""),
        demandante: textParser(processes[0] || ""),
        demandado: textParser(processes[0] || ""),
        temaTutela: textParser(processes[0] || ""),
        derechoVulnerado: textParser(processes[0] || ""),
        extranjero: false,
        concepto: textParser(processes[0] || ""),
        termino: textParser(processes[0] || ""),
        remite: textParser(processes[0] || ""),
        abogado: textParser(processes[0] || ""),
        fechaVencimiento: newDate(processes[25]),
        fechaRespuesta: newDate(processes[25]),
        radicadoSalida: textParser(processes[0] || ""),
        validacionRespuesta: textParser(processes[0] || ""),
        oficioAdicional: textParser(processes[0] || ""),
        fallo1raInst: textParser(processes[0] || ""),
        fechaFallo1raInst: newDate(processes[25]),
        observacionFallo1raInst: textParser(processes[0] || ""),
        terminoCumplimiento1raInst: Number(processes[2]) || 0,
        cumplimiento1raInst: textParser(processes[0] || ""),
        fechaCumplimiento1raInst: newDate(processes[25]),
        impugnacionSDP: Number(processes[2]) || 0,
        fechaImpugnacion: newDate(processes[25]),
        fallo2daInst: textParser(processes[0] || ""),
        fechaFallo2daInst: newDate(processes[25]),
        observacionFallo2daInst: textParser(processes[0] || ""),
        terminoCumplimiento2daInst: Number(processes[2]) || 0,
        cumplimiento2daInst: textParser(processes[0] || ""),
        fechaCumplimiento2daInst: newDate(processes[25]),
        incidenteDesacato: textParser(processes[0] || ""),
        observacionesGenerales: textParser(processes[0] || ""),
      };

      newData.push(currentData);
    });

    return {
      head: newData.map(
        (item: TutelaDetails): TutelaHeads => ({
          idSiproj: item.idSiproj,
          nroTutela: item.nroTutela,
          abogado: item.abogado,
          demandanteId: item.demandanteId,
          demandante: item.demandante,
        })
      ),
      details: newData,
    };
  }

  function newDate(fechaExcel: string) {
    // Supongamos que 'fechaExcel' es la fecha leída del archivo Excel en formato '9/2/21'
    let fechaFormateada = "";

    // Verificar si el formato de fecha es mes/día/año o día/mes/año
    if (/^\d{1,2}\/\d{1,2}\/\d{2}$/.test(fechaExcel)) {
      fechaFormateada = moment(fechaExcel, "M/D/YY").format("MM/DD/YYYY");
    } else if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(fechaExcel)) {
      fechaFormateada = moment(fechaExcel, "D/M/YYYY").format("MM/DD/YYYY");
    }

    // Crear el objeto moment
    const fechaMoment = moment(fechaFormateada, "MM/DD/YYYY");

    // Verificar si la fecha es válida
    if (fechaMoment.isValid()) {
      // La fecha es válida, puedes utilizarla
      return fechaMoment.toDate();
    } else {
      // La fecha es inválida, maneja el caso en consecuencia
      return null;
    }
  }

  function textParser(texto: string): string {
    const textoSinEspacios = texto.replace(/^\s+|\s+$/g, "");
    const textoEnMayusculas = textoSinEspacios.toUpperCase();
    return textoEnMayusculas;
  }

  return (
    <div className={styles.background}>
      <form>
        <div className={styles.close}>
          <h4>Importar procesos</h4>
          <div className="btn-close" onClick={handleClose} />
        </div>
        <input
          className="form-control"
          type="file"
          placeholder="Importar movimientos"
          onChange={handleFileChange}
        />
      </form>
    </div>
  );
}
