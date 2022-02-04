import { TestBed } from '@angular/core/testing';

import { LocalloginGuard } from './locallogin.guard';

describe('LocalloginGuard', () => {
  let guard: LocalloginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LocalloginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
