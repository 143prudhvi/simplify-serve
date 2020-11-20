import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVillage } from 'app/shared/model/village.model';
import { VillageService } from './village.service';
import { VillageDeleteDialogComponent } from './village-delete-dialog.component';

@Component({
  selector: 'jhi-village',
  templateUrl: './village.component.html',
})
export class VillageComponent implements OnInit, OnDestroy {
  villages?: IVillage[];
  eventSubscriber?: Subscription;

  constructor(protected villageService: VillageService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.villageService.query().subscribe((res: HttpResponse<IVillage[]>) => (this.villages = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVillages();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVillage): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVillages(): void {
    this.eventSubscriber = this.eventManager.subscribe('villageListModification', () => this.loadAll());
  }

  delete(village: IVillage): void {
    const modalRef = this.modalService.open(VillageDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.village = village;
  }
}
