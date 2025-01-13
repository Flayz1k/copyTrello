import React, { useEffect, useState } from "react";
import "./ChengCardPosition.scss";
import api from "../../../../api/request";
import { useRef } from "react";

export const ChengCardPosition = ({ data, boardId, escape }: any) => {
  // console.log(data)
  const [est, setEst] = useState(false);
  const [chisla, setChisla] = useState<any>([]);
  const [idd, setIdd] = useState<any>();
  // console.log(data.fulldata.lists)
  const ref: any = useRef(null);
  const ListOption = data.fulldata.lists.map((list: any) => {
    return (
      <option value={list.id} key={list.id}>
        {list.title}
      </option>
    );
  });
  let id: any;

  useEffect(() => {
    ref.current?.focus();
    // console.log("adad")
  }, []);
  const [i, setI] = useState<any>();
  const PositionOption = (id: any) => {
    // b = id
    setI(id);
    const find = data.fulldata.lists.find((list: any) => list.id === id);
    if (find) {
      // console.log(find.cards.length)
      const cards: any = [];
      for (let i = 0; i < find.cards.length; i++) {
        cards.push(i + 1);
      }
      setChisla(cards.length > 0 ? cards : [1]);
      // console.log(chisla)
    }
  };
  const open = () => {
    setEst(true);
    // if(data.fulldata.lists.length > 0){
    const defValue = data.fulldata.lists[0].id;
    setIdd(defValue);
    PositionOption(defValue);
    // }
    escape(false);
  };

  // const pos = chisla.map((i:any) =>{
  //      return <option key={i}>{i}</option>
  // })
  const [number, setNumber] = useState<any>();
  const Confirum = () => {
    console.log(number || 1);
    console.log(i);
    console.log(data.card.id);

    for (let b = 0; b < data.fulldata.lists.length; b++) {
      for (let s = 0; s < data.fulldata.lists[b].cards.length; s++) {
        if (data.fulldata.lists[b].cards[s].id == data.card.id) {
          console.log("d");
          data.fulldata.lists[b].cards.splice(s, 1);
        }
      }
    }
    console.log(data.card);
    for (let b = 0; b < data.fulldata.lists.length; b++) {
      // console.log("da")
      if (i === data.fulldata.lists[b].id) {
        data.fulldata.lists[b].cards.splice(+number, 0, data.card);
        // data.card.position = +number
      }
    }

    let card: any = [];
    console.log(number);
    card.push({
      id: data.card.id,
      position: number || 1,
      list_id: i,
    });

    const FetchData = async () => {
      await api.put("board/" + boardId + "/card", card);
    };
    FetchData();
    console.log(card);
    setEst(false);
    escape(true);
  };

  // const onKeyDown = (e: any) => {
  //     console.log(e.key)
  //       if (e.key == "Escape") {
  //         setEst(false)
  //         console.log("Adadd")
  //       }

  //   };

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      setEst(false);
      escape(true);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [est, escape]);

  return (
    <>
      <div ref={ref} tabIndex={0}>
        В списку{" "}
        <span
          onClick={() => {
            open();
          }}
          className="ListCardPositionEdit"
        >
          {data.list.title}
        </span>{" "}
      </div>{" "}
      {est ? (
        <>
          <div className="div122">
            <p className="movingCard">Переміщення карток</p>
            <div
              className="Close"
              onClick={() => {
                setEst(false);
                escape(true);
              }}
            >
              ⨉
            </div>
            <div className="list23">Список</div>
            <select
              className="select"
              onChange={(e) => {
                id = +e.currentTarget.value;
                setIdd(id);
                PositionOption(id);
              }}
            >
              {ListOption}
            </select>
            <select
              className="Position"
              onChange={(e) => {
                setNumber(+e.target.value);
              }}
            >
              {chisla.map((i: any) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>

            <div className="MoveCard" onClick={Confirum}>
              Перемістити
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
