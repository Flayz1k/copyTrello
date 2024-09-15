import { HTMLAttributes, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../api/request";
import Area from "../dragEvent/dragdroparea";
import './Card.scss'
import CreateCards from "../CreateCards/CreateCards";
interface Card {
    index: number
    setDraggedCard: (id: number) => void
    setDropAreaId: (id: number) => void
}
function Cards({ index,setDraggedCard,setDropAreaId }: Card) {
    const [list, setList] = useState<any>()
    const { board_id } = useParams()
    useEffect(() => {
        async function fetchData() {
            const data: any = await api.get("board/" + board_id)
            setList(data.lists)
        }
        fetchData()
    }, [])


    function update(s: any) {
        setList(s)
    }


    const [draggedCardId, setDraggedCardId] = useState<any>(null)

    function dragStart(e: any) {
        // setDraggedCardId(e.target.id)
        setDraggedCard(e.target.id) 
        // console.log("DRAG START",e.target.id)   
    }

    function drop (dropId:number) {
        setDropAreaId(dropId)
    }
    return (
        <>
            <div className="divCards"><Area  area={-1}  drop={drop} /></div>
            {index === index && list && <div className="divCards">{list[index]?.cards?.map((a: any, areaIndex: any) =>
                <div key={areaIndex} >
                    <p draggable onDragOver={(e) => e.preventDefault()}  onDragStart={dragStart}  id={`${areaIndex}`} className="Card"  >{a.title}</p>
                    <Area  area={areaIndex} drop={drop}   />
                </div>)}
            </div>}
            <CreateCards index={index} lists={list} bab={update} />
        </>
    )
}
export default Cards