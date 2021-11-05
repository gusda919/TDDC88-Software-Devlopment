import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VitalParameters } from 'src/app/shared/models/patient';

import { PatientService } from '../../../../core/services/patient.service'

@Component({
  selector: 'app-vpbox',
  templateUrl: './vpbox.component.html',
  styleUrls: ['./vpbox.component.scss'],
})

export class VpboxComponent implements OnInit {

  isLoaded = false;
  isBloodOxygenDisplayed = false;
  isPulseDisplayed = false;
  isBloodPressureDisplayed = false;
  isBodyTemperatureDisplayed = false;
  isRespiratoryRateDisplayed = false;
  patientId = "198605119885";
  vitalParameters: VitalParameters;

  constructor(private patientService: PatientService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getVitalParameters();
    
  }

  getVitalParameters() {
    this.patientService.getPatientVitalparameters(this.patientId).subscribe((vitalParameters: VitalParameters) => {
      this.vitalParameters = vitalParameters;
      this.isLoaded = true;
      this.cdr.detectChanges();
    });
  }


  //Get functions for displaying the latest value for each vital parameter
  getLatestBloodOxygenLevel() {
    let data = this.vitalParameters.bloodOxygenLevel.data;
    return data[data.length-1].value;
  }

  getLatestPulse() {
    let data = this.vitalParameters.pulse.data;
    return data[data.length-1].value;
  }

  getLatestBloodPressure() {
    let data = this.vitalParameters.bloodPressure.data;
    return data[data.length-1].systolic + "/" + data[data.length-1].diastolic;
  }

  getLatestBodyTemperature() {
    let data = this.vitalParameters.bodyTemperature.data;
    return data[data.length-1].value;
  }

  getLatestRespiratoryRate() {
    let data = this.vitalParameters.respiratoryRate.data;
    return data[data.length-1].value;
  }



  //Toggle functions for displaying graphs
  toggleBloodOxygenGraph() {
    this.isBloodOxygenDisplayed = !this.isBloodOxygenDisplayed;
  }

  togglePulseGraph() {
    this.isPulseDisplayed = !this.isPulseDisplayed;
  }

  toggleBloodPressureGraph() {
    this.isBloodPressureDisplayed = !this.isBloodPressureDisplayed;
  }

  toggleBodyTemperatureGraph() {
    this.isBodyTemperatureDisplayed = !this.isBodyTemperatureDisplayed;
  }

  toggleRespiratoryRateGraph() {
    this.isRespiratoryRateDisplayed = !this.isRespiratoryRateDisplayed;
  }

}
