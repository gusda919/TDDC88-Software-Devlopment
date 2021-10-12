import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient, Lab } from '../../shared/models/patient';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'http://localhost:8080/patients/';

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    // returns overview attributes for all patients
    return this.http.get<Patient[]>(this.baseUrl);
  }

  getPatientLabs(patientID: string): Observable<Lab[]> {
    // returns all lab results for a specific patient
    return this.http.get<Lab[]>(this.baseUrl + patientID + '/labs')
  }

}
