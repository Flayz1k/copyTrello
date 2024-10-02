import { Interface } from "readline";

interface board {
  title?: string;
  id?: number;
  custom?: {
    description: string;
  };
  lists?: {
    title: string;
    position: number;
    id: number;
    cards: {
      title: string;
      posotion: number;
    }[];
  }[];
}

interface lists {
  title: string;
  position: number;
  id: number;
}

interface Card {
  title: string;
}
interface listss {
  title: string;
  position: number;
  id: number;
  cards: Card[];
}
type listsarr = lists[];
export type { board, listsarr, listss };
