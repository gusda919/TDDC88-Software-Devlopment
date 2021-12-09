import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { VitalParameters } from 'src/app/shared/models/patient';
import { faHeartbeat, faLungs, faThermometer, faTint, faProcedures, faFirstAid, faMicroscope } from '@fortawesome/free-solid-svg-icons';
import { Lab } from 'src/app/shared/models/patient';

import { PatientService } from '../../../../core/services/patient.service';

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
  faMicroscope  = faMicroscope;

  isBloodOxygenDisplayed = true;
  isBloodPressureAndPulseDisplayed = true;
  isBodyTemperatureDisplayed = false;
  isRespiratoryRateDisplayed = false;
  isFluidBalanceDisplayed = false;


  firstGraph = "oxygen";
  secondGraph = "pressure";
  
  bloodOxygenColor = "";
  pulseColor = "";
  bloodPressureColor = "";
  bodyTemperatureColor = "";
  respiratoryRateColor = "";
 
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
      this.setTriageColors();
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

  setTriageColors() {

    //Triage coloring for blood oxygen
    if (this.getLatestBloodOxygenLevel().value >= 95) {      
      this.bloodOxygenColor = "#4CAF50";
    } else if (this.getLatestBloodOxygenLevel().value >= 91 && this.getLatestBloodOxygenLevel().value <= 94) {
      this.bloodOxygenColor = "#FFEB3B";
    } else if (this.getLatestBloodOxygenLevel().value >= 88 && this.getLatestBloodOxygenLevel().value <= 90) {
      this.bloodOxygenColor = "#FF9800";
    } else if (this.getLatestBloodOxygenLevel().value >= 0  && this.getLatestBloodOxygenLevel().value <= 87) {
      this.bloodOxygenColor = "#F44336";
    }

    //Triage coloring for pulse
    if (this.getLatestPulse().value >= 50 && this.getLatestPulse().value <= 110) {      
      this.pulseColor = "#4CAF50";
    } else if ((this.getLatestPulse().value >= 111 && this.getLatestPulse().value <= 120) || (this.getLatestPulse().value >= 40 && this.getLatestPulse().value <= 49)) {
      this.pulseColor = "#FFEB3B";
    } else if (this.getLatestPulse().value >= 30 && this.getLatestPulse().value <= 39) {
      this.pulseColor = "#FF9800";
    } else if (this.getLatestPulse().value >= 0  && this.getLatestPulse().value <= 29) {
      this.pulseColor = "#F44336";
    }

    //Triage coloring for blood pressure
    if (this.getLatestBloodPressure().systolic >= 90) {      
      this.bloodPressureColor = "#4CAF50";
    } else if (this.getLatestBloodPressure().systolic >= 0  && this.getLatestBloodPressure().systolic <= 89) {
      this.bloodPressureColor = "#F44336";
    }

    //Triage coloring for body temperature
    if (this.getLatestBodyTemperature().value >= 35 && this.getLatestBodyTemperature().value <= 38.5) {
      this.bodyTemperatureColor = "#4CAF50";
    } else if (this.getLatestBodyTemperature().value >= 38.6 && this.getLatestBodyTemperature().value <= 41) {
      this.bodyTemperatureColor = "#FFEB3B";
    } else if (this.getLatestBodyTemperature().value > 41 || this.getLatestBodyTemperature().value < 35) {
      this.bodyTemperatureColor = "#FF9800";
    }

    //Triage coloring for respiratory rate
    if (this.getLatestRespiratoryRate().value >= 8 && this.getLatestRespiratoryRate().value <= 25) {
      this.respiratoryRateColor = "#4CAF50";
    } else if (this.getLatestRespiratoryRate().value >= 26 && this.getLatestRespiratoryRate().value <= 30) {
      this.respiratoryRateColor = "#FF9800";
    } else if ((this.getLatestRespiratoryRate().value >= 0 && this.getLatestRespiratoryRate().value <= 7) || this.getLatestRespiratoryRate().value > 30) {
      this.respiratoryRateColor = "#F44336";
    }

  }




  graphToggler() {
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
    this.secondGraph = this.firstGraph;
    this.firstGraph = "oxygen";
    this.graphToggler()
  }


  toggleBloodPressureAndPulseGraph() {
    if(!this.isBloodPressureAndPulseDisplayed) {
      this.checkIfAnyGraphIsToggled();
    }

    this.secondGraph = this.firstGraph;
    this.firstGraph = "pressure";
    this.graphToggler()

  }

  toggleBodyTemperatureGraph() {
    if(!this.isBodyTemperatureDisplayed) {
      this.checkIfAnyGraphIsToggled();
    }

    this.secondGraph = this.firstGraph;
    this.firstGraph = "temp";
    this.graphToggler()

  }

  toggleRespiratoryRateGraph() {
    if(!this.isRespiratoryRateDisplayed) {
      this.checkIfAnyGraphIsToggled();
    }

    this.secondGraph = this.firstGraph;
    this.firstGraph = "resp";
    this.graphToggler()

  }

  toggleFluidBalance() {
    if(!this.isFluidBalanceDisplayed) {
      this.checkIfAnyGraphIsToggled();
    }

    this.secondGraph = this.firstGraph;
    this.firstGraph = "fluid";
    this.graphToggler()

  }
  
 
  checkIfAnyGraphIsToggled() {
    if(this.isBloodOxygenDisplayed || 
      this.isBloodPressureAndPulseDisplayed || 
      this.isBodyTemperatureDisplayed || 
      this.isRespiratoryRateDisplayed ||
      this.isFluidBalanceDisplayed ) {
        this.isBloodOxygenDisplayed = false;
        this.isBloodPressureAndPulseDisplayed = false;
        this.isBodyTemperatureDisplayed = false;
        this.isRespiratoryRateDisplayed = false;
        this.isFluidBalanceDisplayed = false;
        
    }
  }
}
