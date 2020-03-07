import { TestBed } from '@angular/core/testing';

import { AjoutBaseAPIService } from './ajout-base-api.service';

describe('AjoutBaseAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AjoutBaseAPIService = TestBed.get(AjoutBaseAPIService);
    expect(service).toBeTruthy();
  });
});
