import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IVillage, Village } from 'app/shared/model/village.model';
import { VillageService } from './village.service';
import { VillageComponent } from './village.component';
import { VillageDetailComponent } from './village-detail.component';
import { VillageUpdateComponent } from './village-update.component';

@Injectable({ providedIn: 'root' })
export class VillageResolve implements Resolve<IVillage> {
  constructor(private service: VillageService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVillage> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((village: HttpResponse<Village>) => {
          if (village.body) {
            return of(village.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Village());
  }
}

export const villageRoute: Routes = [
  {
    path: '',
    component: VillageComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.village.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VillageDetailComponent,
    resolve: {
      village: VillageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.village.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VillageUpdateComponent,
    resolve: {
      village: VillageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.village.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VillageUpdateComponent,
    resolve: {
      village: VillageResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.village.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
