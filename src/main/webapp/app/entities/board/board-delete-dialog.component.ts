import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBoard } from 'app/shared/model/board.model';
import { BoardService } from './board.service';

@Component({
  templateUrl: './board-delete-dialog.component.html',
})
export class BoardDeleteDialogComponent {
  board?: IBoard;

  constructor(protected boardService: BoardService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.boardService.delete(id).subscribe(() => {
      this.eventManager.broadcast('boardListModification');
      this.activeModal.close();
    });
  }
}
