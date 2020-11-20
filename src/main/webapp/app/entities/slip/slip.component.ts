import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISlip } from 'app/shared/model/slip.model';
import { SlipService } from './slip.service';
import { SlipDeleteDialogComponent } from './slip-delete-dialog.component';

@Component({
  selector: 'jhi-slip',
  templateUrl: './slip.component.html',
})
export class SlipComponent implements OnInit, OnDestroy {
  slips?: ISlip[];
  eventSubscriber?: Subscription;

  constructor(protected slipService: SlipService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.slipService.query().subscribe((res: HttpResponse<ISlip[]>) => (this.slips = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSlips();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISlip): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSlips(): void {
    this.eventSubscriber = this.eventManager.subscribe('slipListModification', () => this.loadAll());
  }

  delete(slip: ISlip): void {
    const modalRef = this.modalService.open(SlipDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.slip = slip;
  }
}
