import { HTMLAttributes, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../api/request";
import Area from "../dragEvent/dragdroparea";
import './Card.scss'
import CreateCards from "../CreateCards/CreateCards";
interface Card {
    index: number
}
function Cards({ index }: Card) {
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

    const [dropElem, setDropElem] = useState<number>()
    const [dragElem, setDragelem] = useState("")



    function dragStart(e: any) {
        setDragelem(e.target.id);
        // console.log("Із", elemId)
    }

    // function dragEnd() {
    //     console.log("із", dragElem, " в " + dropElem)
    // }

    return (
        <>
            <div className="divCards"><Area  area={-1} cardId={dragElem}  /></div>
            {index === index && list && <div className="divCards">{list[index]?.cards?.map((a: any, areaIndex: any) =>
                <div key={areaIndex} >
                    <p draggable onDragStart={dragStart} id={`${areaIndex}`} className="Card"  >{a.title}</p>
                    <Area  area={areaIndex}  cardId={dragElem} />
                </div>)}
            </div>}
            <CreateCards index={index} lists={list} bab={update} />
        </>
    )
}
export default Cards