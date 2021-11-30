import { TestBed } from '@angular/core/testing';

import { PatientService } from './patient.service';

import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient} from '@angular/common/http';

describe('PatientService', () => {
  let service: PatientService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.inject(PatientService);
    httpMock = TestBed.get(HttpTestingController);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
