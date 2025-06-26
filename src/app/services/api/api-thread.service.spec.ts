import { TestBed } from '@angular/core/testing';

import { ApiThreadService } from './api-thread.service';

describe('ApiThreadService', () => {
  let service: ApiThreadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiThreadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
