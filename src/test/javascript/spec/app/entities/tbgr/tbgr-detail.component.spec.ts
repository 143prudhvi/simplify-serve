import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SimplifyServeTestModule } from '../../../test.module';
import { TbgrDetailComponent } from 'app/entities/tbgr/tbgr-detail.component';
import { Tbgr } from 'app/shared/model/tbgr.model';

describe('Component Tests', () => {
  describe('Tbgr Management Detail Component', () => {
    let comp: TbgrDetailComponent;
    let fixture: ComponentFixture<TbgrDetailComponent>;
    const route = ({ data: of({ tbgr: new Tbgr(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SimplifyServeTestModule],
        declarations: [TbgrDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(TbgrDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TbgrDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load tbgr on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tbgr).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
