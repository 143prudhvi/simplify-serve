import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVillage } from 'app/shared/model/village.model';

type EntityResponseType = HttpResponse<IVillage>;
type EntityArrayResponseType = HttpResponse<IVillage[]>;

@Injectable({ providedIn: 'root' })
export class VillageService {
  public resourceUrl = SERVER_API_URL + 'api/villages';

  constructor(protected http: HttpClient) {}

  create(village: IVillage): Observable<EntityResponseType> {
    return this.http.post<IVillage>(this.resourceUrl, village, { observe: 'response' });
  }

  update(village: IVillage): Observable<EntityResponseType> {
    return this.http.put<IVillage>(this.resourceUrl, village, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IVillage>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IVillage[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
