import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalWidgetComponent } from './journal-widget.component';

describe('JournalWidgetComponent', () => {
  let component: JournalWidgetComponent;
  let fixture: ComponentFixture<JournalWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
