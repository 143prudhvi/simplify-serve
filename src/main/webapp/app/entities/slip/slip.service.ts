import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISlip } from 'app/shared/model/slip.model';

type EntityResponseType = HttpResponse<ISlip>;
type EntityArrayResponseType = HttpResponse<ISlip[]>;

@Injectable({ providedIn: 'root' })
export class SlipService {
  public resourceUrl = SERVER_API_URL + 'api/slips';

  constructor(protected http: HttpClient) {}

  create(slip: ISlip): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(slip);
    return this.http
      .post<ISlip>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(slip: ISlip): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(slip);
    return this.http
      .put<ISlip>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISlip>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISlip[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(slip: ISlip): ISlip {
    const copy: ISlip = Object.assign({}, slip, {
      date: slip.date && slip.date.isValid() ? slip.date.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((slip: ISlip) => {
        slip.date = slip.date ? moment(slip.date) : undefined;
      });
    }
    return res;
  }
}
