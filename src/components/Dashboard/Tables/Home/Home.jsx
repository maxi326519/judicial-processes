import EntityChart from "./EntityChart/EntityChart";
import styles from "./Home.module.css";
import ProcessesChart from "./ProcessesChart/ProcessesChart";
import StageChart from "./StageChart/StageChart";
import TypeChart from "./TypeChart/TypeChart";

export default function Home() {
  return (
    <div className={styles.charts}>
      <ProcessesChart />
      <EntityChart />
      <StageChart />
      <TypeChart />
    </div>
  );
}
