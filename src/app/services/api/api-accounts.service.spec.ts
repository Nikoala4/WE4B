import { TestBed } from '@angular/core/testing';

import { ApiAccountsService } from './api-accounts.service';

describe('ApiAccountsService', () => {
  let service: ApiAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
