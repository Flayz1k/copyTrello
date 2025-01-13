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
