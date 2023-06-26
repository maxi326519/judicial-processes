import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Charts,
  EntityChartData,
  ProcessesChartData,
  StageChartData,
  TypeChartData,
  initEntity,
} from "../../interfaces/Processes/charts";
import { setCharts } from "../../redux/actions/Processes/charts";
import { closeLoading, openLoading } from "../../redux/actions/loading";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { ProcessDetails } from "../../interfaces/Processes/data";

export default function useProcessChart() {
  const dispatch = useDispatch();
  const [entityChart, setEntityChart] = useState<EntityChartData>(initEntity);
  const [processesChart, setProcessesChart] = useState<ProcessesChartData[]>(
    []
  );
  const [stageChart, setStageChart] = useState<StageChartData[]>([]);
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
      stageChart: updateStageChart(details),
      typeChart: updateTypeChart(details),
    };

    setEntityChart(data.entityChart);
    setProcessesChart(data.processesChart);
    setStageChart(data.stageChart);
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

  function updateEntityChart(processes: ProcessDetails[]) {
    let entityData = {
      demandante: 0,
      demandado: 0,
    };

    processes.forEach((process) => {
      if (process.calidadActuacionEntidad === "DEMANDANTE") {
        entityData.demandante++;
      } else if (process.calidadActuacionEntidad === "DEMANDADO") {
        entityData.demandado++;
      }
    });

    return entityData;
  }

  function updateProcessesChart(processes: ProcessDetails[]) {
    let processesData: ProcessesChartData[] = [];

    processes.forEach((process) => {
      // If "apoderado" already exist
      if (
        processesData.some((data) => data.apoderado === process.apoderadoActual)
      ) {
        // Map and update data
        processesData = processesData.map((data) => {
          // If found the process, add one to type
          if (data.apoderado === process.apoderadoActual) {
            let activos = Number(data.activos);
            let terminados = Number(data.terminados);

            if (process.estado === "ACTIVO") activos++;
            if (process.estado === "TERMINADO") terminados++;
            console.log(
              process.apoderadoActual,
              process.estado,
              activos,
              terminados
            );

            return {
              apoderado: data.apoderado,
              activos,
              terminados,
            };
          } else {
            // If not found the process, return same data
            return data;
          }
        });
      } else {
        // If "apoderado" don't exist, create data
        processesData.push({
          apoderado: process.apoderadoActual,
          activos: process.estado === "ACTIVO" ? 1 : 0,
          terminados: process.estado === "TERMINADO" ? 1 : 0,
        });
      }
    });

    return processesData;
  }

  function updateStageChart(processes: ProcessDetails[]) {
    let stageData: StageChartData[] = [];

    processes.forEach((process) => {
      // If "etapa" already exist
      if (stageData.some((stage) => stage.etapa === process.etapaProcesal)) {
        // Map and update data
        stageData = stageData.map((data) => {
          // If found the process, add one to type
          if (data.etapa === process.etapaProcesal) {
            let cantidad = data.cantidad + 1;

            return {
              etapa: data.etapa,
              cantidad,
            };
          } else {
            // If not found the process, return same data
            return data;
          }
        });
      } else {
        // If "etapa" don't exist, create data
        stageData.push({
          etapa: process.etapaProcesal,
          cantidad: 1,
        });
      }
    });

    return stageData;
  }

  function updateTypeChart(processes: ProcessDetails[]) {
    let typeData: TypeChartData[] = [];

    processes.forEach((process) => {
      // If "tipo" already exist
      if (typeData.some((type) => type.tipo === process.tipoProceso)) {
        // Map and update data
        typeData = typeData.map((data) => {
          // If found the process, add one to type
          if (data.tipo === process.tipoProceso) {
            let cantidad = data.cantidad + 1;

            return {
              tipo: data.tipo,
              cantidad,
            };
          } else {
            // If not found the process, return same data
            return data;
          }
        });
      } else {
        // If "etapa" don't exist, create data
        typeData.push({
          tipo: process.tipoProceso,
          cantidad: 1,
        });
      }
    });

    return typeData;
  }

  return {
    processCharts: {
      entity: entityChart,
      processes: processesChart,
      stage: stageChart,
      type: typeChart,
    },
    update: {
      charts: updateCharts,
      entityChart: updateEntityChart,
      processesChart: updateProcessesChart,
      stageChart: updateStageChart,
      typeChart: updateTypeChart,
    },
  };
}
