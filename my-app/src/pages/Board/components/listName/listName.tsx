import React, { useState, useEffect } from "react";
import "./listName.scss";
import Area from "./dragAndDrop/drag";
import Cards from "../Cards/Cards";
interface Titles {
  title: string;
  cards: any;
  cardsId2: any;
  dropAreaId: any;
  // board:any
  edditListName: any;
  createCards: any;
  // listId:(id:number) => void;
  areaId: any;
  listName: any;
}

function Titles({
  title,
  cards,
  cardsId2,
  dropAreaId,
  edditListName,
  createCards,
  areaId,
  listName,
}: Titles) {
  // console.log(listName)
  // console.log(title)
  const [est, setEst] = useState(false);
  const [inp, setInp] = useState("");
  const cardsId1 = (cardsId: number) => {
    cardsId2(cardsId);
  };
  const dropId = (id: any) => {
    let ad = { areaId: id, listId: cards.id };
    dropAreaId(ad);
  };
  const onClick = (e: any) => {
    if (est == false) {
      setEst(true);
    }
    setInp(e.target.innerHTML);
  };
  const onBlur = () => {
    setEst(false);
    cards.title = inp;
    edditListName(cards);
  };

  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      setEst(false);

      cards.title = inp;
      console.log(cards);
      edditListName(cards);
    }
  };

  const newCards = (cards: any) => {
    createCards(cards);
  };

  return est ? (
    <div className="List">
      <input
        autoFocus
        onChange={(e) => setInp(e.target.value)}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        defaultValue={title}
      />
      <div>
        <Cards
          title={listName}
          cardsId1={cardsId1}
          cards={cards}
          dropAreaId={dropId}
          createCards={newCards}
        />
      </div>
    </div>
  ) : (
    <div>
      <div
        className="List"
        draggable
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragStart={() => {
          // console.log(cards)
          areaId(cards);
        }}
      >
        <div>
          <h1 onClick={onClick}>{title}</h1>
        </div>
        <div>
          <Cards
            title={listName}
            cardsId1={cardsId1}
            cards={cards}
            dropAreaId={dropId}
            createCards={newCards}
          />
        </div>
      </div>
    </div>
  );
}
export default Titles;
