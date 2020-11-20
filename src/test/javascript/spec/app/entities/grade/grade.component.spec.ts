import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SimplifyServeTestModule } from '../../../test.module';
import { GradeComponent } from 'app/entities/grade/grade.component';
import { GradeService } from 'app/entities/grade/grade.service';
import { Grade } from 'app/shared/model/grade.model';

describe('Component Tests', () => {
  describe('Grade Management Component', () => {
    let comp: GradeComponent;
    let fixture: ComponentFixture<GradeComponent>;
    let service: GradeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SimplifyServeTestModule],
        declarations: [GradeComponent],
      })
        .overrideTemplate(GradeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GradeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GradeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Grade(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.grades && comp.grades[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
