import React from "react";
import "./dragdroparea.scss"
import { useState } from "react";
type area = {
    // listIndex: number
    area: number
    // cardind: number
    // AA:any
    cardId:any
}
function Area({area,cardId}: area) {
    const [est, setEst] = useState(false)

    function onDrop (e:any){
        e.preventDefault();
        console.log(cardId,e.target.id)
        
        setEst(false)

    }
    return (
        <div id={`${area + 1}`}
            onDragEnter={() => { setEst(true) }}
            onDragLeave={() => setEst(false)}
            // onDrop={(e) => { const val = (e.target as HTMLElement).id; console.log("в ",(e.target as HTMLElement).id); AA(val);setEst(false);}}
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            className={est ? "area" : "none"}>
        </div>
    )
}
export default Area