import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient} from '@angular/common/http';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.get(HttpTestingController);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
