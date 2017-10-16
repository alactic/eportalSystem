import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCoursesComponent } from './print-courses.component';

describe('PrintCoursesComponent', () => {
  let component: PrintCoursesComponent;
  let fixture: ComponentFixture<PrintCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
