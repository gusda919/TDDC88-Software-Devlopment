import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdineringComponent } from './ordinering.component';

describe('OrdineringComponent', () => {
  let component: OrdineringComponent;
  let fixture: ComponentFixture<OrdineringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdineringComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdineringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
