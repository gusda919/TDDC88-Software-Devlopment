import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Patient } from '../../shared/models/patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'http://localhost:8080/patients/';

  constructor(private http: HttpClient) { }

  // getPatients(query: string): Observable<User[]> {
  //   return this.http.get<User[]>(this.baseUrl);
  // }

}
