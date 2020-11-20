import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SimplifyServeTestModule } from '../../../test.module';
import { GradeDetailComponent } from 'app/entities/grade/grade-detail.component';
import { Grade } from 'app/shared/model/grade.model';

describe('Component Tests', () => {
  describe('Grade Management Detail Component', () => {
    let comp: GradeDetailComponent;
    let fixture: ComponentFixture<GradeDetailComponent>;
    const route = ({ data: of({ grade: new Grade(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SimplifyServeTestModule],
        declarations: [GradeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GradeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GradeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load grade on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.grade).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
