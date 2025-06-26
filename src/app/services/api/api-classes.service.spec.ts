import { TestBed } from '@angular/core/testing';

import { ApiClassesService } from './api-classes.service';

describe('ApiClassesService', () => {
  let service: ApiClassesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiClassesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
