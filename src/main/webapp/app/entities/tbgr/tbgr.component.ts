import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITbgr } from 'app/shared/model/tbgr.model';
import { TbgrService } from './tbgr.service';
import { TbgrDeleteDialogComponent } from './tbgr-delete-dialog.component';

@Component({
  selector: 'jhi-tbgr',
  templateUrl: './tbgr.component.html',
})
export class TbgrComponent implements OnInit, OnDestroy {
  tbgrs?: ITbgr[];
  eventSubscriber?: Subscription;

  constructor(protected tbgrService: TbgrService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.tbgrService.query().subscribe((res: HttpResponse<ITbgr[]>) => (this.tbgrs = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTbgrs();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITbgr): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTbgrs(): void {
    this.eventSubscriber = this.eventManager.subscribe('tbgrListModification', () => this.loadAll());
  }

  delete(tbgr: ITbgr): void {
    const modalRef = this.modalService.open(TbgrDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tbgr = tbgr;
  }
}
