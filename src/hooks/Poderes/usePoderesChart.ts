import { collection, doc, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { PoderesDetails } from "../../interfaces/Poderes/data";
import { dateToString } from "../../functions/dateToString";
import { setCharts } from "../../redux/actions/Poderes/charts";
import { RootState } from "../../interfaces/RootState";
import { db } from "../../firebase/config";
import {
  ConceptoChart,
  PoderesChart,
  RadicadoChart,
} from "../../interfaces/Poderes/chart";

export default function useCharts() {
  const dispatch = useDispatch();
  const charts = useSelector((state: RootState) => state.poderes.charts);

  async function update() {
    // Fireastore Ref's
    const poderesDoc = doc(collection(db, "Data"), "Poderes");
    const detailsColl = collection(poderesDoc, "Details");

    // Array for dato to filter
    const poderes: PoderesDetails[] = [];

    // Get details
    const snapshot = await getDocs(detailsColl);

    snapshot.forEach((doc) => poderes.push(doc.data() as PoderesDetails));

    const poderCharts: PoderesChart = {
      concepto: [],
      radicado: [],
    };

    dispatch<any>(setCharts(poderCharts));
  }

  /**
   * Filter data and return amount of 'poderes' by type and 'concepto'
   *
   * @argument { Array<PoderesDetails> } Poderes
   * @returns { Array<ConceptoChart> } Conceptos
   */
  function conceptoChart(poderes: PoderesDetails[]): ConceptoChart[] {
    // Object for save amount of type for 'concepto'
    const concepto: ConceptoChart[] = [];

    // Filter and count amount type of 'concepto
    poderes.forEach((poder) => {
      // Get 'concepto' data
      const dataAbogado = concepto.find(
        (concepto) => concepto.name === poder.concepto
      );

      // Check if the 'concepto' already exist
      if (dataAbogado) {
        // Search the type
        let type = dataAbogado.types.find(
          (type) => type.label === poder.concepto
        );

        // If exist add one, else create it
        if (type) type.quantity++;
        else {
          dataAbogado.types.push({
            label: poder.concepto,
            quantity: 1,
          });
        }
      } else {
        // If 'concepto' don't existe, create them and add the type
        concepto.push({
          name: poder.concepto,
          types: [
            {
              label: poder.concepto,
              quantity: 1,
            },
          ],
        });
      }
    });

    return concepto;
  }

  /**
   * Filter data and return amount of 'poderes' by theme
   *
   * @argument { Array<PoderesDetails> } Poderes
   * @returns { Array<RadicadoChart> } Radicados
   */
  function radicadoChart(poderes: PoderesDetails[]): RadicadoChart[] {
    // Object to store amount theme
    const radicado: RadicadoChart[] = [];

    // Filter poderes for theme
    poderes.forEach((poder) => {
      // Find the theme
      const theme = radicado.find(
        (theme) =>
          theme.type ===
          (poder.fechaRadicacion && dateToString(poder.fechaRadicacion))
      );

      // If existe add one, else create it
      if (theme) theme.quantity++;
      else {
        radicado.push({
          type: dateToString(poder.fechaRadicacion!),
          quantity: 1,
        });
      }
    });

    return radicado;
  }

  return { charts, updateCharts: update };
}
