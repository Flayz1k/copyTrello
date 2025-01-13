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
