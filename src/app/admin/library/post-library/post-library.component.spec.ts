import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLibraryComponent } from './post-library.component';

describe('PostLibraryComponent', () => {
  let component: PostLibraryComponent;
  let fixture: ComponentFixture<PostLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
