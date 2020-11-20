export interface IBoard {
  id?: number;
  board?: string;
}

export class Board implements IBoard {
  constructor(public id?: number, public board?: string) {}
}
