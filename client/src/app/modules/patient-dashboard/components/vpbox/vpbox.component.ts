import { Component, OnInit } from '@angular/core';
import { VitalParameters } from 'src/app/shared/models/patient';

import { PatientService } from '../../../../core/services/patient.service'

@Component({
  selector: 'app-vpbox',
  templateUrl: './vpbox.component.html',
  styleUrls: ['./vpbox.component.scss'],
})

export class VpboxComponent implements OnInit {

  isLoaded = false;
  patientId = "195001232296";
  vitalParameters: VitalParameters;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.getVitalParameters();
    
  }

  getVitalParameters() {
    this.patientService.getPatientVitalparameters(this.patientId).subscribe((vitalParameters: VitalParameters) => {this.vitalParameters = vitalParameters, this.isLoaded = true, console.log(vitalParameters)});
  }

}
