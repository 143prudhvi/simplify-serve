import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGrade, Grade } from 'app/shared/model/grade.model';
import { GradeService } from './grade.service';

@Component({
  selector: 'jhi-grade-update',
  templateUrl: './grade-update.component.html',
})
export class GradeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    grade: [],
  });

  constructor(protected gradeService: GradeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ grade }) => {
      this.updateForm(grade);
    });
  }

  updateForm(grade: IGrade): void {
    this.editForm.patchValue({
      id: grade.id,
      grade: grade.grade,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const grade = this.createFromForm();
    if (grade.id !== undefined) {
      this.subscribeToSaveResponse(this.gradeService.update(grade));
    } else {
      this.subscribeToSaveResponse(this.gradeService.create(grade));
    }
  }

  private createFromForm(): IGrade {
    return {
      ...new Grade(),
      id: this.editForm.get(['id'])!.value,
      grade: this.editForm.get(['grade'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrade>>): void {
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
