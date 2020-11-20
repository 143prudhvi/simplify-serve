import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SimplifyServeTestModule } from '../../../test.module';
import { SlipDetailComponent } from 'app/entities/slip/slip-detail.component';
import { Slip } from 'app/shared/model/slip.model';

describe('Component Tests', () => {
  describe('Slip Management Detail Component', () => {
    let comp: SlipDetailComponent;
    let fixture: ComponentFixture<SlipDetailComponent>;
    const route = ({ data: of({ slip: new Slip(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SimplifyServeTestModule],
        declarations: [SlipDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SlipDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SlipDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load slip on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.slip).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
