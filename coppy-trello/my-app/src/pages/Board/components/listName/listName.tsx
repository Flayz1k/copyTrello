import React, { useState, useEffect } from "react";
import "./listName.scss"
import { board, listss } from "../../interfaces"
import api from "../../../../api/request";
import { useParams } from "react-router-dom";
interface Titles {
    title: string
    index: number
    bob: any
}

function Titles({ title, index, bob }: Titles) {
    const [list, setList] = useState<any>();
    const { board_id } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            const data: any = await api.get('board/' + board_id);
            setList(data.lists)
        }
        fetchData()



    }, [board_id]);
    const [est, setEst] = useState(false)
    const [inp, setInp] = useState("")

    async function put() {
        await api.put("board/" + board_id + "/list/" + list?.[index].id, {
            title: inp
        })
        get()
    }
    async function get() {
        const t: board = await api.get("board/" + board_id)
        bob(t.lists)
    }
    if (est) {
        return <div className="List"><input autoFocus onChange={(e) => setInp(e.target.value)} onBlur={() => { setEst(false); put() }} onKeyDown={(e) => { if (e.key === "Enter") { setEst(false); put() } }} defaultValue={title} /><p className="Card">adas</p></div>
    } else {
        return <>
            <div className="List"><div onClick={() => { if (est == false) { setEst(true) } }}>{title}</div>

            
                {list?.map((board: any, a: any) => (
                    <div>
                        {list[a].cards.map((card: any,b:string) => (
                            <p key={b}>{card.title}</p>
                        ))}
                    </div>
                ))}
                {/* {index === 0 && <p className="Card">{list[5]?.cards?.map((a:any,ind:any) => <p key={ind}>{a.title}</p> )}</p>} */}
            </div>

        </>
    }
}
export default Titles