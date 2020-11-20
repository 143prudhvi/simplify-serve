export interface IGrade {
  id?: number;
  grade?: string;
}

export class Grade implements IGrade {
  constructor(public id?: number, public grade?: string) {}
}
