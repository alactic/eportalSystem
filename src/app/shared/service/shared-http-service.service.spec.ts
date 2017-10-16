import { TestBed, inject } from '@angular/core/testing';

import { SharedHttpServiceService } from './shared-http-service.service';

describe('SharedHttpServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedHttpServiceService]
    });
  });

  it('should be created', inject([SharedHttpServiceService], (service: SharedHttpServiceService) => {
    expect(service).toBeTruthy();
  }));
});
