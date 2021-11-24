import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { VitalParameters } from 'src/app/shared/models/patient';
import { faHeartbeat, faLungs, faThermometer, faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { Lab } from 'src/app/shared/models/patient';

import { PatientService } from '../../../../core/services/patient.service'

@Component({
  selector: 'app-vpbox',
  templateUrl: './vpbox.component.html',
  styleUrls: ['./vpbox.component.scss'],
})

export class VpboxComponent implements OnInit {

  @Input()
  patientId: string;

  isLoaded = false;
  faHeartbeat = faHeartbeat;
  faLungs = faLungs;
  faThermometer = faThermometer;
  faMicroscope  = faMicroscope ;

  isBloodOxygenDisplayed = false;
  isBloodPressureAndPulseDisplayed = false;
  isBodyTemperatureDisplayed = false;
  isRespiratoryRateDisplayed = false;
  isLabsDisplayed = false;
 
  vitalParameters: VitalParameters;
  labs: Lab[];

  constructor(private patientService: PatientService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getVitalParameters();
    this.getPatientLabs();
  }

  getVitalParameters() {
    this.patientService.getPatientVitalparameters(this.patientId).subscribe((vitalParameters: VitalParameters) => {
      this.vitalParameters = vitalParameters;
      this.isLoaded = true;
      this.cdr.detectChanges();
    });
  }
 
  getPatientLabs() {
    this.patientService.getPatientLabs(this.patientId).subscribe((labs: Lab[]) => {      
      this.labs = labs;
      this.isLoaded = true;
      this.cdr.detectChanges();;    
    });
  }

  //Get functions for displaying the latest value for each vital parameter
  getLatestBloodOxygenLevel() {
    let data = this.vitalParameters.bloodOxygenLevel.data;
    return data[data.length-1];
  }

  getLatestPulse() {
    let data = this.vitalParameters.pulse.data;
    return data[data.length-1];
  }

  getLatestBloodPressure() {
    let data = this.vitalParameters.bloodPressure.data;
    return data[data.length-1];
  }

  getLatestBodyTemperature() {
    let data = this.vitalParameters.bodyTemperature.data;
    return data[data.length-1];
  }

  getLatestRespiratoryRate() {
    let data = this.vitalParameters.respiratoryRate.data;
    return data[data.length-1];
  }
  
  getLatestLab() {
    

    let data = this.labs;
    return data[data.length-1];
  }



  //Toggle functions for displaying graphs
  toggleBloodOxygenGraph() {
    if(!this.isBloodOxygenDisplayed) {
      this.checkIfAnyGraphIsToggled();
    }
    this.isBloodOxygenDisplayed = !this.isBloodOxygenDisplayed;
  }


  toggleBloodPressureAndPulseGraph() {
    if(!this.isBloodPressureAndPulseDisplayed) {
      this.checkIfAnyGraphIsToggled();
    }
    this.isBloodPressureAndPulseDisplayed = !this.isBloodPressureAndPulseDisplayed;
  }

  toggleBodyTemperatureGraph() {
    if(!this.isBodyTemperatureDisplayed) {
      this.checkIfAnyGraphIsToggled();
    }
    this.isBodyTemperatureDisplayed = !this.isBodyTemperatureDisplayed;
  }

  toggleRespiratoryRateGraph() {
    if(!this.isRespiratoryRateDisplayed) {
      this.checkIfAnyGraphIsToggled();
    }
    this.isRespiratoryRateDisplayed = !this.isRespiratoryRateDisplayed;
  }
  toggleLabs() {
    if(!this.isLabsDisplayed) {
      this.checkIfAnyGraphIsToggled();
    }
    this.isLabsDisplayed = ! this.isLabsDisplayed;
  }
  checkIfAnyGraphIsToggled() {
    if(this.isBloodOxygenDisplayed || 
      this.isBloodPressureAndPulseDisplayed || 
      this.isBodyTemperatureDisplayed || 
      this.isRespiratoryRateDisplayed|| 
      this.isLabsDisplayed) {
        this.isBloodOxygenDisplayed = false;
        this.isBloodPressureAndPulseDisplayed = false;
        this.isBodyTemperatureDisplayed = false;
        this.isRespiratoryRateDisplayed = false;
        this.isLabsDisplayed = false;
    }
  }
}
