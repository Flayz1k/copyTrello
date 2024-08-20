import React from "react";
import "./Card.scss"
interface p {
    title: string
}
function Cards({ title }: p) {
    return (
        <>
            <p className="Card">{title}</p>
            
        </>
    )
}
export default Cards