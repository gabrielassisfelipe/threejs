import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GravidadeComponent } from './gravidade.component';

describe('GravidadeComponent', () => {
  let component: GravidadeComponent;
  let fixture: ComponentFixture<GravidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GravidadeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GravidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
