import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCharts } from "../../redux/actions/Processes/charts";
import { closeLoading, openLoading } from "../../redux/actions/loading";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { ProcessDetails } from "../../interfaces/Processes/data";
import {
  Charts,
  EntityChartData,
  ProcessesChartData,
  TypeChartData,
} from "../../interfaces/Processes/charts";

export default function useProcessChart() {
  const dispatch = useDispatch();
  const [entityChart, setEntityChart] = useState<EntityChartData[]>([]);
  const [processesChart, setProcessesChart] = useState<ProcessesChartData[]>(
    []
  );
  const [typeChart, setTypeChart] = useState<TypeChartData[]>([]);

  async function updateCharts() {
    dispatch(openLoading());
    const dataColl = collection(db, "Data");
    const processDoc = doc(dataColl, "Processes");
    const detailsColl = collection(processDoc, "Details");

    const snapshot = await getDocs(detailsColl);
    const details: any = [];

    snapshot.forEach((doc) => {
      details.push(doc.data());
    });

    const data: Charts = {
      entityChart: updateEntityChart(details),
      processesChart: updateProcessesChart(details),
      typeChart: updateTypeChart(details),
    };

    setEntityChart(data.entityChart);
    setProcessesChart(data.processesChart);
    setTypeChart(data.typeChart);

    return dispatch<any>(setCharts(data))
      .then(() => {
        dispatch(closeLoading());
      })
      .catch((error: any) => {
        dispatch(closeLoading());
        throw new Error("");
      });
  }

  function updateEntityChart(processes: ProcessDetails[]): EntityChartData[] {
    let entityData: EntityChartData[] = [];

    processes.forEach((process) => {
      // Get data by 'posicionSDP'
      const posicionSDP = entityData.find(
        (data) => data.posicion === process.posicionSDP
      );

      // Check if this 'posicionSDP' already exist
      if (posicionSDP) {
        // Add ont to 'demandante' or 'demandado'
        if (process.calidadActuacionEntidad === "DEMANDANTE") {
          posicionSDP.demandante++;
        } else if (process.calidadActuacionEntidad === "DEMANDADO") {
          posicionSDP.demandado++;
        }
      } else {
        // If don't exist, create them
        entityData.push({
          posicion: process.posicionSDP,
          demandado: process.calidadActuacionEntidad === "DEMANDADO" ? 1 : 0,
          demandante: process.calidadActuacionEntidad === "DEMANDANTE" ? 1 : 0,
        });
      }
    });

    return entityData;
  }

  function updateProcessesChart(processes: ProcessDetails[]) {
    let processesData: ProcessesChartData[] = [];

    processes.forEach((process) => {
      // Get 'posicionSDP' ref
      const posicionSDP = processesData.find(
        (data) => data.posicion === process.posicionSDP
      );

      // Check if this 'posicionSDP' already exist
      if (posicionSDP) {
        // Get 'apoderado' ref
        const apoderado = posicionSDP.data.find(
          (data) => data.apoderado === process.apoderadoActual
        );

        // Check if 'abogado' already exist
        if (apoderado) {
          // Add one to 'activos' of 'terminados'
          if (process.estado === "ACTIVO") apoderado.activos++;
          if (process.estado === "TERMINADO") apoderado.terminados++;
        } else {
          // Create the data, set 'activos' and 'terminados'
          posicionSDP.data.push({
            apoderado: process.apoderadoActual,
            activos: process.estado === "ACTIVO" ? 1 : 0,
            terminados: process.estado === "TERMINADO" ? 1 : 0,
          });
        }
      } else {
        // Else create the data
        processesData.push({
          posicion: process.posicionSDP,
          data: [],
        });
      }
    });

    return processesData;
  }

  function updateTypeChart(processes: ProcessDetails[]) {
    let typeData: TypeChartData[] = [];

    processes.forEach((process) => {
      // Get 'posicionSDP' ref
      const posicionSDP = typeData.find(
        (data) => data.posicion === process.posicionSDP
      );

      // Check if this 'posicionSDP' already exist
      if (posicionSDP) {
        // Get 'tipo' ref
        const tipo = posicionSDP.data.find(
          (data) => data.tipo === process.tipoProceso
        );

        // Check if 'tipo' already exist
        if (tipo) {
          // Add one to 'cantidad'
          tipo.cantidad++;
        } else {
          // Create the data, and set 'cantidad' in 1
          posicionSDP.data.push({
            tipo: process.apoderadoActual,
            cantidad: 1,
          });
        }
      } else {
        // Else create the data
        typeData.push({
          posicion: process.posicionSDP,
          data: [
            {
              tipo: process.apoderadoActual,
              cantidad: 1,
            },
          ],
        });
      }
    });

    return typeData;
  }

  return {
    processCharts: {
      entity: entityChart,
      processes: processesChart,
      type: typeChart,
    },
    update: {
      charts: updateCharts,
      entityChart: updateEntityChart,
      processesChart: updateProcessesChart,
      typeChart: updateTypeChart,
    },
  };
}
