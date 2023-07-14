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
    let initEntityData: EntityChartData = {
      posicion: "",
      demandado: 0,
      demandante: 0,
    };

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
          initEntityData.demandante++;
        } else if (process.calidadActuacionEntidad === "DEMANDADO") {
          posicionSDP.demandado++;
          initEntityData.demandado++;
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

    entityData.push(initEntityData);

    return entityData;
  }

  function updateProcessesChart(processes: ProcessDetails[]) {
    let processesData: ProcessesChartData[] = [];
    let initProcessesData: ProcessesChartData = {
      posicion: "",
      data: [],
    };

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
        const initApoderado = initProcessesData.data.find(
          (data) => data.apoderado === process.apoderadoActual
        );

        // Check if 'abogado' already exist
        if (apoderado && initApoderado) {
          // Add one to 'activos' of 'terminados'
          if (process.estado === "ACTIVO") {
            apoderado.activos++;
            initApoderado.activos++;
          }
          if (process.estado === "TERMINADO") {
            apoderado.terminados++;
            initApoderado.terminados++;
          }
        } else {
          // Create the data, set 'activos' and 'terminados'
          const newData = {
            apoderado: process.apoderadoActual,
            activos: process.estado === "ACTIVO" ? 1 : 0,
            terminados: process.estado === "TERMINADO" ? 1 : 0,
          };

          posicionSDP.data.push(newData);
          initProcessesData.data.push(newData);
        }
      } else {
        // Else create the data
        processesData.push({
          posicion: process.posicionSDP,
          data: [],
        });
      }
    });

    processesData.push(initProcessesData);

    return processesData;
  }

  function updateTypeChart(processes: ProcessDetails[]) {
    let typeData: TypeChartData[] = [];
    let initTypeData: TypeChartData = {
      posicion: "",
      data: [],
    };

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
        const initTipo = initTypeData.data.find(
          (data) => data.tipo === process.tipoProceso
        );

        // Check if 'tipo' already exist
        if (tipo && initTipo) {
          // Add one to 'cantidad'
          tipo.cantidad++;
          initTipo!.cantidad++;
        } else {
          // Create the data, and set 'cantidad' in 1
          const newData = {
            tipo: process.apoderadoActual,
            cantidad: 1,
          };
          posicionSDP.data.push(newData);
          initTypeData.data.push(newData);
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

    typeData.push(initTypeData);

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
