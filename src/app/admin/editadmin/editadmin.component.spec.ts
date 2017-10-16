import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditportalComponent } from './editadmin.component';

describe('EditportalComponent', () => {
  let component: EditportalComponent;
  let fixture: ComponentFixture<EditportalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditportalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
