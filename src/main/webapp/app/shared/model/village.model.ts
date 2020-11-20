export interface IVillage {
  id?: number;
  board?: string;
  village?: string;
}

export class Village implements IVillage {
  constructor(public id?: number, public board?: string, public village?: string) {}
}
