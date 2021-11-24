import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpboxComponent } from './vpbox.component';

describe('VpboxComponent', () => {
  let component: VpboxComponent;
  let fixture: ComponentFixture<VpboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VpboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VpboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
