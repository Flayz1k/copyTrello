import "./Cards.scss";
import { useEffect, useState } from "react";
import api from "../../../../api/request";
import { useParams } from "react-router-dom";
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

function CreateCards({ lists, newCards }: any) {
  // const { board_id } = useParams();
  // const [cards, setCards] = useState<any>()
  const [est, setEst] = useState(false);
  const [inp, setInp] = useState("");
  // const [indexx,setIndexx] = useState<any>()
  async function post() {
    // // if (inp.length === 0) {
    // // } else {
    // //   await api.post("board/" + board_id + "/card", {
    // //     title: inp,
    // //     list_id: lists[index].id,
    // //     position: lists[index].cards.length + 1,
    // //     description: "washing process",
    // //     custom: {
    // //       deadline: "2022-08-31 12:00",
    // //     },
    // //   });
    // // }
    // get();
    // setInp("");
    let object = { title: inp, id: lists.id, position: lists.cards.length + 1 };
    newCards(object);
    setInp("");
  }

  return est ? (
    <div>
      <input
        autoFocus
        onChange={(e) => setInp(e.target.value)}
        onBlur={() => {
          setEst(false);
          post();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setEst(false);
            post();
          }
        }}
      />
    </div>
  ) : (
    <div
      className="AddCards"
      onClick={() => {
        setEst(true);
      }}
    >
      Додати картку
    </div>
  );
}
export default CreateCards;
