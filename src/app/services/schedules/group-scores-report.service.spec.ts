import { TestBed } from '@angular/core/testing';

import { GroupScoresReportService } from './group-scores-report.service';

describe('GroupScoresReportService', () => {
  let service: GroupScoresReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupScoresReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
