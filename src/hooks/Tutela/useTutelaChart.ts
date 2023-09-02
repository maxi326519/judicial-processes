import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/RootState";
import { TutelaDetails } from "../../interfaces/Tutelas/data";
import { collection, doc, getDocs } from "firebase/firestore";
import { setCharts } from "../../redux/actions/Tutelas/charts";
import { db } from "../../firebase/config";
import {
  AbogadosCharts,
  Fallo1RaInstChart,
  Fallo2DaInstChart,
  TemaTutelaChart,
  TutelaCharts,
} from "../../interfaces/Tutelas/charts";
export default function useCharts() {
  const dispatch = useDispatch();
  const charts = useSelector((state: RootState) => state.tutelas.charts);

  async function update() {
    // Fireastore Ref's
    const tutelasDoc = doc(collection(db, "Data"), "Tutelas");
    const detailsColl = collection(tutelasDoc, "Details");

    // Array for dato to filter
    const tutelas: TutelaDetails[] = [];

    // Get details
    const snapshot = await getDocs(detailsColl);

    snapshot.forEach((doc) => tutelas.push(doc.data() as TutelaDetails));

    const tutelaCharts: TutelaCharts = {
      abogadosChart: tutelasChart(tutelas),
      temaTutelaChart: themeChart(tutelas),
      fallo1RaInstChart: fallo1Chart(tutelas),
      fallo2DaInstChart: fallo2Chart(tutelas),
    };

    dispatch<any>(setCharts(tutelaCharts));
  }

  /**
   * Filter data and return amount of 'tutelas' by type and 'abogado'
   *
   * @argument { Array<TutelaCharts> } tutelas
   * @returns { Array<AbogadosCharts> } abogados
   */
  function tutelasChart(tutelas: TutelaDetails[]): AbogadosCharts[] {
    // Object for save amount of type for 'abogado'
    const abogado: AbogadosCharts[] = [];

    // Filter and count amount type of 'abogado
    tutelas.forEach((tutela) => {
      // Get 'abogado' data
      const dataAbogado = abogado.find(
        (abogado) => abogado.name === tutela.abogado
      );

      // Check if the 'abogado' already exist
      if (dataAbogado) {
        // Search the type
        let type = dataAbogado.types.find((type) => type.label === tutela.tipo);

        // If exist add one, else create it
        if (type) type.quantity++;
        else {
          dataAbogado.types.push({
            label: tutela.tipo,
            quantity: 1,
          });
        }
      } else {
        // If 'abogado' don't existe, create them and add the type
        abogado.push({
          name: tutela.abogado,
          types: [
            {
              label: tutela.tipo,
              quantity: 1,
            },
          ],
        });
      }
    });

    return abogado;
  }

  /**
   * Filter data and return amount of 'tutelas' by theme
   *
   * @argument { Array<TutelaDetails> } tutelas
   * @returns { Array<TemaTutelaChart> } themes
   */
  function themeChart(tutelas: TutelaDetails[]): TemaTutelaChart[] {
    // Object to store amount theme
    const themes: TemaTutelaChart[] = [];

    // Filter tutelas for theme
    tutelas.forEach((tutela) => {
      // Find the theme
      const theme = themes.find((theme) => theme.type === tutela.temaTutela);

      // If existe add one, else create it
      if (theme) theme.quantity++;
      else {
        themes.push({
          type: tutela.temaTutela,
          quantity: 1,
        });
      }
    });

    return themes;
  }

  /**
   * Filter data and return amount of 'tutelas' by 'fallo1'
   *
   * @argument { Array<TutelaCharts> } tutelas
   * @returns { Array<Fallo1RaInstChart> }  fallos
   */
  function fallo1Chart(tutelas: TutelaDetails[]): Fallo1RaInstChart[] {
    // Object to store amount 'falllo1'
    const fallos: Fallo1RaInstChart[] = [];

    // Filter tutelas for 'fallo1'
    tutelas.forEach((tutela) => {
      // Find the 'fallo1'
      const fallo = fallos.find((fallo) => fallo.type === tutela.fallo1raInst);

      // If existe add one, else create it
      if (fallo) fallo.quantity++;
      else {
        fallos.push({
          type: tutela.fallo1raInst,
          quantity: 1,
        });
      }
    });

    return fallos;
  }

  /**
   * Filter data and return amount of 'tutelas' by fallo2
   *
   * @argument { Array<TutelaCharts> } tutelas
   * @returns { Array<Fallo2DaInstChart> } fallos
   */
  function fallo2Chart(tutelas: TutelaDetails[]): Fallo2DaInstChart[] {
    // Object to store amount 'falllo1'
    const fallos: Fallo2DaInstChart[] = [];

    // Filter tutelas for 'fallo1'
    tutelas.forEach((tutela) => {
      // Find the fallo
      const fallo = fallos.find((fallo) => fallo.type === tutela.fallo2daInst);

      // If existe add one, else create it
      if (fallo) fallo.quantity++;
      else {
        fallos.push({
          type: tutela.fallo2daInst,
          quantity: 1,
        });
      }
    });

    return fallos;
  }

  return { charts, updateCharts: update };
}
