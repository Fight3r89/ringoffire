import { TestBed } from '@angular/core/testing';

import { RingOfFireService } from './ring-of-fire.service';

describe('RingOfFireService', () => {
  let service: RingOfFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RingOfFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
