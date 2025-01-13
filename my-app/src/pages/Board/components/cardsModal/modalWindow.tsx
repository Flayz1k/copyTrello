import { useSelector } from "react-redux";
import "./modalWindow.scss";
import { useDispatch } from "react-redux";
import { dec } from "../../ReduxStore/action";
import { useEffect, useRef, useState } from "react";
import api from "../../../../api/request";
import { useParams } from "react-router-dom";
import { ChengCardPosition } from "./ChengCardPosition";
import Descripton from "./Descripton";
export default function ModalWindow() {
  const count: any = useSelector((state: any) => state.counter.danni);
  const counter: any = useSelector((state: any) => state.count);
  const [open, setOpen] = useState<any>(true);
  // console.log(count.card.description)
  const dispatch = useDispatch();
  const ref: any = useRef(null);
  const { board_id } = useParams();
  useEffect(() => {
    if (counter) {
      ref.current.focus();
    }
  }, [counter]);
  console.log(count);

  let inputValue: any;
  const edditInput = () => {
    const CardNamePut = async () => {
      try {
        await api.put("board/" + board_id + "/card/" + count.card.id, {
          title: inputValue,
          list_id: count.list.id,
        });
      } catch (e) {
        console.log(e);
      }
    };
    CardNamePut();
    count.card.title = inputValue || count.card.title;
  };

  let o: any;
  const tableNewName = () => {
    const boardTitlePut = async () => {
      await api.put("board/" + board_id, {
        title: o,
      });
    };
    boardTitlePut();
    count.title = o || count.title;
  };
  // let falseortrue = true
  const [falseortrue, setFalseortrue] = useState<any>(true);

  const EdditCardName = (e: any) => {
    if (e.key == "Escape") {
      inputValue = undefined;
      e.target.value = count.card.title;
      e.target.blur();
      ref.current.focus();
      setFalseortrue(true);
    }
  };
  const EdditTableName = (e: any) => {
    if (e.key == "Escape") {
      o = undefined;
      e.target.value = count.title;
      e.target.blur();
      ref.current.focus();
      setFalseortrue(true);
    }
  };
  const onKeyDown = (e: any) => {
    console.log("Ada");
    if (e.key == "Escape") {
      if (falseortrue && open) {
        dispatch(dec());
      }
    }
  };
  const DeleteCard = () => {
    count.list.cards.splice(0, 1);
    const FetchData = async () => {
      await api.delete("/board/" + board_id + "/card/" + count.card.id);
    };
    FetchData();
    dispatch(dec());
  };
  return counter ? (
    <div
      className="modalka"
      ref={ref}
      tabIndex={0}
      onClick={() => {
        if (open) {
          dispatch(dec());
        }
      }}
      onKeyDown={onKeyDown}
    >
      <div
        className="modalka-edd"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          onClick={() => {
            if (open) {
              dispatch(dec());
            }
          }}
          className="closeModalWindow"
        >
          ⨉
        </div>
        {/* <div onClick={()=>{console.log(count.card.description)}}>dasd</div> */}
        <div className="DivTable">
          <p className="Table">Доска</p>
          <textarea
            onKeyDown={EdditTableName}
            onFocus={() => {
              setFalseortrue(false);
            }}
            onChange={(e) => {
              o = e.target.value;
            }}
            onBlur={() => {
              tableNewName();
              setFalseortrue(true);
            }}
            className="textArea"
            cols={30}
            rows={1}
            defaultValue={count.title}
          ></textarea>
        </div>
        <div className="DivList">
          <div>
            {" "}
            <ChengCardPosition
              data={count}
              boardId={board_id}
              escape={(e: any) => {
                setOpen(e);
              }}
            />
          </div>
          <span>Перейменувати картку: </span>
          <input
            onKeyDown={EdditCardName}
            onFocus={() => {
              setFalseortrue(false);
            }}
            onChange={(e) => {
              inputValue = e.target.value;
            }}
            onBlur={() => {
              edditInput();
              setFalseortrue(true);
            }}
            defaultValue={count.card.title}
            className="cardsInput"
          ></input>
          <Descripton description={count} boardid={board_id} />

          <div className="DeleteCard" onClick={() => DeleteCard()}>
            Видалити картку
          </div>
        </div>
      </div>
    </div>
  ) : (
    // <p>Whot you know about rollin down in the deep</p>
    <></>
  );
}
