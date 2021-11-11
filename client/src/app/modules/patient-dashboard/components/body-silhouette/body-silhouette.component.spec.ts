import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodySilhouetteComponent } from './body-silhouette.component';

describe('BodySilhouetteComponent', () => {
  let component: BodySilhouetteComponent;
  let fixture: ComponentFixture<BodySilhouetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodySilhouetteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BodySilhouetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
