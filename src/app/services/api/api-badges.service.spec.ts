import { TestBed } from '@angular/core/testing';

import { ApiBadgesService } from './api-badges.service';

describe('ApiBadgesService', () => {
  let service: ApiBadgesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBadgesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
