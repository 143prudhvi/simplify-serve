import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SimplifyServeTestModule } from '../../../test.module';
import { VillageUpdateComponent } from 'app/entities/village/village-update.component';
import { VillageService } from 'app/entities/village/village.service';
import { Village } from 'app/shared/model/village.model';

describe('Component Tests', () => {
  describe('Village Management Update Component', () => {
    let comp: VillageUpdateComponent;
    let fixture: ComponentFixture<VillageUpdateComponent>;
    let service: VillageService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SimplifyServeTestModule],
        declarations: [VillageUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(VillageUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VillageUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VillageService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Village(123);
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
        const entity = new Village();
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
