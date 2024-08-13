import React, { useState } from "react"
import Titles from "./components/List/List"
export const Board = () =>
    <div>
        <Titles/>
        <BoardTitle/> 
    </div>





const BoardTitle = () => {
    const [titles, setTitles] = useState("Моя тестова дошка")
    return (
        <div>{titles}</div>
    )
}





const BoardLists = () => {
    const [lists, setLists] = useState([
        {
            id: 1,
            title: "Плани",
            cards: [
                { id: 1, title: "помити кота" },
                { id: 2, title: "приготувати суп" },
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
}

function boards() {

}