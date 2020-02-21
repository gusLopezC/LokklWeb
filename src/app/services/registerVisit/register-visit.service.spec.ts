import { TestBed } from '@angular/core/testing';

import { RegisterVisitService } from './register-visit.service';

describe('RegisterVisitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterVisitService = TestBed.get(RegisterVisitService);
    expect(service).toBeTruthy();
  });
});
