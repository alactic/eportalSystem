import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQuestionComponent } from './student-question.component';

describe('StudentQuestionComponent', () => {
  let component: StudentQuestionComponent;
  let fixture: ComponentFixture<StudentQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
