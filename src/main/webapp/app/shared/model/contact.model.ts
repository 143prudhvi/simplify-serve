export interface IContact {
  id?: number;
  name?: string;
  phone?: number;
}

export class Contact implements IContact {
  constructor(public id?: number, public name?: string, public phone?: number) {}
}
