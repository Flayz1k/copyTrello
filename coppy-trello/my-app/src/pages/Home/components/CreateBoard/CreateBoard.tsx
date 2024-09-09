import React from "react";
import { useState } from "react";
import "./CreateBoard.scss"
import { be, a, b,create } from "../interfaces";
import api from "../../../../api/request";
import { ToastContainer,toast } from "react-toastify";


function CreateBoard({ open , close,danni}: create) {
    const [inp1, setInp1] = useState('')
    function inp(e: be) {
        setInp1(e.target.value)
    }
    function Create() {
        if (inp1.length == 0 || inp1.includes("~") || inp1.includes("!") || inp1.includes("@") || inp1.includes("#") || inp1.includes("$") || inp1.includes("%") || inp1.includes("^") || inp1.includes("&")) {
        } else {
            const creating = async () => {
                try{
                const data = await api.post('board', {
                    title: inp1,
                    custom: {
                        description: "desc"
                    }
                });
                 geting()
            }catch(e:any){
                toast.error(`Error ${e.message}`)
            }
            }
            const geting = async () => {
                try{
                const data: b = await api.get("board")
                danni(data.boards)
                }catch(e:any){
                    toast.error(`Error ${e.message}`)

                }

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
                <ToastContainer/>
            </div>
            
        )
    } else {
        return <></>;
    }
}
export default CreateBoard