import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignmentUploadComponent } from './student-assignment-upload.component';

describe('StudentAssignmentUploadComponent', () => {
  let component: StudentAssignmentUploadComponent;
  let fixture: ComponentFixture<StudentAssignmentUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssignmentUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssignmentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
