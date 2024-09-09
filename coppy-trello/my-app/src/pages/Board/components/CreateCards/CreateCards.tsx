import "./Cards.scss"
import { useEffect, useState } from "react"
import api from "../../../../api/request"
import { useParams } from "react-router-dom"
import { ToastContainer,toast } from "react-toastify"
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

function CreateCards({ index, lists,bab }: any) {
    const { board_id } = useParams()
    // const [cards, setCards] = useState<any>()
    const [est, setEst] = useState(false)
    const [inp, setInp] = useState("")
    // const [indexx,setIndexx] = useState<any>()
    async function post() {

        if (inp.length === 0) {
            console.log(index)
            console.log(inp)
            console.log(lists[index].id)
            console.log(lists[index].cards.length + 1)
         
        }else{
            try{
                await api.post("board/" + board_id + "/card", {
                    title: inp,
                    list_id: lists[index].id,
                    position: lists[index].cards.length + 1,
                    description: "washing process",
                    custom: {
                        deadline: "2022-08-31 12:00"
    
                    }
                })
            }catch(e:any){
                toast.error(`Error ${e.message}`)
            }
        }
        get()
        setInp("")
    }
    async function get () {
        const data:any = await api.get("board/" + board_id)
        bab(data.lists)
    }
    

    if (est) {
        return <div><><div><input  autoFocus onChange={(e) => setInp(e.target.value)} onBlur={() => { setEst(false); post() }} onKeyDown={(e) => { if (e.key === "Enter") { setEst(false); post() } }} /> </div> </><ToastContainer/></div>
    } else {
        return <><div className="AddCards" onClick={() => { setEst(true); }}>Додати картку</div></>
    }
    // return 
}
export default CreateCards