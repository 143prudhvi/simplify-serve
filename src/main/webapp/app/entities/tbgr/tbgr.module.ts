import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SimplifyServeSharedModule } from 'app/shared/shared.module';
import { TbgrComponent } from './tbgr.component';
import { TbgrDetailComponent } from './tbgr-detail.component';
import { TbgrUpdateComponent } from './tbgr-update.component';
import { TbgrDeleteDialogComponent } from './tbgr-delete-dialog.component';
import { tbgrRoute } from './tbgr.route';

@NgModule({
  imports: [SimplifyServeSharedModule, RouterModule.forChild(tbgrRoute)],
  declarations: [TbgrComponent, TbgrDetailComponent, TbgrUpdateComponent, TbgrDeleteDialogComponent],
  entryComponents: [TbgrDeleteDialogComponent],
})
export class SimplifyServeTbgrModule {}
