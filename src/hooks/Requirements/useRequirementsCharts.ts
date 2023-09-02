import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
import { RequirementsDetail } from "../../interfaces/Requirements/data";
import {
  AbogadoChart,
  RemitenteGeneralChart,
  RequirementsCharts,
  TipoChart,
} from "../../interfaces/Requirements/charts";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { setCharts } from "../../redux/actions/Requirements/charts";
export default function useCharts() {
  const dispatch = useDispatch();
  const charts = useSelector((state: RootState) => state.requirements.charts);

  async function updateCharts() {
    // Fireastore Ref's
    const reqDoc = doc(collection(db, "Data"), "Requirements");
    const detailsColl = collection(reqDoc, "Details");

    // Array for dato to filter
    const requirements: RequirementsDetail[] = [];

    // Get details
    const snapshot = await getDocs(detailsColl);

    snapshot.forEach((doc) =>
      requirements.push(doc.data() as RequirementsDetail)
    );
    const requirementsCharts: RequirementsCharts = {
      tipo: updateTipoChart(requirements),
      remitente: updateRemitenteChart(requirements),
      abogado: updateAbogadoChart(requirements),
    };

    dispatch<any>(setCharts(requirementsCharts));
  }

  /**
   * Filter data and return amount of 'tutelas' by type and 'abogado'
   *
   * @argument { Array<RequirementsDetail> } requirements - List of requirements details
   * @returns { Array<AbogadoChart> } 'abogados' chart data
   */
  function updateAbogadoChart(
    requirements: RequirementsDetail[]
  ): AbogadoChart[] {
    // Object for save amount of type for 'abogado'
    const abogadoChart: AbogadoChart[] = [];

    requirements.forEach((requirement) => {
      const currentAbogado = abogadoChart.find(
        (data) => data.abogado === requirement.abogado
      );

      // Check if 'abogado' already exist
      if (currentAbogado) {
        // Add one to 'activos' of 'terminados'
        if (requirement.estado === "ACTIVO") currentAbogado.activos++;
        if (requirement.estado === "TERMINADO") currentAbogado.terminados++;
      } else {
        // Create the data, set 'activos' and 'terminados'
        const newData: AbogadoChart = {
          abogado: requirement.abogado,
          activos: requirement.estado === "ACTIVO" ? 1 : 0,
          terminados: requirement.estado === "TERMINADO" ? 1 : 0,
        };

        abogadoChart.push(newData);
      }
    });

    return abogadoChart;
  }

  function updateRemitenteChart(
    requirements: RequirementsDetail[]
  ): RemitenteGeneralChart[] {
    const remitenteChart: RemitenteGeneralChart[] = [];

    requirements.forEach((requirement) => {
      // Find the theme
      const remitente = remitenteChart.find(
        (remitente) => remitente.remitente === requirement.remitenteGeneral
      );

      // If existe add one, else create it
      if (remitente) remitente.cantidad++;
      else {
        remitenteChart.push({
          remitente: requirement.remitenteGeneral,
          cantidad: 1,
        });
      }
    });

    return remitenteChart;
  }

  function updateTipoChart(requirements: RequirementsDetail[]): TipoChart[] {
    const tipoChart: TipoChart[] = [];

    requirements.forEach((requirement) => {
      // Find the theme
      const tipo = tipoChart.find(
        (tipo) => tipo.tipo === requirement.tipoProceso
      );

      // If existe add one, else create it
      if (tipo) tipo.cantidad++;
      else {
        tipoChart.push({
          tipo: requirement.tipoProceso,
          cantidad: 1,
        });
      }
    });

    return tipoChart;
  }

  return { charts, updateCharts };
}
