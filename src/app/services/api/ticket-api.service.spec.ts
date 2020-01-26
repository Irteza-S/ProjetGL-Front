import { TestBed } from '@angular/core/testing';

import { TicketAPIService } from './ticket-api.service';

describe('TicketAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TicketAPIService = TestBed.get(TicketAPIService);
    expect(service).toBeTruthy();
  });
});
