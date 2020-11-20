import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVillage } from 'app/shared/model/village.model';
import { VillageService } from './village.service';

@Component({
  templateUrl: './village-delete-dialog.component.html',
})
export class VillageDeleteDialogComponent {
  village?: IVillage;

  constructor(protected villageService: VillageService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.villageService.delete(id).subscribe(() => {
      this.eventManager.broadcast('villageListModification');
      this.activeModal.close();
    });
  }
}
