import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SimplifyServeTestModule } from '../../../test.module';
import { BoardComponent } from 'app/entities/board/board.component';
import { BoardService } from 'app/entities/board/board.service';
import { Board } from 'app/shared/model/board.model';

describe('Component Tests', () => {
  describe('Board Management Component', () => {
    let comp: BoardComponent;
    let fixture: ComponentFixture<BoardComponent>;
    let service: BoardService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SimplifyServeTestModule],
        declarations: [BoardComponent],
      })
        .overrideTemplate(BoardComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BoardComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BoardService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Board(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.boards && comp.boards[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
