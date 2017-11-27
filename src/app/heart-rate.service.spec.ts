import { TestBed, inject } from '@angular/core/testing';

import { HeartRateService } from './heart-rate.service';

describe('HeartRateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeartRateService]
    });
  });

  it('should be created', inject([HeartRateService], (service: HeartRateService) => {
    expect(service).toBeTruthy();
  }));
});
