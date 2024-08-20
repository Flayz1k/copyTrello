import { useState, useEffect } from "react";
import "./Home.scss"
import React from "react";
import BoardComponents from "./components/Board/Board";
import api from "@/api/request";


function Home() {
    const [boards, setboards] = useState([
        { id: 1, title: "покупки", custom: { background: "red" } },
        { id: 2, title: "підготовка до весілля", custom: { background: "green" } },
        { id: 3, title: "розробка інтернет-магазину", custom: { background: "blue" } },
        { id: 4, title: "курс по просуванню у соцмережах", custom: { background: "grey" } },



    ])
    let p = []
    for (let i = 0; i < boards.length; i++) {
        console.log(boards[i].custom)
        p.push(<BoardComponents title={boards[i].title} background={boards[i].custom} id={boards[i].id} />)

    }
    return <div className="Box">{p}</div>

}




function Component() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const { data } = await api.get('items');
        setItems(data);

    }, []);

    return <div>...</div>;
}

export default Home
