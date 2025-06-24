import { TestBed } from '@angular/core/testing';

import { ApiActivitiesService } from './api-activities.service';

describe('ApiActivitiesService', () => {
  let service: ApiActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
