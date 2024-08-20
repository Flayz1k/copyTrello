import React from "react";
import "./Board.scss"
import { useState } from "react";
import { Link } from "react-router-dom";
import { Board } from "../../../Board/board";

interface c {
    title: string
    background: object
    id:number
}
function BoardComponents({ title, background,id }: c) {
    return (
     
            <Link className="Boards" style={background} to={`/board/${id}`}>
                <h1>{title}</h1>
            </Link>
    )
}
export default BoardComponents