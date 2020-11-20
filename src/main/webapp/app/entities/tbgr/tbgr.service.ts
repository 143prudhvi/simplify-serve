import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITbgr } from 'app/shared/model/tbgr.model';

type EntityResponseType = HttpResponse<ITbgr>;
type EntityArrayResponseType = HttpResponse<ITbgr[]>;

@Injectable({ providedIn: 'root' })
export class TbgrService {
  public resourceUrl = SERVER_API_URL + 'api/tbgrs';

  constructor(protected http: HttpClient) {}

  create(tbgr: ITbgr): Observable<EntityResponseType> {
    return this.http.post<ITbgr>(this.resourceUrl, tbgr, { observe: 'response' });
  }

  update(tbgr: ITbgr): Observable<EntityResponseType> {
    return this.http.put<ITbgr>(this.resourceUrl, tbgr, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITbgr>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITbgr[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
