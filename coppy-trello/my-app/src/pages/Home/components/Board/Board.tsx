import React from "react";
import "./Board.scss"
import { Link } from "react-router-dom";

interface c {
    title: string
    id:number
}
function BoardComponents({ title,id }: c) {
    return (
     
            <Link className="Boards" to={`/board/${id}`}>
                <h1>{title}</h1>
            </Link>
    )
}
export default BoardComponents
