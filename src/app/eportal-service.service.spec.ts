import { TestBed, inject } from '@angular/core/testing';

import { EportalServiceService } from './eportal-service.service';

describe('EportalServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EportalServiceService]
    });
  });

  it('should be created', inject([EportalServiceService], (service: EportalServiceService) => {
    expect(service).toBeTruthy();
  }));
});
