import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITbgr, Tbgr } from 'app/shared/model/tbgr.model';
import { TbgrService } from './tbgr.service';
import { TbgrComponent } from './tbgr.component';
import { TbgrDetailComponent } from './tbgr-detail.component';
import { TbgrUpdateComponent } from './tbgr-update.component';

@Injectable({ providedIn: 'root' })
export class TbgrResolve implements Resolve<ITbgr> {
  constructor(private service: TbgrService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITbgr> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tbgr: HttpResponse<Tbgr>) => {
          if (tbgr.body) {
            return of(tbgr.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tbgr());
  }
}

export const tbgrRoute: Routes = [
  {
    path: '',
    component: TbgrComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.tbgr.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TbgrDetailComponent,
    resolve: {
      tbgr: TbgrResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.tbgr.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TbgrUpdateComponent,
    resolve: {
      tbgr: TbgrResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.tbgr.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TbgrUpdateComponent,
    resolve: {
      tbgr: TbgrResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.tbgr.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
