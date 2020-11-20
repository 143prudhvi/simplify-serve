import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SimplifyServeSharedModule } from 'app/shared/shared.module';
import { VillageComponent } from './village.component';
import { VillageDetailComponent } from './village-detail.component';
import { VillageUpdateComponent } from './village-update.component';
import { VillageDeleteDialogComponent } from './village-delete-dialog.component';
import { villageRoute } from './village.route';

@NgModule({
  imports: [SimplifyServeSharedModule, RouterModule.forChild(villageRoute)],
  declarations: [VillageComponent, VillageDetailComponent, VillageUpdateComponent, VillageDeleteDialogComponent],
  entryComponents: [VillageDeleteDialogComponent],
})
export class SimplifyServeVillageModule {}
