import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContact, Contact } from 'app/shared/model/contact.model';
import { ContactService } from './contact.service';
import { ContactComponent } from './contact.component';
import { ContactDetailComponent } from './contact-detail.component';
import { ContactUpdateComponent } from './contact-update.component';

@Injectable({ providedIn: 'root' })
export class ContactResolve implements Resolve<IContact> {
  constructor(private service: ContactService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContact> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contact: HttpResponse<Contact>) => {
          if (contact.body) {
            return of(contact.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Contact());
  }
}

export const contactRoute: Routes = [
  {
    path: '',
    component: ContactComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.contact.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContactDetailComponent,
    resolve: {
      contact: ContactResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.contact.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContactUpdateComponent,
    resolve: {
      contact: ContactResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.contact.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContactUpdateComponent,
    resolve: {
      contact: ContactResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.contact.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
