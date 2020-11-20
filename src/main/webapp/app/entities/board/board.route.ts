import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBoard, Board } from 'app/shared/model/board.model';
import { BoardService } from './board.service';
import { BoardComponent } from './board.component';
import { BoardDetailComponent } from './board-detail.component';
import { BoardUpdateComponent } from './board-update.component';

@Injectable({ providedIn: 'root' })
export class BoardResolve implements Resolve<IBoard> {
  constructor(private service: BoardService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBoard> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((board: HttpResponse<Board>) => {
          if (board.body) {
            return of(board.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Board());
  }
}

export const boardRoute: Routes = [
  {
    path: '',
    component: BoardComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.board.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BoardDetailComponent,
    resolve: {
      board: BoardResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.board.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BoardUpdateComponent,
    resolve: {
      board: BoardResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.board.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BoardUpdateComponent,
    resolve: {
      board: BoardResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'simplifyServeApp.board.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
