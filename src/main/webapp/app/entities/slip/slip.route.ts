import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISlip, Slip } from 'app/shared/model/slip.model';
import { SlipService } from './slip.service';
import { SlipComponent } from './slip.component';
import { SlipDetailComponent } from './slip-detail.component';
import { SlipUpdateComponent } from './slip-update.component';

@Injectable({ providedIn: 'root' })
export class SlipResolve implements Resolve<ISlip> {
  constructor(private service: SlipService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISlip> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((slip: HttpResponse<Slip>) => {
          if (slip.body) {
            return of(slip.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Slip());
  }
}

export const slipRoute: Routes = [
  {
    path: '',
    component: SlipComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.slip.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SlipDetailComponent,
    resolve: {
      slip: SlipResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.slip.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SlipUpdateComponent,
    resolve: {
      slip: SlipResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.slip.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SlipUpdateComponent,
    resolve: {
      slip: SlipResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.slip.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
