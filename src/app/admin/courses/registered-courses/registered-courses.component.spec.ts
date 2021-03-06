import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredCoursesComponent } from './registered-courses.component';

describe('RegisteredCoursesComponent', () => {
  let component: RegisteredCoursesComponent;
  let fixture: ComponentFixture<RegisteredCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteredCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
