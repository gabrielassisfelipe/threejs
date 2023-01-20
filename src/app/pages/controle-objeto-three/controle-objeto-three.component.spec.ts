import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleObjetoThreeComponent } from './controle-objeto-three.component';

describe('ControleObjetoThreeComponent', () => {
  let component: ControleObjetoThreeComponent;
  let fixture: ComponentFixture<ControleObjetoThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControleObjetoThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleObjetoThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
