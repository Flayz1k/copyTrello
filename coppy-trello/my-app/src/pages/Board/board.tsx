import React, { useState } from "react"
import "./board.scss"
import Titles from "./components/List/List"
import { title } from "process"
import { useParams } from "react-router-dom"

export const Board = () =>
    <>
        <BoardTitle />
        <div className="board">

            <BoardLists />

        </div>
    </>

const BoardTitle = () => {
    let { board_id } = useParams();
    const [titles, setTitles] = useState({title:"Моя тестова дошка"})
    return (
        <>
        <div className="boardTitle">{titles.title}</div>
        <div>{board_id}</div>
        </>
    )
}

const BoardLists = () => {
    const [lists, setLists] = useState([
        {
            id: 1,
            title: "Плани",
            cards: [
                { id: 1, title: "помити кота" },
                { id: 2, title: "прготувати суп" },
                { id: 3, title: "сходити в магазин" }
            ]
        },
        {
            id: 2,
            title: "В процесі",
            cards: [
                { id: 4, title: "подивитися серіал" }
            ]
        },
        {
            id: 3,
            title: "Зроблено",
            cards: [
                { id: 5, title: "зробити домашку" },
                { id: 6, title: "погуляти з собакой" }
            ]
        }
    ])
    const a = lists.map(b =>
        <Titles title={b.title} cards={b.cards} />
    )
    return (
        <>
            {a}
        </>
    )
}
