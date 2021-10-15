import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient, Lab, VitalParameters, BloodPressure, BodyTemperature, BloodOxygenLevel, Drug, EntrancesAndExit, Caregiving } from '../../shared/models/patient';
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

  getPatientLabsDate(patientID: string, Date: String): Observable<Lab[]> {
    // returns all lab results for a specific patient at a specific date that is given
    return this.http.get<Lab[]>(this.baseUrl + patientID + '/labs/'+ Date)
  }

  getPatientDrugs(patientID: string): Observable<Drug[]> {
    // returns all prescriped drugs for a patient
    return this.http.get<Drug[]>(this.baseUrl + patientID + '/drugs')
  }

  getPatientEnrancesAndExits(patientID: string): Observable<EntrancesAndExit[]> {
    // returns all lab entrances and exits (Pocc-lines) for a specific patient
    return this.http.get<EntrancesAndExit[]>(this.baseUrl + patientID + '/entrancesAndExits')
  }

  getPatientCaregiving(patientID: string): Observable<Caregiving[]> {
    // returns all caregiving measures done for a specific patient
    return this.http.get<Caregiving[]>(this.baseUrl + patientID + '/caregiving')
  }



  //vital parameter services start here 
  getPatientVitalparameters(patientID: string): Observable<VitalParameters> {
    // returns all vitalparameters for a specifik patient 
    return this.http.get<VitalParameters>(this.baseUrl + patientID + '/vitalParameters')
  }

  getPatientBloodPressure(patientID: string): Observable<BloodPressure[]> {
    // returns data related to bloodpressure for a specific patient
    return this.http.get<BloodPressure[]>(this.baseUrl + patientID + '/bloodPressure')
  }

  getPatientBodyTemperature(patientID: string): Observable<BodyTemperature[]> {
    // returns data related to bodytemperature for a specific patient
    return this.http.get<BodyTemperature[]>(this.baseUrl + patientID + '/bodyTemperature')
  }

  getPatientBloodOxygenLevel(patientID: string): Observable<BloodOxygenLevel[]> {
    // returns data related to bloodOxygenLevels for a specific patient
    return this.http.get<BloodOxygenLevel[]>(this.baseUrl + patientID + '/bloodOxygenLevel')
  }

  getPatientPulse(patientID: string): Observable<Pulse[]> {
    // returns data related to pulse for a specific patient
    return this.http.get<Pulse[]>(this.baseUrl + patientID + '/pulse')
  }

  getPatientRespiratoryRate(patientID: string): Observable<RespiratoryRate[]> {
    // returns data related to respiratoryRate for a specific patient
    return this.http.get<RespiratoryRate[]>(this.baseUrl + patientID + '/respiratoryRate')
  }

  //vitalparameter services end here

}
