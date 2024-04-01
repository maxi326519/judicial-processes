import { collection, doc, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { PoderesDetails } from "../../interfaces/Poderes/data";
import { dateToString } from "../../functions/dateToString";
import { setCharts } from "../../redux/actions/Poderes/charts";
import { RootState } from "../../interfaces/RootState";
import { db } from "../../firebase/config";
import {
  AbogadosCharts,
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
    let poderes: PoderesDetails[] = [];

    // Get details
    const snapshot = await getDocs(detailsColl);

    snapshot.forEach((doc) =>
      poderes.push({
        ...(doc.data() as PoderesDetails),
        fechaRadicacion: doc.data().fechaRadicacion
          ? doc.data().fechaRadicacion.toDate()
          : null,
      })
    );

    const poderCharts: PoderesChart = {
      abogados: abogadoChart(poderes),
      concepto: conceptoChart(poderes),
      radicado: radicadoChart(poderes),
    };

    dispatch<any>(setCharts(poderCharts));
  }

  /**
   * Filter data and return amount of 'poderes' by type and 'abogado'
   *
   * @argument { Array<PoderesDetails> } Poderes
   * @returns { Array<AbogadoChart> } Abogado
   */
  function abogadoChart(poderes: PoderesDetails[]): AbogadosCharts[] {
    // Object for save amount of type for 'abogado'
    const abogado: AbogadosCharts[] = [];

    // Filter and count amount type of 'abogado
    poderes.forEach((poder) => {
      // Get 'abogado' data
      const dataAbogado = abogado.find(
        (abogado) => abogado.name === poder.abogado
      );

      // Check if the 'abogado' already exist
      if (dataAbogado) {
        // Search the type
        let type = dataAbogado.types.find(
          (type) => type.label === poder.abogado
        );

        // If exist add one, else create it
        if (type) type.quantity++;
        else {
          dataAbogado.types.push({
            label: poder.abogado,
            quantity: 1,
          });
        }
      } else {
        // If 'abogado' don't existe, create them and add the type
        abogado.push({
          name: poder.abogado,
          types: [
            {
              label: poder.abogado,
              quantity: 1,
            },
          ],
        });
      }
    });

    return abogado;
  }

  /**
   * Filter data and return amount of 'poderes' by theme
   *
   * @argument { Array<PoderesDetails> } Poderes
   * @returns { Array<RadicadoChart> } Concepto
   */
  function conceptoChart(poderes: PoderesDetails[]): ConceptoChart[] {
    // Object to store amount theme
    const conceptos: RadicadoChart[] = [];

    // Filter poderes for theme
    poderes.forEach((poder) => {
      // Find the theme
      const concepto = conceptos.find(
        (concepto) => concepto.type === poder.concepto
      );

      // If existe add one, else create it
      if (concepto) concepto.quantity++;
      else {
        conceptos.push({
          type: poder.concepto,
          quantity: 1,
        });
      }
    });

    return conceptos;
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
