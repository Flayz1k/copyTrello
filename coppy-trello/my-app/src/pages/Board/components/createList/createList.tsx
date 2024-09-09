import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './createList.scss'
import api from "../../../../api/request"
import Cards from "../CreateCards/CreateCards";
import { ToastContainer,toast } from "react-toastify";
interface board {
    title: string
    id: number
    custom: {
        description: string
    }
    lists: {
        title: string
        position: number
        id: number
    }[]
}
interface lists {
    title: string
    position: number
    id: number
}
function CreateList({ beb }: any) {
    const { board_id } = useParams()
    const [modal, setModal] = useState(false)
    const [inp, setInp] = useState("")
    function press(e: any) {
        if (e.key == "Enter") {
            setModal(false)
        }
    }

    const [data, setData] = useState<lists[]>()
    const [len, setLen] = useState<number>()
    useEffect(() => {
        async function get() {
            try{
            const data: board = await api.get("board/" + board_id)
            setData(data.lists)
            if (data?.lists.length == 0) {
                setLen(1);
            } else {
                setLen((data?.lists.length || 0) + 1);
            }
        }catch(e:any){
            toast.error(`Error`)
        }
        }
        get()
        async function dalete() {
            const data = api.delete("board/" + board_id , {
                // title: "3   bob",                   +"/list/" + "1725114333633" 
                // list_id:  1725103475595,
                // position: 5,
                // description: "washing process",
                // custom: {
                //     deadline: "2022-08-31 12:00"
                // }
            })
        }
        // dalete()

    }, []);

    async function post() {
        if (inp.length !== 0 ){
            try{
        const data = await api.post("board/" + board_id + "/list", {
            title: inp,
            position: len
        })
    }catch(e:any){
        toast.error(`Error ${e.message}`)
    }
    }
        get()
    }
    async function get() {
        const data: any = await api.get("board/" + board_id)
        beb(data.lists)
    }

    if (modal) {
        return <><div className="createList" ><input autoFocus onChange={(e) => setInp(e.target.value)} onBlur={() => { setModal(false); post() }} onKeyDown={(e)=>{if (e.key == "Enter"){setModal(false);post()}}} /> </div> <ToastContainer/> </>
    } else {
        return <><div className="createList" onClick={() => setModal(true)}>Створити іще одну колонку</div><ToastContainer/> </>
        
    }
}
export default CreateList