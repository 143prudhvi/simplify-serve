import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SimplifyServeTestModule } from '../../../test.module';
import { VillageDetailComponent } from 'app/entities/village/village-detail.component';
import { Village } from 'app/shared/model/village.model';

describe('Component Tests', () => {
  describe('Village Management Detail Component', () => {
    let comp: VillageDetailComponent;
    let fixture: ComponentFixture<VillageDetailComponent>;
    const route = ({ data: of({ village: new Village(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SimplifyServeTestModule],
        declarations: [VillageDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(VillageDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(VillageDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load village on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.village).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
