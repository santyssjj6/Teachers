import { TestBed } from '@angular/core/testing';

import { MyKardexService } from './my-kardex.service';

describe('MyKardexService', () => {
  let service: MyKardexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyKardexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
