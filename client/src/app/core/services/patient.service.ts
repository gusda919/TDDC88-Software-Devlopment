import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient, Lab, VitalParameters, BloodPressure, BodyTemperature, BloodOxygenLevel, Drug, EntrancesAndExit, Caregiving } from '../../shared/models/patient';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders( { 'Content-Type': 'application/json' } )
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'http://localhost:8080/patients/';

  constructor(private http: HttpClient) { }


  /*
  Services for all available backend routes. 
  Each service species what data is returned and eventual input parameters. 

  importing PatientService from this file and adding it as a provider in the constructor
  (e.g. "private patientService: PatientService" )
  then allows you to access all these services using this.patientService.<service name>
  in order to subscribe to the service and access corresponding data
 
  NOTE: not all patients have data for every service
  */


  //Service for getting overview attributes for all patients
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);
  }

  getPatient(patientID: string): Observable<Patient> {
    return this.http.get<any>(this.baseUrl + patientID);
  }

  // Service for getting the contact reason for the patient with person number "patientID" 
  getPatientCosmicContactReason(patientID: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + patientID + '/cosmic' + '/contactreason');
  }

  // Service for getting the current health problem for the patient with person number "patientID"
  getPatientCosmicHealthProblem(patientID: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + patientID + '/cosmic' + '/healthproblem');
  }

  // Service for getting the current assessment for the patient with person number "patientID"
  getPatientCosmicAssessment(patientID: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + patientID + '/cosmic' + '/assessment');
  }

 // Service for getting the current diagnosis for the patient with person number "patientID"
 getPatientCosmicDiagnosis(patientID: string): Observable<any> {
  return this.http.get<any>( this.baseUrl + patientID + '/cosmic' + '/diagnosis');
 }

  // Service for getting the current taken measures for the patient with person number "patientID"
  getPatientCosmicTakenMeasures(patientID: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + patientID + '/cosmic' + '/takenmeasures');
  }

  // Service for getting the current general condition for the patient with person number "patientID"
  getPatientCosmicGeneralCondition(patientID: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + patientID + '/cosmic' + '/Allmäntillstånd');
  }

  // Service for getting the current heart information for the patient with person number "patientID"
  getPatientCosmicHeart(patientID: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + patientID + '/cosmic' + '/Hjärta');
  }

  // Service for getting the current heart information for the patient with person number "patientID"
  getPatientCosmicBloodPressure(patientID: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + patientID + '/cosmic' + '/Blodtryck');
  }

  // Service for getting the current blood pressure for the patient with person number "patientID"
  getPatientCosmicPulse(patientID: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + patientID + '/cosmic' + '/Puls');
  }

  // Service for getting the current lower extremities information for the patient with person number "patientID"
  getPatientCosmicLowerExtremity(patientID: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + patientID + '/cosmic' + '/Nedre%20extremitet');
  }

  // Service for getting the current examination results for the patient with person number "patientID"
  getPatientCosmicExaminationResults(patientID: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + patientID + '/cosmic' + '/Undersökningsresultat');
  }

  //getPatientContagious(patientID: string)
  getPatientContagious(patientID: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + patientID + '/contagious');
  }

  //getPatientNewECG(patientID: string)
  getPatientNewECG(patientID: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + patientID + '/newECG');
  }

  //getPatientNewXray(patientID: string)
  getPatientNewXray(patientID: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + patientID + '/newXray');
  }

  setPatientNoNewECG(patientID: string): Observable<any> {
    console.log("!!!!!!!!!!!!!!!!")
    return this.http.put<any>( this.baseUrl + patientID, 'newecg: "false"', httpOptions);  
  }

  setPatientNoNewECG2(patientID: string): Observable<any> {
    console.log("!!!!!!!!!!!!!!!!")
    let pat: any = this.getPatient(patientID);
    pat.newECG = "false";
    return this.http.put<any>( this.baseUrl + patientID, pat, httpOptions);  
   }

  
  //Service for getting all the vital parameters for the patient with person number "patientID"
  getPatientVitalparameters(patientID: string): Observable<VitalParameters> {
    return this.http.get<VitalParameters>(this.baseUrl + patientID + '/vitalparameters');
  }
  
  //Service for getting the values of vital parameter "bloodOxygenLevel" for the patient with person number "patientID"
  getPatientVitalParameterBloodOxygenLevel(patientID: string): Observable<BloodOxygenLevel> {
    return this.http.get<BloodOxygenLevel>(this.baseUrl + patientID + '/vitalparameters' +'/bloodOxygenLevel');
  }

  //Service for getting the values of vital parameter "Pulse" for the patient with person number "patientID""
  getPatientVitalParameterPulse(patientID: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + patientID + '/vitalparameters' + '/pulse');
  }

  //Service for getting the values of vital parameter "BloodPressure" for the patient with person number "patientID"
  getPatientVitalParameterBloodPressure(patientID: string): Observable<BloodPressure> {
    return this.http.get<BloodPressure>(this.baseUrl + patientID + '/vitalparameters' + '/bloodPressure');
  }

  //Service for getting the values of vital parameter "BodyTemperature" for the patient with person number "patientID"
  getPatientVitalParameterBodyTemperature(patientID: string): Observable<BodyTemperature> {
    return this.http.get<BodyTemperature>(this.baseUrl + patientID + '/vitalparameters' + '/bodyTemperature');
  }

  //Service for getting the values of vital parameter "RespiratoryRate" for the patient with person number "patientID"
  getPatientVitalParameterRespiratoryRate(patientID: string): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + patientID + '/vitalparameters' + '/respiratoryRate');
  }

  //Service for getting all the lab tests for the patient with person number "patientID"
  getPatientLabs(patientID: string): Observable<Lab[]> {
    return this.http.get<Lab[]>(this.baseUrl + patientID + '/labs');
  }

  //Service for getting all the lab test for the patient with person number "patientID" based on a specific date "Date"
  getPatientLabsOnDate(patientID: string, Date: String): Observable<Lab[]> {
    return this.http.get<Lab[]>(this.baseUrl + patientID + '/labs/'+ Date);
  }

  //Service for getting all the drugs given to the patient with person number "patientID"
  getPatientDrugs(patientID: string): Observable<Drug[]> {
    return this.http.get<Drug[]>(this.baseUrl + patientID + '/drugs');
  }

  //Service for getting all the entrances and exits (picclines) for the patient with person number "patientID"
  getPatientEntrancesAndExits(patientID: string): Observable<EntrancesAndExit[]> {
    return this.http.get<EntrancesAndExit[]>(this.baseUrl + patientID + '/entrancesAndExits');
  }

  //Service for getting all the caregiving given to the patient with person number "patientID"
  getPatientCaregiving(patientID: string): Observable<Caregiving[]> {
    return this.http.get<Caregiving[]>(this.baseUrl + patientID + '/caregiving');
  }

}
