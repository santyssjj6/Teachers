import { TestBed } from '@angular/core/testing';

import { ProgramateService } from './programate.service';

describe('ProgramateService', () => {
  let service: ProgramateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
