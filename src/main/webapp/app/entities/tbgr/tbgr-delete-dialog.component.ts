import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITbgr } from 'app/shared/model/tbgr.model';
import { TbgrService } from './tbgr.service';

@Component({
  templateUrl: './tbgr-delete-dialog.component.html',
})
export class TbgrDeleteDialogComponent {
  tbgr?: ITbgr;

  constructor(protected tbgrService: TbgrService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tbgrService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tbgrListModification');
      this.activeModal.close();
    });
  }
}
