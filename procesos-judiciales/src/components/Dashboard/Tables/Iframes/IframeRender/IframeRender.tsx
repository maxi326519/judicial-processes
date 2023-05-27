import { IFrames } from "../../../../../interfaces/iframes";

import styles from "./IframeRender.module.css";

interface Props {
  iframe: IFrames;
  handleClose: () => void;
}

const IFrameRenderer = ({ iframe, handleClose }: Props) => {
  return (
    <div className={styles.background}>
      <header>
        <h3>{iframe.name}</h3>
        <div className="btn btn-close" />
      </header>
      <div
        className={styles.container}
        dangerouslySetInnerHTML={{ __html: iframe.data }}
      />
    </div>
  );
};

export default IFrameRenderer;
