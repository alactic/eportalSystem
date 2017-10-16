import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureNoteViewComponent } from './lecture-note-view.component';

describe('LectureNoteViewComponent', () => {
  let component: LectureNoteViewComponent;
  let fixture: ComponentFixture<LectureNoteViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureNoteViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureNoteViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
