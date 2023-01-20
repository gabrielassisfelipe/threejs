import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontarBlocosThreeComponent } from './montar-blocos-three.component';

describe('MontarBlocosThreeComponent', () => {
  let component: MontarBlocosThreeComponent;
  let fixture: ComponentFixture<MontarBlocosThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontarBlocosThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontarBlocosThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
