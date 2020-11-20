import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISlip } from 'app/shared/model/slip.model';
import { SlipService } from './slip.service';

@Component({
  templateUrl: './slip-delete-dialog.component.html',
})
export class SlipDeleteDialogComponent {
  slip?: ISlip;

  constructor(protected slipService: SlipService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.slipService.delete(id).subscribe(() => {
      this.eventManager.broadcast('slipListModification');
      this.activeModal.close();
    });
  }
}
