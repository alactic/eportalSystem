import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentSubmittedComponent } from './assignment-submitted.component';

describe('AssignmentSubmittedComponent', () => {
  let component: AssignmentSubmittedComponent;
  let fixture: ComponentFixture<AssignmentSubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentSubmittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
