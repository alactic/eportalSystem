import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintFeesComponent } from './print-fees.component';

describe('PrintFeesComponent', () => {
  let component: PrintFeesComponent;
  let fixture: ComponentFixture<PrintFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
