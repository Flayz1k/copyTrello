import React, { useState, useEffect } from "react";
import "./board.scss";
// import Titles from "./components/List/List"
import api from "../../api/request";
import { useParams } from "react-router-dom";
import Titles from "./components/listName/listName";
import { board, listsarr } from "./interfaces";
import CreateList from "./components/createList/createList";
// import Cards from "./components/CreateCards/CreateCards"
import { ToastContainer, toast } from "react-toastify";
import { title } from "process";
import { create } from "domain";
export const Board = () => {
  const [board, setBoard] = useState<any>();
  let { board_id } = useParams();
  const [updataBoard, setUpdateBoard] = useState<any>()
  useEffect(() => {
    const fetchData = async () => {
      const data: any = await api.get("board/" + board_id, {});
      setBoard(data);
      console.log(data);
    };
    const adas = async () => {
      await api.delete("board/" + board_id)
    }
    //  adas()


    fetchData();
  }, []);

  const onTitleChange = (title: string) => {
    api.put("board/" + board_id, {
      title: title,
    });
    setBoard({ ...board, title: title });
  };

  //!!!!!!!!!!!!!DRAG AND DROP!!!!!!!!!!!!!!!!!!!!!!!
  const data = () => {
  }
  let cardId = 0;
  const onDragStart = (cardIds: number) => {
    cardId = cardIds;
  };
  const onDrop = (areaId: any) => {
    let newBoard = { ...board }
    let cards: any
    // console.log("DropArea: " + areaId.areaId , "CardId: " + cardId, "ListId: " + areaId.listId );
    for (let i = 0; i < board.lists.length; i++) {
      for (let o = 0; o < board.lists[i].cards.length; o++) {
        if (board.lists[i].cards[o].id == cardId) {
          // console.log(newBoard.lists[i].cards[o])
          cards = newBoard.lists[i].cards[o]
          newBoard.lists[i].cards.splice(o, 1)


        }


      }
    }

    for (let i = 0; i < newBoard.lists.length; i++) {
      if (newBoard.lists[i].id == areaId.listId) {
        newBoard.lists[i].cards.splice(areaId.areaId, 0, cards)
        console.log(cards)
        console.log(newBoard.lists[i].id)
        const fetchPostCards = async () => {
          await api.post("board/" + board_id + "/card", {
            title: cards.title,
            list_id: areaId.listId,
            position: +areaId.areaId,
            description: "washing process",
            custom: {
              deadline: "2022-08-31 12:00"
            }

          })
        }
        fetchPostCards()  

        
        const fedchDelCards = async () => {
          await api.delete("board/" + board_id + "/card/" + cardId)

        }
        fedchDelCards()
      }
    }


    setBoard(newBoard)
    console.log(board)
  };

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


  //!!!!!!!!!!!!!CREATE LIST!!!!!!!!!!!!!!!!!!!!!!!!!
  const newListName = (name: any) => {
    const fetchData = async () => {
      await api.post("board/" + board_id + "/list", {
        title: name,
        position: board.lists.length + 1,
      });
    };
    fetchData();
    const up = [...board.lists];
    // id:board.lists.length+1,
    up.push({ title: name, position: board.lists.length + 1, cards: [] });
    setBoard({ ...board, lists: up });
  };

  const edditListName = (name: any) => {
    const fetchData = async () => {
      await api.put("board/" + board_id + "/list/" + name.id, {
        title: name.title,
      });
    };
    fetchData();
    let newName = [];
    for (let i = 0; i < board.lists.length; i++) {
      let b = board.lists[i];
      if (board.lists[i] == name.id) {
        newName.push({ ...b, title: name });
      } else {
        newName.push(b);
      }
    }

    setBoard({ ...board, lists: newName });
  };
  const createNewCards = (newCards: any) => {
    console.log(board)
    const fetchData = async () => {
      await api.post("board/" + board_id + "/card", {
        title: newCards.title,
        list_id: newCards.id,
        position: newCards.position,
        description: "none",
        custom: {
          deadline: "none",
        },
      });
    };
    fetchData();
    let newCard = { ...board }
    for (let i = 0; i < board.lists.length; i++) {
      if (board.lists[i].id == newCards.id) {
        newCard.lists[i].cards.push({ id: 121212, title: newCards.title, description: 'none', position: newCards.position, users: [], custom: { deadline: '2022-08-31 12:00' } })
      }
    }
    setBoard(newCard)
  };


  return (
    <>
      <BoardTitle board={board} onTitleChange={onTitleChange} />
      <ListName
        lists={board}
        cardsId={onDragStart}
        dropAreaId={onDrop}
        listName={newListName}
        board={board}
        putListName={edditListName}
        newCards={createNewCards}
      // listDropId={dropListId}
      />
    </>
  );
};
const BoardTitle = ({ board, onTitleChange }: any) => {
  const [onChangeInp, setOnchangeInp] = useState();
  const onChange = (e: any) => {
    // onTitleChange(e.target.value);
    setOnchangeInp(e.target.value);
  };

  const onKeyDown = (e: any) => {
    if (e.key == "Enter") {
      onTitleChange(e.target.value);
    }
  };
  const [est, setEsat] = useState(false);
  return est ? (
    <div className="boardTitle">
      <input
        autoFocus
        onChange={onChange}
        onBlur={() => {
          setEsat(false);
          onTitleChange(onChangeInp);
        }}
        onKeyDown={onKeyDown}
        defaultValue={board?.title}
      />
    </div>
  ) : (
    <div className="boardTitle">
      <div onClick={() => setEsat(true)}>{board?.title}</div>
    </div>
  );
};

function ListName({
  lists,
  cardsId,
  dropAreaId,
  listName,
  putListName,
  newCards,
  // listDropId
}: any) {
  const card = (cardId: number) => {
    cardsId(cardId);
  };
  const dropId = (id: any) => {
    dropAreaId(id);
  };
  const newListName = (name: any) => {
    listName(name);
  };
  const edditListName = (name: any) => {
    putListName(name);
  };
  const createCards = (cards: any) => {
    newCards(cards);
  };
  // const listId = (id:number) =>{
  //   listDropId(id)
  // }

  return (
    <div className="board">
      {lists?.lists?.map((b: any, index: any) => (
        <Titles
          key={index}
          title={b.title}
          cards={b}
          cardsId2={card}
          dropAreaId={dropId}
          edditListName={edditListName}
          createCards={createCards}
        // listId={listId}
        />
      ))}
      <CreateList board={newListName} />
    </div>
  );
}

