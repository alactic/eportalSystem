import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetSchoolfeesComponent } from './set-schoolfees.component';

describe('SetSchoolfeesComponent', () => {
  let component: SetSchoolfeesComponent;
  let fixture: ComponentFixture<SetSchoolfeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetSchoolfeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetSchoolfeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
