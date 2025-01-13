import React from "react";
import "./drag.scss";
import { useState } from "react";

function Area({ area, dropArea }: any) {
  const [est, setEst] = useState(false);
  function onDrop(e: any) {
    // console.log(e.target.id);
    setEst(false);
    dropArea(e.target.id);
  }
  return (
    <div
      onDragEnter={() => {
        setEst(true);
      }}
      id={`${area + 1}`}
      onDragLeave={() => setEst(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      className={est ? "drags" : "nones"}
    ></div>
  );
}
export default Area;
