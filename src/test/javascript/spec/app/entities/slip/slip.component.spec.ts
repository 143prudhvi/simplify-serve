import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SimplifyServeTestModule } from '../../../test.module';
import { SlipComponent } from 'app/entities/slip/slip.component';
import { SlipService } from 'app/entities/slip/slip.service';
import { Slip } from 'app/shared/model/slip.model';

describe('Component Tests', () => {
  describe('Slip Management Component', () => {
    let comp: SlipComponent;
    let fixture: ComponentFixture<SlipComponent>;
    let service: SlipService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SimplifyServeTestModule],
        declarations: [SlipComponent],
      })
        .overrideTemplate(SlipComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SlipComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SlipService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Slip(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.slips && comp.slips[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
