import { useState, useEffect} from "react";
import "./Home.scss"
import BoardComponents from "./components/Board/Board";
import api from "../../api/request";
import CreateBoard from "./components/CreateBoard/CreateBoard";
import { a,b } from "./components/interfaces";

function Component() {

    const [items, setItems] = useState<a[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data: b = await api.get('board', {});
            setItems(data.boards)

        }
        fetchData()
    }, []);
    console.log(items, "ДАННІ В СТЕЙТІ")
    
    const s = items.map(board =>
        <div key={board.id}>
            <BoardComponents title={board.title} id={board.id} />
        </div>
    )
    function a (danni:{id:number,title:string,custom:any}[]){
        setItems(danni)
    }
    // async function Create () {
    //     const data =  await api.delete("board/1724590973468")
    // }
    // Create()
    const [opens, setOpens] = useState(false)

    return (<>
        <div className="Box">
        {s}
            <div className="CreateBoards" onClick={() => setOpens(true)}>
                <p >Створити дошку</p>
            </div>
            <CreateBoard open={opens} close={() => setOpens(false)} danni={a} />
            
        </div>

    </>
    );
}

export default Component



