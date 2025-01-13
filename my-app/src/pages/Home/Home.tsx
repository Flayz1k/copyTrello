import { useState, useEffect } from "react";
import "./Home.scss";
import BoardComponents from "./components/Board/Board";
import api from "../../api/request";
import CreateBoard from "./components/CreateBoard/CreateBoard";
import { a, b } from "./components/interfaces";
import { useNavigate } from "react-router-dom";
function Component() {
  const [items, setItems] = useState<a[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: b = await api.get("board", {});
        setItems(data.boards);
      } catch (e:any) {
        console.log(e);
        setTimeout(() => {
          if(localStorage.getItem("data") == undefined ){
            navigate("/login");
          }          
        }, 300);
        
        if(e?.response.status == 401){
          navigate(0)
          console.log("reload")
        }
        

      }
    };
    fetchData();
  }, []);
  console.log(items, "ДАННІ В СТЕЙТІ");

  const s = items.map((board) => (
    <div key={board.id}>
      <BoardComponents title={board.title} id={board.id} />
    </div>
  ));
  function a(danni: { id: number; title: string; custom: any }[]) {
    setItems(danni);
  }
  // async function Create () {
  //     const data =  await api.delete("board/1724590973468")
  // }
  // Create()
  const [opens, setOpens] = useState(false);

  const refreshToken = localStorage.getItem("refresh");

  console.log(refreshToken);
  console.log(localStorage.getItem("data"));

  const Exit = () => {
    const Fetch = async () => {
      try {
        const response: any = await api.post("/refresh", {
          refreshToken,
        });
        if (response?.token && response?.refreshToken) {
          localStorage.clear();
          navigate("/login");
        }
        localStorage.setItem("data", response?.token);
        localStorage.setItem("refresh", response?.refreshToken);
        localStorage.clear()
        console.log(response);
      } catch (e: any) {
        console.log(e);
        navigate("/");
      }
    };
    Fetch();
  };
  return (
    <>
      <h2 className="Exit" onClick={() => Exit()}>
        Вийти
      </h2>
      <div className="Box">
        {s}
        <div className="CreateBoards" onClick={() => setOpens(true)}>
          <p>Створити дошку</p>
        </div>
        <CreateBoard open={opens} close={() => setOpens(false)} danni={a} />
      </div>
    </>
  );
}

export default Component;
