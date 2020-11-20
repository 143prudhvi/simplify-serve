export interface ITbgr {
  id?: number;
  board?: string;
  village?: string;
  tbgr?: number;
  name?: string;
}

export class Tbgr implements ITbgr {
  constructor(public id?: number, public board?: string, public village?: string, public tbgr?: number, public name?: string) {}
}
