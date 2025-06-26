import { TestBed } from '@angular/core/testing';

import { SectionExporterService } from './section-exporter.service';

describe('SectionExporterService', () => {
  let service: SectionExporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionExporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
