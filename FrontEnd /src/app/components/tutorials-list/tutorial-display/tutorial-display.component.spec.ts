import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialDisplayComponent } from './tutorial-display.component';

describe('TutorialDisplayComponent', () => {
  let component: TutorialDisplayComponent;
  let fixture: ComponentFixture<TutorialDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
