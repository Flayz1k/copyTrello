import React, { useState } from "react";
import "./Description.scss";
import api from "../../../../api/request";
import axios from "axios";

function Descripton({ description, boardid }: any) {
  // let b:any
  // console.log(description)
  const [desc, setDesc] = useState<any>();
  let s = desc || description.card.description || "Додати опис";
  const [est, setEst] = useState<any>(false);
  const onChange = (e: any) => {
    setDesc(e.target.value);
  };
  const Save = () => {
    console.log(desc);
    description.card.description = desc;
    const FetchData = async () => {
      await api.put("board/" + boardid + "/card/" + description.card.id, {
        title: description.card.title,
        description: desc,
        list_id: description.list.id,
      });
    };
    FetchData();
  };

  return (
    <>
      {" "}
      <div>Опис</div>
      {est ? (
        <div className="Options">
          <textarea
            autoFocus
            rows={4}
            cols={60}
            onChange={(e) => {
              onChange(e);
            }}
            defaultValue={desc || description.card.description}
          ></textarea>
          <div
            onClick={() => {
              setEst(false);
              Save();
            }}
            className="Save"
          >
            Зберегти{" "}
          </div>
          <div className="Cancel" onClick={() => setEst(false)}>
            Скасувати
          </div>
        </div>
      ) : (
        <>
          <div className="addDescropton" onClick={() => setEst(true)}>
            <p>{s}</p>
          </div>
        </>
      )}
    </>
  );
}

export default Descripton;
