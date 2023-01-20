import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarObjetosThreeComponent } from './criar-objetos-three.component';

describe('CriarObjetosThreeComponent', () => {
  let component: CriarObjetosThreeComponent;
  let fixture: ComponentFixture<CriarObjetosThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarObjetosThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarObjetosThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
