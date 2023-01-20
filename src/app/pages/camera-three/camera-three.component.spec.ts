import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraThreeComponent } from './camera-three.component';

describe('CameraThreeComponent', () => {
  let component: CameraThreeComponent;
  let fixture: ComponentFixture<CameraThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
