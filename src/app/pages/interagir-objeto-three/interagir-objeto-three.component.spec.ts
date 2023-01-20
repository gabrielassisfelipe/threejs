import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteragirObjetoThreeComponent } from './interagir-objeto-three.component';

describe('InteragirObjetoThreeComponent', () => {
  let component: InteragirObjetoThreeComponent;
  let fixture: ComponentFixture<InteragirObjetoThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteragirObjetoThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InteragirObjetoThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
