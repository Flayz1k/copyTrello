import React, { useState, useEffect } from "react";
import "./board.scss";
import api from "../../api/request";
import { useNavigate, useParams } from "react-router-dom";
import Titles from "./components/listName/listName";
import CreateList from "./components/createList/createList";
import Area from "./components/listName/dragAndDrop/drag";
import ModalWindow from "./components/cardsModal/modalWindow";
import { useSelector } from "react-redux";
export const Board = () => {
  const [board, setBoard] = useState<any>();
  let { board_id } = useParams();
  const dataStore: any = useSelector((state: any) => state.counter.danni);
  const falseOrTrue: any = useSelector((state: any) => state.count);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try{
      const data: any = await api.get("board/" + board_id, {});
      setBoard(data);
      console.log(data);
      }catch(e:any){
        setTimeout(() => {
          if(localStorage.getItem("data") == undefined  ){
            navigate("/login");
          }          
        }, 300);

        if(e?.response.status == 401){
          navigate(0)
          console.log("reload")
        }
        
      }
    };
    const adas = async () => {
      await api.delete("board/" + board_id);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (
      falseOrTrue == falseOrTrue &&
      dataStore?.title !== board?.title &&
      dataStore?.title !== board?.title
    ) {
      console.log(dataStore.title);
      setBoard({ ...board, title: dataStore.title });

      // if(dataStore.title )
      console.log(dataStore.title);
    }
  }, [falseOrTrue, dataStore.title]);

  // console.log(board?.title)
  // if(falseOrTrue == false){
  //   // if( Object.keys(dataStore).length ==0){
  //   // }else{
  //     console.log(dataStore.title)

  //     console.log(board?.title)
  //     setBoard({...board, title:dataStore?.title})
  //   // }
  // }

  const onTitleChange = (title: string) => {
    api.put("board/" + board_id, {
      title: title,
    });
    setBoard({ ...board, title: title });
  };

  //!!!!!!!!!!!!!DRAG AND DROP!!!!!!!!!!!!!!!!!!!!!!!

  let cardId = 0;
  const onDragStart = (cardIds: number) => {
    cardId = cardIds;
  };
  const onDrop = (areaId: any) => {
    console.log(areaId.areaId);
    let newBoard = { ...board };
    let cards: any;
    console.log(
      "DropArea: " + areaId.areaId,
      "CardId: " + cardId,
      "ListId: " + areaId.listId,
    );
    for (let i = 0; i < board.lists.length; i++) {
      for (let o = 0; o < board.lists[i].cards.length; o++) {
        if (board.lists[i].cards[o].id == cardId) {
          cards = newBoard.lists[i].cards[o];
          newBoard.lists[i].cards.splice(o, 1);
        }
      }
    }
    for (let i = 0; i < newBoard.lists.length; i++) {
      if (newBoard.lists[i].id == areaId.listId) {
        newBoard.lists[i].cards.splice(areaId.areaId, 0, cards);
      }
    }
    for (let i = 0; i < newBoard.lists.length; i++) {
      for (let o = 0; o < newBoard.lists[i].cards.length; o++) {
        newBoard.lists[i].cards[o].position = o + 1;
      }
    }
    let card: any = [];
    for (let i = 0; i < newBoard.lists.length; i++) {
      if (newBoard.lists[i].id == areaId.listId) {
        for (let o = 0; o < newBoard.lists[i].cards.length; o++) {
          card.push({
            id: newBoard.lists[i].cards[o].id,
            position: newBoard.lists[i].cards[o].position,
            list_id: areaId.listId,
          });
        }
      }
    }

    const fetchData = async () => {
      await api.put("board/" + board_id + "/card", card);
    };
    fetchData();
    setBoard(newBoard);
  };

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const getData = async () => {
    const data: any = await api.get("board/" + board_id);
    setBoard(data);
  };
  //!!!!!!!!!!!!!CREATE LIST!!!!!!!!!!!!!!!!!!!!!!!!!

  let listID: any;
  const newListName = (name: any) => {
    const date = new Date();
    const fetchData = async () => {
      await api.post("board/" + board_id + "/list", {
        title: name,
        position: board.lists.length + 1,
        id: +date,
      });
      getData();
    };
    fetchData();

    const up = [...board.lists];
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
    // console.log(newCards)
    const fetchData = async () => {
      await api.post("board/" + board_id + "/card", {
        title: newCards.title,
        list_id: newCards.id,
        position: newCards.position,
        description: newCards.description,
        custom: {
          deadline: "none",
        },
      });
      getData();
    };
    fetchData();
    let newCard = { ...board };
    for (let i = 0; i < board.lists.length; i++) {
      if (board.lists[i].id == newCards.id) {
        newCard.lists[i].cards.push({
          id: 121212,
          title: newCards.title,
          description: newCards.description,
          position: newCards.position,
          users: [],
          custom: { deadline: "2022-08-31 12:00" },
        });
      }
    }

    setBoard(newCard);
  };

  //СПИСКИ!!!!!!!!111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111

  let i: any;

  const areaId = (id: any) => {
    i = id;
  };
  let newData = { ...board };
  const drop4ik = (drop: any) => {
    console.log(drop, i.id);
    for (let b = 0; b < newData.lists.length; b++) {
      // console.log(newData.lists[b])
      if (newData.lists[b].id == i.id) {
        newData.lists.splice(b, 1);
      }
    }
    newData.lists.splice(drop, 0, i);
    console.log(newData);
    let lists: any = [];
    for (let n = 0; n < newData.lists.length; n++) {
      lists.push({
        id: newData.lists[n].id,
        position: n + 1,
      });
    }

    const PutData = async () => {
      await api.put("board/" + board_id + "/list", lists);
    };
    PutData();

    console.log(lists);
    setBoard(newData);
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
        ListName={edditListName}
        newCards={createNewCards}
        // listDropId={dropListId}
        dropArea={drop4ik}
        listAreaId={areaId}
        putListName={edditListName}
      />
      <ModalWindow></ModalWindow>
    </>
  );
};
const BoardTitle = ({ board, onTitleChange }: any) => {
  const [onChangeInp, setOnchangeInp] = useState();

  console.log(board?.title);
  const onChange = (e: any) => {
    setOnchangeInp(e.target.value);
  };
  const onKeyDown = (e: any) => {
    if (e.key == "Enter") {
      e.preventDefault();
      onTitleChange(e.target.value);
    }
  };
  return (
    <div className="boardTitle">
      <textarea
        rows={1}
        cols={60}
        defaultValue={board?.title}
        onChange={onChange}
        onBlur={() => {
          onTitleChange(onChangeInp);
        }}
        onKeyDown={onKeyDown}
      ></textarea>
    </div>
  );

  // return est ? (
  //   <div className="boardTitle">
  //     <input
  //       autoFocus
  //       onChange={onChange}
  //       onBlur={() => {
  //         setEsat(false);
  //         onTitleChange(onChangeInp);
  //       }}
  //       onKeyDown={onKeyDown}
  //       defaultValue={board?.title}
  //     />
  //   </div>
  // ) : (
  //   <div className="boardTitle">
  //     <div onClick={() => setEsat(true)}>{board?.title}</div>
  //   </div>
  // );
};

function ListName({
  lists,
  cardsId,
  dropAreaId,
  listName,
  putListName,
  newCards,
  dropArea,
  listAreaId,
}: any) {
  // console.log(lists)
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
  const drop4ik = (drop: any) => {
    dropArea(drop);
  };
  const areaId = (id: any) => {
    listAreaId(id);
  };
  return (
    <div className="board">
      <Area area={-1} dropArea={drop4ik} />
      {lists?.lists?.map((b: any, index: any) => (
        <>
          <Titles
            listName={lists}
            title={b.title}
            cards={b}
            cardsId2={card}
            dropAreaId={dropId}
            edditListName={edditListName}
            createCards={createCards}
            // listId={listId}
            areaId={areaId}
          />
          <Area area={index} dropArea={drop4ik} />
        </>
      ))}
      <CreateList board={newListName} />
    </div>
  );
}
