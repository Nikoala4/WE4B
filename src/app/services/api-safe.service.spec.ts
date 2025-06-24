import { TestBed } from '@angular/core/testing';

import { ApiSafeService } from './api-safe.service';

describe('ApiSafeService', () => {
  let service: ApiSafeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSafeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
