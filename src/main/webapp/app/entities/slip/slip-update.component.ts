import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISlip, Slip } from 'app/shared/model/slip.model';
import { SlipService } from './slip.service';

@Component({
  selector: 'jhi-slip-update',
  templateUrl: './slip-update.component.html',
})
export class SlipUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    date: [],
    tbgr: [],
    grade: [],
    lotno: [],
    weight: [],
    price: [],
  });

  constructor(protected slipService: SlipService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ slip }) => {
      if (!slip.id) {
        const today = moment().startOf('day');
        slip.date = today;
      }

      this.updateForm(slip);
    });
  }

  updateForm(slip: ISlip): void {
    this.editForm.patchValue({
      id: slip.id,
      date: slip.date ? slip.date.format(DATE_TIME_FORMAT) : null,
      tbgr: slip.tbgr,
      grade: slip.grade,
      lotno: slip.lotno,
      weight: slip.weight,
      price: slip.price,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const slip = this.createFromForm();
    if (slip.id !== undefined) {
      this.subscribeToSaveResponse(this.slipService.update(slip));
    } else {
      this.subscribeToSaveResponse(this.slipService.create(slip));
    }
  }

  private createFromForm(): ISlip {
    return {
      ...new Slip(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      tbgr: this.editForm.get(['tbgr'])!.value,
      grade: this.editForm.get(['grade'])!.value,
      lotno: this.editForm.get(['lotno'])!.value,
      weight: this.editForm.get(['weight'])!.value,
      price: this.editForm.get(['price'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISlip>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
