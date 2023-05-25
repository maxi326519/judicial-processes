import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../interfaces/RootState";

const IFrameRenderer = () => {
  const iFrameCode: Array<string> = useSelector(
    (state: RootState) => state.iframes
  ); // Obtén el código del IFrame desde el estado de Redux

  return (
    <div>
      <span>iFrame[0]</span>
      {iFrameCode.length > 0 ? (
        <div dangerouslySetInnerHTML={{ __html: iFrameCode[0]! }} />
      ) : null}
    </div>
  );
};

export default IFrameRenderer;
