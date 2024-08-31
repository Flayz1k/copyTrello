import "./Cards.scss"
import { useEffect,useState } from "react"
import api from "../../../../api/request"
import { useParams } from "react-router-dom"
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
const {board_id} = useParams()
const [cards,setCards]=useState<any>()
function Cards () {
    useEffect(() => {
        async function get() {
            const t: board = await api.get("board/" + board_id)
            // bob(t.lists)
            setCards(t.lists)
                  
        }
        get()
        card()
    }, [])
    function card() {
        console.log("ad")
    }
    return <p className="Card">dad</p>
}
export default Cards