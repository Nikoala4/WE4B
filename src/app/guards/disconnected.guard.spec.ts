import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { disconnectedGuard } from './disconnected.guard';

describe('disconnectedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => disconnectedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
