import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
import {
  Charts,
  EntityChartData,
  ProcessesChartData,
  StageChartData,
  TypeChartData,
  initEntity,
} from "../../interfaces/charts";
import { getCharts, setCharts } from "../../redux/actions/charts";
import { getProcessesData } from "../../redux/actions/judicialProcesses";

export default function useChart() {
  const dispatch = useDispatch();
  const processes = useSelector((state: RootState) => state.processes.data);
  const [entityChart, setEntityChart] = useState<EntityChartData>(initEntity);
  const [processesChart, setProcessesChart] = useState<ProcessesChartData[]>(
    []
  );
  const [stageChart, setStageChart] = useState<StageChartData[]>([]);
  const [typeChart, setTypeChart] = useState<TypeChartData[]>([]);

  function updateCharts() {
    return dispatch<any>(getProcessesData())
      .then(() => {
        setTimeout(() => {
          const data: Charts = {
            entityChart: updateEntityChart(),
            processesChart: updateProcessesChart(),
            stageChart: updateStageChart(),
            typeChart: updateTypeChart(),
          };

          setEntityChart(data.entityChart);
          setProcessesChart(data.processesChart);
          setStageChart(data.stageChart);
          setTypeChart(data.typeChart);

          return dispatch<any>(setCharts(data)).catch((error: any) => {
            throw new Error("");
          });
        }, 100);
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  }

  function updateEntityChart() {
    let entityData = {
      demandante: 0,
      demandado: 0,
    };

    processes.map((process) => {
      if (process.calidadActuacionEntidad === "DEMANDANTE") {
        entityData.demandante++;
      } else if (process.calidadActuacionEntidad === "DEMANDADO") {
        entityData.demandado++;
      }
    });

    return entityData;
  }

  function updateProcessesChart() {
    let processesData: ProcessesChartData[] = [];

    processes.forEach((process) => {
      // If "apoderado" already exist
      if (
        processesData.some((data) => data.apoderado === process.apoderadoActual)
      ) {
        // Map and update data
        processesData.map((data) => {
          // If found the process, add one to type
          if (data.apoderado === process.apoderadoActual) {
            let activos =
              data.activos + (process.tipoProceso === "ACTIVO" ? 1 : 0);
            let terminados =
              data.terminados + (process.tipoProceso === "TERMINADO" ? 1 : 0);

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
          activos: process.tipoProceso === "ACTIVO" ? 1 : 0,
          terminados: process.tipoProceso === "TERMINADO" ? 1 : 0,
        });
      }
    });

    return processesData;
  }

  function updateStageChart() {
    let stageData: StageChartData[] = [];

    processes.forEach((process) => {
      // If "etapa" already exist
      if (stageData.some((stage) => stage.etapa === process.etapaProcesal)) {
        // Map and update data
        stageData.map((data) => {
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

  function updateTypeChart() {
    let typeData: TypeChartData[] = [];

    processes.forEach((process) => {
      // If "tipo" already exist
      if (typeData.some((type) => type.tipo === process.tipoProceso)) {
        // Map and update data
        typeData.map((data) => {
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
    chart: {
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
