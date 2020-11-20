import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'slip',
        loadChildren: () => import('./slip/slip.module').then(m => m.SimplifyServeSlipModule),
      },
      {
        path: 'tbgr',
        loadChildren: () => import('./tbgr/tbgr.module').then(m => m.SimplifyServeTbgrModule),
      },
      {
        path: 'board',
        loadChildren: () => import('./board/board.module').then(m => m.SimplifyServeBoardModule),
      },
      {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.SimplifyServeContactModule),
      },
      {
        path: 'grade',
        loadChildren: () => import('./grade/grade.module').then(m => m.SimplifyServeGradeModule),
      },
      {
        path: 'village',
        loadChildren: () => import('./village/village.module').then(m => m.SimplifyServeVillageModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class SimplifyServeEntityModule {}
