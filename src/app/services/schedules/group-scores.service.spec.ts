import { TestBed } from '@angular/core/testing';

import { GroupScoresService } from './group-scores.service';

describe('GroupScoresService', () => {
  let service: GroupScoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupScoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
