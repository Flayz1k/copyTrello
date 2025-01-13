import Area from "../dragEvent/dragdroparea";
import "./Card.scss";
import CreateCards from "../CreateCards/CreateCards";
import { useDispatch, UseDispatch } from "react-redux";
import { increment } from "../../ReduxStore/action";
import { inc, dec } from "../../ReduxStore/action";
// import { title } from "process";
interface Card {
  cards: any;
  cardsId1: any;
  dropAreaId: any;
  createCards: any;
  title: any;
}
function Cards({ cards, cardsId1, dropAreaId, createCards, title }: Card) {
  // console.log(title.title)
  const areaId = (id: any) => {
    dropAreaId(id);
  };
  const newCards = (cards: object) => {
    createCards(cards);
  };
  const dispatch = useDispatch();
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
                onDragStart={() => {
                  cardsId1(a.id);
                }}
                className="Card"
                onClick={() => {
                  dispatch(inc());

                  let obj = {
                    card: a,
                    list: cards,
                    title: title.title,
                    fulldata: title,
                  };
                  console.log(title.title);
                  dispatch(increment(obj));
                }}
              >
                {a.title}
              </p>
              <Area area={areaIndex} areaId={areaId} />
            </div>
          ))}
          {/* <DragOverArea  area={cards.cards.length} areaId={areaId} /> */}
        </div>
      }
      <CreateCards lists={cards} newCards={newCards} />
    </>
  );
}
export default Cards;
