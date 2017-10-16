import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignmentComponent } from './student-assignment.component';

describe('StudentAssignmentComponent', () => {
  let component: StudentAssignmentComponent;
  let fixture: ComponentFixture<StudentAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
