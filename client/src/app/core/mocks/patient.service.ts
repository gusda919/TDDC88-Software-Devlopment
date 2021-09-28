import { Injectable } from '@angular/core';
import { Patient } from './patient';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private mockPatients: Patient[] = [];
  private _jsonUrl = '/emergency_room_test_data.json';

  constructor(private http: HttpClient) { 
  
  }

  getPatients(): Patient[] {
    return this.mockPatients;
  }

}
