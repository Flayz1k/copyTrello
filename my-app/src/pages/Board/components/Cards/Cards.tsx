import { HTMLAttributes, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../api/request";
import Area from "../dragEvent/dragdroparea";
import "./Card.scss";
import CreateCards from "../CreateCards/CreateCards";
interface Card {
  // index: number;
  cards: any;
  // setDraggedCard: (id: number) => void;
  // setDropAreaId: (id: number) => void;
  // cardsId1: (id:number) => void;
  cardsId1: any;
  dropAreaId: any;
  createCards: any; //{title:string,id:number}
}
function Cards({ cards, cardsId1, dropAreaId, createCards }: Card) {
  const [list, setList] = useState<any>();
  function update(s: any) {
    setList(s);
  }
  const areaId = (id: any) => {
    dropAreaId(id);
  };
  const newCards = (cards: object) => {
    createCards(cards);
  };
  return (
    <>
      <div className="divCards">
        <Area area={-1} areaId={areaId} />
      </div>
      {
        <div className="divCards">
          {cards?.cards.map((a: any, areaIndex: any) => (
            <div key={areaIndex}>
              <p
                draggable
                onDragOver={(e) => e.preventDefault()}
                onDragStart={() => cardsId1(a.id)}
                className="Card"
              >
                {a.title}
              </p>
              <Area area={areaIndex} areaId={areaId} />
            </div>
          ))}
        </div>
      }
      <CreateCards lists={cards} newCards={newCards} />
    </>
  );
}
export default Cards;
