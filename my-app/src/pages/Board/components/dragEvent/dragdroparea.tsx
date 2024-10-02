import React from "react";
import "./dragdroparea.scss";
import { useState } from "react";
type area = {
  area: number;
  areaId: any;
};
function Area({ area, areaId }: area) {
  const [est, setEst] = useState(false);
  function onDrop(e: any) {
    areaId(e.target.id);
    setEst(false);
  }
  return (
    <div
      id={`${area + 1}`}
      onDragEnter={() => {
        setEst(true);
      }}
      onDragLeave={() => setEst(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className={est ? "area" : "none"}
    ></div>
  );
}
export default Area;
