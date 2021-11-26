import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { VitalParameters } from 'src/app/shared/models/patient';
import { faHeartbeat, faLungs, faThermometer, faTint, faProcedures, faFirstAid } from '@fortawesome/free-solid-svg-icons';

import { PatientService } from '../../../../core/services/patient.service'
import { FOCUS_TRAP_INERT_STRATEGY } from '@angular/cdk/a11y';

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
  faTint = faTint;
  faProcedures = faProcedures;
  faFirstAid = faFirstAid;

  isBloodOxygenDisplayed = true;
  isBloodPressureAndPulseDisplayed = true;
  isBodyTemperatureDisplayed = false;
  isRespiratoryRateDisplayed = false;
  isFluidBalanceDisplayed = false;

  one = "";
  two = "";
  three = "";
  four = "";
  five = "";


  firstGraph = "oxygen";
  secondGraph = "pressure";
 
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


  graphToggler() {
   // firstGraph = "oxygen";
    //secondGraph = "pressure";
    if(this.firstGraph === "oxygen" || this.secondGraph === "oxygen") {
      this.isBloodOxygenDisplayed = true;
    }
    if(this.firstGraph === "pressure" || this.secondGraph === "pressure") {
      this.isBloodPressureAndPulseDisplayed = true;
    }
    if(this.firstGraph === "temp" || this.secondGraph === "temp") {
      this.isBodyTemperatureDisplayed = true;
    }
    if(this.firstGraph === "resp" || this.secondGraph === "resp") {
      this.isRespiratoryRateDisplayed = true;
    }
    if(this.firstGraph === "fluid" || this.secondGraph === "fluid") {
      this.isFluidBalanceDisplayed = true;
    }
  }



  //Toggle functions for displaying graphs
  toggleBloodOxygenGraph() {
    if(!this.isBloodOxygenDisplayed) {
      this.checkIfAnyGraphIsToggled();
    }
    //this.isBloodOxygenDisplayed = !this.isBloodOxygenDisplayed;*/

    //this.isBloodOxygenDisplayed = true;
    //this.checkIfAnyGraphIsToggled()
    this.secondGraph = this.firstGraph;
    this.firstGraph = "oxygen";
    this.graphToggler()
  }


  toggleBloodPressureAndPulseGraph() {
    if(!this.isBloodPressureAndPulseDisplayed) {
      this.checkIfAnyGraphIsToggled();
    }
  //  this.isBloodPressureAndPulseDisplayed = !this.isBloodPressureAndPulseDisplayed;*/

    //this.isBloodPressureAndPulseDisplayed = true;
    //this.checkIfAnyGraphIsToggled()

    this.secondGraph = this.firstGraph;
    this.firstGraph = "pressure";
    this.graphToggler()

  }

  toggleBodyTemperatureGraph() {
    if(!this.isBodyTemperatureDisplayed) {
      this.checkIfAnyGraphIsToggled();
    }
   // this.isBodyTemperatureDisplayed = !this.isBodyTemperatureDisplayed;*/

  //  this.isBodyTemperatureDisplayed = true;
   // this.checkIfAnyGraphIsToggled()

    this.secondGraph = this.firstGraph;
    this.firstGraph = "temp";
    this.graphToggler()

  }

  toggleRespiratoryRateGraph() {
    if(!this.isRespiratoryRateDisplayed) {
      this.checkIfAnyGraphIsToggled();
    }
    //this.isRespiratoryRateDisplayed = !this.isRespiratoryRateDisplayed;*/

//this.isRespiratoryRateDisplayed = true;
//this.checkIfAnyGraphIsToggled()

    this.secondGraph = this.firstGraph;
    this.firstGraph = "resp";
    this.graphToggler()

  }

  toggleFluidBalance() {
    if(!this.isFluidBalanceDisplayed) {
      this.checkIfAnyGraphIsToggled();
    }
    //this.isFluidBalanceDisplayed = !this.isFluidBalanceDisplayed;*/

    //this.isFluidBalanceDisplayed = true;
    //this.checkIfAnyGraphIsToggled()

    this.secondGraph = this.firstGraph;
    this.firstGraph = "fluid";
    this.graphToggler()

  }
  
  checkIfAnyGraphIsToggled() {
    if(this.isBloodOxygenDisplayed || 
      this.isBloodPressureAndPulseDisplayed || 
      this.isBodyTemperatureDisplayed || 
      this.isRespiratoryRateDisplayed ||
      this.isFluidBalanceDisplayed) {
        this.isBloodOxygenDisplayed = false;
        this.isBloodPressureAndPulseDisplayed = false;
        this.isBodyTemperatureDisplayed = false;
        this.isRespiratoryRateDisplayed = false;
        this.isFluidBalanceDisplayed = false;
    }
  }
}
