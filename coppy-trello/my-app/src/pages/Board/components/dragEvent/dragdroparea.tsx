import React from "react";
import "./dragdroparea.scss"
import { useState } from "react";
type area = {
    area: number
    drop:any
}
function Area({area,drop}: area) {
    const [est, setEst] = useState(false)
    const [dropId,setDropId] = useState<number | null>(null)
    return (
        <div id={`${area + 1}`}
            onDragEnter={() => { setEst(true) }}
            onDragLeave={() => setEst(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) =>{drop(e.currentTarget.id);setEst(false);}}
            className={est ? "area" : "none"}>
        </div>
    )
}
export default Area