import React from "react";
import { useState } from "react";
import "./CreateBoard.scss"
import { be, a, b,create } from "../interfaces";
import api from "../../../../api/request";


function CreateBoard({ open , close,danni}: create) {
    const [inp1, setInp1] = useState('')
    function inp(e: be) {
        setInp1(e.target.value)
    }
    function Create() {
        if (inp1.length == 0 || inp1.includes("~") || inp1.includes("!") || inp1.includes("@") || inp1.includes("#") || inp1.includes("$") || inp1.includes("%") || inp1.includes("^") || inp1.includes("&")) {
        } else {
            const creating = async () => {
                const data = await api.post('board', {
                    title: inp1,
                    custom: {
                        description: "desc"
                    }
                });
                 geting()
            }
            const geting = async () => {
                const data: b = await api.get("board")
                danni(data.boards)
            }
            creating()
        }
    }
    if (open) {
        return (
            <div className="modalWindow">
                <button onClick={close}>Закрити</button>
                <form>
                    <label htmlFor="inp">Назва дошки:</label>
                    <input id="inp" onChange={inp} />
                </form>
                <button onClick={Create}>Створити</button>
            </div>
        )
    } else {
        return <></>;
    }
}
export default CreateBoard