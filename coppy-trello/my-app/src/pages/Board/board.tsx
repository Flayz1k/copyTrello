import React, { useState, useEffect } from "react"
import "./board.scss"
// import Titles from "./components/List/List"
import api from "../../api/request"
import { useParams } from "react-router-dom"
import Titles from "./components/listName/listName"
import {board,listsarr} from "./interfaces"
import CreateList from "./components/createList/createList"
import Cards from "./components/CreateCards/CreateCards"
import { ToastContainer,toast } from "react-toastify"
export const Board = () =>
    <>
        <BoardTitle />
        <div className="board">
            <ListName />
        </div>
    </>
const BoardTitle = () => {
    let { board_id } = useParams();
    const [items, setItems] = useState<board>()

    useEffect(() => {
        const fetchData = async () => {
            try{
            const data: board = await api.get('board/' + board_id, {});
            setItems(data)
        }catch(e:any){
            toast.error(`Error ${e.message}`)
        }
        }
        fetchData()
    }, []);
     async function put() {
        try{
        const data = await api.put("board/" + board_id, {
            title: items?.title,
            custom: {
                description: items?.custom.description,
            }
        })

    }catch(e:any){
        toast.error(`Error ${e.message}`)
    }

    }
    const [est, setEsat] = useState(false)

    if (est) {
        return <div className="boardTitle" ><input autoFocus onChange={(e) => {if (items){setItems({...items,title:e.target.value})}}} onBlur={()=>setEsat(false)} onKeyDown={(e)=>{if (e.key =="Enter"){setEsat(false); put()}}} defaultValue={items?.title} /></div>
    } else {    
        return <div className="boardTitle" > <div onClick={()=>setEsat(true)}>{items?.title}</div></div>
    }
}

function ListName() {
    const { board_id } = useParams()
    const [list, setList] = useState<listsarr>();
    useEffect(() => {
        const fetchData = async () => {
            try{
            const data: board = await api.get('board/' + board_id, {});
            setList(data.lists)
            }catch(e:any){
                toast.error(`Error ${e.message}`)
            }
        }
        console.log(list)
        fetchData()
    }, []);
    console.log(list)

    function s (a:any){
        setList(a)
    }

    function s1(a:any){
        setList(a)
    }


    const a = list?.map((b,index) =>
        <Titles  bob={s}  key={index} title={b.title} index={index}/>
    )
    return (
        <>
            {a}
            <CreateList beb={s1}/>
        </>
    )
}

