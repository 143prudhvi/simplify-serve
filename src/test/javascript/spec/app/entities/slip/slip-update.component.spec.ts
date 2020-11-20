import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SimplifyServeTestModule } from '../../../test.module';
import { SlipUpdateComponent } from 'app/entities/slip/slip-update.component';
import { SlipService } from 'app/entities/slip/slip.service';
import { Slip } from 'app/shared/model/slip.model';

describe('Component Tests', () => {
  describe('Slip Management Update Component', () => {
    let comp: SlipUpdateComponent;
    let fixture: ComponentFixture<SlipUpdateComponent>;
    let service: SlipService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SimplifyServeTestModule],
        declarations: [SlipUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SlipUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SlipUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SlipService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Slip(123);
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
        const entity = new Slip();
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
