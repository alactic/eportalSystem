import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFacultyComponent } from './add-faculty.component';

describe('AddFacultyComponent', () => {
  let component: AddFacultyComponent;
  let fixture: ComponentFixture<AddFacultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFacultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
