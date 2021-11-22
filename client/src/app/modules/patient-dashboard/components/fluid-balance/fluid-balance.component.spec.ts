import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FluidBalanceComponent } from './fluid-balance.component';

describe('FluidBalanceComponent', () => {
  let component: FluidBalanceComponent;
  let fixture: ComponentFixture<FluidBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FluidBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluidBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
