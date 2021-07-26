import { TestBed } from '@angular/core/testing';

import { UpdateScoresService } from './update-scores.service';

describe('UpdateScoresService', () => {
  let service: UpdateScoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateScoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
