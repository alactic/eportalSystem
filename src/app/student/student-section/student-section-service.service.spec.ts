import { TestBed, inject } from '@angular/core/testing';

import { StudentSectionServiceService } from './student-section-service.service';

describe('StudentSectionServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentSectionServiceService]
    });
  });

  it('should be created', inject([StudentSectionServiceService], (service: StudentSectionServiceService) => {
    expect(service).toBeTruthy();
  }));
});
