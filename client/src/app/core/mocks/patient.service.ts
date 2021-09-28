import { Injectable } from '@angular/core';
import { Patient } from './patient';

let mock_patients = require('./emergency_room_test_data');

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor() { }

  getUsers(): Patient[] {
    return mock_patients;
  }

  getUser(ssn: string): Patient {
    return mock_patients.find((patient: Patient) => patient.ssn === ssn);
  }
}
