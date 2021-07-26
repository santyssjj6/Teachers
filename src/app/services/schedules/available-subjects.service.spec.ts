import { TestBed } from '@angular/core/testing';

import { AvailableSubjectsService } from './available-subjects.service';

describe('AvailableSubjectsService', () => {
  let service: AvailableSubjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableSubjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
