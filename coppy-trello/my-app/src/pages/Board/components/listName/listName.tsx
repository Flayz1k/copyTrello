import React, { useState, useEffect } from "react";
import "./listName.scss"
import { board, listss } from "../../interfaces"
import api from "../../../../api/request";
import { useParams } from "react-router-dom";
import CreateCards from "../CreateCards/CreateCards";
import { ToastContainer, toast } from "react-toastify";
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
        try {
            await api.put("board/" + board_id + "/list/" + list?.[index].id, {
                title: inp
            })
            get()
        } catch (e: any) {
            toast.error(`Error ${e.message}`)
        }
    }
    async function get() {
        try {
            const t: board = await api.get("board/" + board_id)
            bob(t.lists)
        } catch (e: any) {
            toast.error(`Error ${e.message}`)
        }
    }

    
    function s1(a: any) {
        setList(a)
    }
    const [draggedCard,setDraggedCard] = useState<number>()
    const [listId,setListid] = useState<number>()
    const [dropArea,setDropArea] = useState<number>()

    function onDropEnd (){
        console.log(`із ${draggedCard} рядка  в ${listId} список  в ${dropArea} рядок `)
    }


    function setDraggedCardId (id:number){
        console.log("CARD ID", id)
        setDraggedCard(id)
        
    }
    function setDropAreaId (areaId:number){
        // console.log(areaId)
        setDropArea(areaId)
        onDropEnd()   
    }
    function onDrop (e:any)  {
        // console.log("DROP LIST" ,e.currentTarget.id);
        setListid(e.currentTarget.id)
    }
    if (est) {
        return ( <div className="List"

            onDragOver={(e) => {
                e.preventDefault()
            }}
            onDrop={(e) => {
                console.log('e onDrop');
                console.log(e);
            }}

        ><input autoFocus onChange={(e) => setInp(e.target.value)} onBlur={() => { setEst(false); put() }} onKeyDown={(e) => { if (e.key === "Enter") { setEst(false); put() } }} defaultValue={title} />
            <div>
                <Cards index={index}  setDraggedCard={setDraggedCardId} setDropAreaId={setDropAreaId} />
            </div>
        </div>
        )
    } else {
        return (<div>
            <div className="List"
            
            onDragOver={(e) => {
                e.preventDefault()
            }}
            onDrop={onDrop}
            id={`${index}`}
            >
                <div><h1 onClick={() => { if (est == false) { setEst(true) } }}>{title}</h1></div>
                <div>
                    <Cards index={index}  setDraggedCard={setDraggedCardId} setDropAreaId={setDropAreaId} />
                </div>
            </div>
            </div>
        )
    }
}
export default Titles