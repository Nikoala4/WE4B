import { TestBed } from '@angular/core/testing';

import { ApiDecorationsService } from './api-decorations.service';

describe('ApiDecorationsService', () => {
  let service: ApiDecorationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDecorationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
