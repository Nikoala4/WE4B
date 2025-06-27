import { TestBed } from '@angular/core/testing';

import { CookiesService } from '../services/cookies.service';

describe('CookiesService', () => {
  let service: CookiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
