import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SimplifyServeTestModule } from '../../../test.module';
import { TbgrComponent } from 'app/entities/tbgr/tbgr.component';
import { TbgrService } from 'app/entities/tbgr/tbgr.service';
import { Tbgr } from 'app/shared/model/tbgr.model';

describe('Component Tests', () => {
  describe('Tbgr Management Component', () => {
    let comp: TbgrComponent;
    let fixture: ComponentFixture<TbgrComponent>;
    let service: TbgrService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SimplifyServeTestModule],
        declarations: [TbgrComponent],
      })
        .overrideTemplate(TbgrComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TbgrComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TbgrService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Tbgr(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tbgrs && comp.tbgrs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
