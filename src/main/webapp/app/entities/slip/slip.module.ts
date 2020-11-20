import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SimplifyServeSharedModule } from 'app/shared/shared.module';
import { SlipComponent } from './slip.component';
import { SlipDetailComponent } from './slip-detail.component';
import { SlipUpdateComponent } from './slip-update.component';
import { SlipDeleteDialogComponent } from './slip-delete-dialog.component';
import { slipRoute } from './slip.route';

@NgModule({
  imports: [SimplifyServeSharedModule, RouterModule.forChild(slipRoute)],
  declarations: [SlipComponent, SlipDetailComponent, SlipUpdateComponent, SlipDeleteDialogComponent],
  entryComponents: [SlipDeleteDialogComponent],
})
export class SimplifyServeSlipModule {}
