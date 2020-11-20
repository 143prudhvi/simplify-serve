import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SimplifyServeTestModule } from '../../../test.module';
import { TbgrUpdateComponent } from 'app/entities/tbgr/tbgr-update.component';
import { TbgrService } from 'app/entities/tbgr/tbgr.service';
import { Tbgr } from 'app/shared/model/tbgr.model';

describe('Component Tests', () => {
  describe('Tbgr Management Update Component', () => {
    let comp: TbgrUpdateComponent;
    let fixture: ComponentFixture<TbgrUpdateComponent>;
    let service: TbgrService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SimplifyServeTestModule],
        declarations: [TbgrUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(TbgrUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TbgrUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TbgrService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tbgr(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tbgr();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
