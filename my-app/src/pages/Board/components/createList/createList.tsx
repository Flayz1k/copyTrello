import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./createList.scss";
import api from "../../../../api/request";
import Cards from "../CreateCards/CreateCards";
import {} from "react-toastify";
interface board {
  title: string;
  id: number;
  custom: {
    description: string;
  };
  lists: {
    title: string;
    position: number;
    id: number;
  }[];
}
interface lists {
  title: string;
  position: number;
  id: number;
}
function CreateList({ board }: any) {
  const [inp, setInp] = useState("");

  const [data, setData] = useState<lists[]>();
  const [len, setLen] = useState<number>();
  // useEffect(() => {
  //   async function get() {
  //     const data: board = await api.get("board/" + board_id);
  //     setData(data.lists);
  //     if (data?.lists.length == 0) {
  //       setLen(1);
  //     } else {
  //       setLen((data?.lists.length || 0) + 1);
  //     }

  //   }
  //   get();

  // async function dalete() {
  //   const data = api.delete("board/" + board_id, {
  // title: "3   bob",                   +"/list/" + "1725114333633"
  // list_id:  1725103475595,
  // position: 5,
  // description: "washing process",
  // custom: {
  //     deadline: "2022-08-31 12:00"
  // }
  // });
  // }
  // dalete()
  // }, []);

  // async function post() {
  //   if (inp.length !== 0) {

  //     const data = await api.post("board/" + board_id + "/list", {
  //       title: inp,
  //       position: len,
  //     });
  //   }
  //   get();
  // }
  // async function get() {
  //   const data: any = await api.get("board/" + board_id);
  // beb(data.lists);
  // }

  const onKeyDown = (e: any) => {
    if (e.key == "Enter") {
      setModal(false);
      board(inp);
    }
  };

  const onBlur = () => {
    setModal(false);
    // post();
    board(inp);
  };

  const [modal, setModal] = useState(false);
  return modal ? (
    <div className="createList">
      <input
        autoFocus
        onChange={(e) => setInp(e.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    </div>
  ) : (
    <div className="createList" onClick={() => setModal(true)}>
      Створити іще один список
    </div>
  );
}
export default CreateList;
