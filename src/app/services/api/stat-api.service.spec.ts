import { TestBed } from '@angular/core/testing';

import { StatAPIService } from './stat-api.service';

describe('StatAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatAPIService = TestBed.get(StatAPIService);
    expect(service).toBeTruthy();
  });
});
