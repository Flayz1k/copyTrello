import React from "react";
import "./List.scss"
import Cards from "../Card/Card";
import { ICard } from "./interfaces/ICard";
interface p {
    title:string
    cards:ICard[]
    
}

function Titles ({title,cards}:p){
    return(
    <>
    <div className="List">
        
        <h1>{title}</h1>
        <p>
            {cards.map((a) =>
            <Cards title={a.title} />
            
        )}
        </p>
        <p className="AddCards"> + додати картку</p>
    </div>
    </>
    )
}
export default Titles
