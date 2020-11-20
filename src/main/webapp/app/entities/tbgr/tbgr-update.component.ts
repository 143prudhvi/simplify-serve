import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITbgr, Tbgr } from 'app/shared/model/tbgr.model';
import { TbgrService } from './tbgr.service';

@Component({
  selector: 'jhi-tbgr-update',
  templateUrl: './tbgr-update.component.html',
})
export class TbgrUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    board: [],
    village: [],
    tbgr: [],
    name: [],
  });

  constructor(protected tbgrService: TbgrService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tbgr }) => {
      this.updateForm(tbgr);
    });
  }

  updateForm(tbgr: ITbgr): void {
    this.editForm.patchValue({
      id: tbgr.id,
      board: tbgr.board,
      village: tbgr.village,
      tbgr: tbgr.tbgr,
      name: tbgr.name,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tbgr = this.createFromForm();
    if (tbgr.id !== undefined) {
      this.subscribeToSaveResponse(this.tbgrService.update(tbgr));
    } else {
      this.subscribeToSaveResponse(this.tbgrService.create(tbgr));
    }
  }

  private createFromForm(): ITbgr {
    return {
      ...new Tbgr(),
      id: this.editForm.get(['id'])!.value,
      board: this.editForm.get(['board'])!.value,
      village: this.editForm.get(['village'])!.value,
      tbgr: this.editForm.get(['tbgr'])!.value,
      name: this.editForm.get(['name'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITbgr>>): void {
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
