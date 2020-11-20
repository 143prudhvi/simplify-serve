import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBoard } from 'app/shared/model/board.model';
import { BoardService } from './board.service';
import { BoardDeleteDialogComponent } from './board-delete-dialog.component';

@Component({
  selector: 'jhi-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit, OnDestroy {
  boards?: IBoard[];
  eventSubscriber?: Subscription;

  constructor(protected boardService: BoardService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.boardService.query().subscribe((res: HttpResponse<IBoard[]>) => (this.boards = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBoards();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBoard): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBoards(): void {
    this.eventSubscriber = this.eventManager.subscribe('boardListModification', () => this.loadAll());
  }

  delete(board: IBoard): void {
    const modalRef = this.modalService.open(BoardDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.board = board;
  }
}
