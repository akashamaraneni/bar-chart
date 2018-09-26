import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarDoubleComponent } from './bar-double.component';

describe('BarDoubleComponent', () => {
  let component: BarDoubleComponent;
  let fixture: ComponentFixture<BarDoubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarDoubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarDoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
