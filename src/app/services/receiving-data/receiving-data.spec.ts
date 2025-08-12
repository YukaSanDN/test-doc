import { TestBed } from '@angular/core/testing';

import { ReceivingData } from './receiving-data';

describe('ReceivingData', () => {
  let service: ReceivingData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceivingData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
