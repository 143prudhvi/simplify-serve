import { Moment } from 'moment';

export interface ISlip {
  id?: number;
  date?: Moment;
  tbgr?: number;
  grade?: string;
  lotno?: number;
  weight?: number;
  price?: number;
}

export class Slip implements ISlip {
  constructor(
    public id?: number,
    public date?: Moment,
    public tbgr?: number,
    public grade?: string,
    public lotno?: number,
    public weight?: number,
    public price?: number
  ) {}
}
