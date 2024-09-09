import React, { useState, useEffect } from "react";
import "./listName.scss"
import { board, listss } from "../../interfaces"
import api from "../../../../api/request";
import { useParams } from "react-router-dom";
import CreateCards from "../CreateCards/CreateCards";
import { ToastContainer,toast } from "react-toastify";
import Cards from "../Cards/Cards";
interface Titles {
    title: string
    index: number
    bob: any
}

function Titles({ title, index, bob }: Titles) {
    const [list, setList] = useState<any>();
    const [est, setEst] = useState(false)
    const [inp, setInp] = useState("")
    // const [listname,setListname] = useState("")
    const { board_id } = useParams()

    useEffect(() => {
        const fetchData = async () => {

            const data: any = await api.get('board/' + board_id);
            setList(data.lists)
           
        }
        fetchData()
    }, [board_id]);
    async function put() {
        try{
        await api.put("board/" + board_id + "/list/" + list?.[index].id, {
            title: inp
        })
        get()
    }catch(e:any){
        toast.error(`Error ${e.message}`)
    }
    }
    async function get() {
        try{
        const t: board = await api.get("board/" + board_id)
        bob(t.lists)
        }catch(e:any){
            toast.error(`Error ${e.message}`)
        }
    }
    function s1 (a:any){
        setList(a)
    }

    // const card = index === index && list && <div> {list[index]?.cards?.map((a: any, ind: any) => <div key={ind}><p draggable onDragStart={() => console.log(ind)} className="Card" >{a.title}</p></div>)}</div>
    if (est) {
        return <div className="List"><input  autoFocus onChange={(e) => setInp(e.target.value)} onBlur={() => { setEst(false); put() }} onKeyDown={(e) => { if (e.key === "Enter") { setEst(false); put() } }} defaultValue={title} />
            <div>
            <Cards index={index}/>
            </div>
        </div>
    } else {
        return <>
            <div   className="List"><div><h1 onClick={() => { if (est == false) { setEst(true) } }}>{title}</h1></div>
                <div>
                    <Cards index={index}/>
                </div>
            </div>
        </>
    }
}
export default Titles