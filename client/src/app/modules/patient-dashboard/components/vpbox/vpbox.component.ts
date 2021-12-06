import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { VitalParameters, FluidBalance } from 'src/app/shared/models/patient';
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
  isNRSDisplayed = false;


  firstGraph = "oxygen";
  secondGraph = "pressure";
  
  bloodOxygenColor = "";
  pulseColor = "";
  bloodPressureColor = "";
  bodyTemperatureColor = "";
  respiratoryRateColor = "";
  ACVPUColor = "";
 
  vitalParameters: VitalParameters;
  fluidBalance: FluidBalance;
  labs: Lab[];

  constructor(private patientService: PatientService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getVitalParameters();
    this.getFluidBalanceData();
  }

  getVitalParameters() {
    this.patientService.getPatientVitalparameters(this.patientId).subscribe((vitalParameters: VitalParameters) => {
      this.vitalParameters = vitalParameters;
      this.setTriageColors();
      this.cdr.detectChanges();
    });
  }

  getFluidBalanceData() {
    this.patientService.getPatientFluidBalance(this.patientId).subscribe((fluidBalance: FluidBalance) => {
      this.fluidBalance = fluidBalance;
      this.isLoaded = true;
    })
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

  getLatestACVPU() {
    let data = this.vitalParameters.acvpu.data;
    return data[data.length-1];
  }

  getLatestNRS() {
    let data = this.vitalParameters.nrs.data;
    return data[data.length-1];
  }

  getFluidBalance() {
    let fb = 0;
    this.fluidBalance.in.forEach((fbIn) => {
      fb += fbIn.value;
    })
    this.fluidBalance.out.forEach((fbOut) => {
      fb -= fbOut.value;
    })
    return fb;
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


    //Triage coloring for ACVPU
    if (this.getLatestACVPU().value === "A") {
      this.ACVPUColor = "#4CAF50";
    } else if (this.getLatestACVPU().value === "C") {
      this.ACVPUColor = "#FFEB3B";
    } else if (this.getLatestACVPU().value === "V") {
      this.ACVPUColor = "#FF9800";
    } else if (this.getLatestACVPU().value === "P" || this.getLatestACVPU().value === "U") {
      this.ACVPUColor = "#F44336";
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
    if(this.firstGraph === "nrs" || this.secondGraph === "nrs") {
      this.isNRSDisplayed = true;
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

  toggleNRSGraph() {
    if(!this.isNRSDisplayed) {
      this.checkIfAnyGraphIsToggled();
    }

    this.secondGraph = this.firstGraph;
    this.firstGraph = "nrs";
    this.graphToggler()
  }
  
 
  checkIfAnyGraphIsToggled() {
    if(this.isBloodOxygenDisplayed || 
      this.isBloodPressureAndPulseDisplayed || 
      this.isBodyTemperatureDisplayed || 
      this.isRespiratoryRateDisplayed ||
      this.isFluidBalanceDisplayed ||
      this.isNRSDisplayed) {
        this.isBloodOxygenDisplayed = false;
        this.isBloodPressureAndPulseDisplayed = false;
        this.isBodyTemperatureDisplayed = false;
        this.isRespiratoryRateDisplayed = false;
        this.isFluidBalanceDisplayed = false;
        this.isNRSDisplayed = false;
    }
  }
}
