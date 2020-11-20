import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IContact } from 'app/shared/model/contact.model';
import { ContactService } from './contact.service';
import { ContactDeleteDialogComponent } from './contact-delete-dialog.component';

@Component({
  selector: 'jhi-contact',
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit, OnDestroy {
  contacts?: IContact[];
  eventSubscriber?: Subscription;

  constructor(protected contactService: ContactService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.contactService.query().subscribe((res: HttpResponse<IContact[]>) => (this.contacts = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInContacts();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IContact): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInContacts(): void {
    this.eventSubscriber = this.eventManager.subscribe('contactListModification', () => this.loadAll());
  }

  delete(contact: IContact): void {
    const modalRef = this.modalService.open(ContactDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.contact = contact;
  }
}
