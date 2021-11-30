import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntl} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { OverviewTableComponent } from './overview-table.component';

import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient} from '@angular/common/http';

describe('OverviewTableComponent', () => {
  let component: OverviewTableComponent;
  let fixture: ComponentFixture<OverviewTableComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpMock = TestBed.get(HttpTestingController);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
