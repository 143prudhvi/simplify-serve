import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { SimplifyServeTestModule } from '../../../test.module';
import { BoardUpdateComponent } from 'app/entities/board/board-update.component';
import { BoardService } from 'app/entities/board/board.service';
import { Board } from 'app/shared/model/board.model';

describe('Component Tests', () => {
  describe('Board Management Update Component', () => {
    let comp: BoardUpdateComponent;
    let fixture: ComponentFixture<BoardUpdateComponent>;
    let service: BoardService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SimplifyServeTestModule],
        declarations: [BoardUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BoardUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BoardUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BoardService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Board(123);
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
        const entity = new Board();
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
