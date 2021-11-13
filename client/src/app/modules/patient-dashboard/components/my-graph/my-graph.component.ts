import { Component, OnInit, Input } from '@angular/core';
//import {Chart} from 'node_modules/chart.js';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { VitalParameters } from 'src/app/shared/models/patient';

@Component({
  selector: 'app-my-graph',
  templateUrl: './my-graph.component.html',
  styleUrls: ['./my-graph.component.scss'],
})
export class MyGraphComponent implements OnInit {
  
  constructor() {}

  @Input() vitalParameters: any;
  @Input() bloodPressure: any;
  @Input() pulse: any;
  labels: string[] = [];
  bloodPressureLabels: string[] = [];
  pulseLabels: string[] = [];
  
  data: number[] = [];
  systolic: number[] = [];
  diastolic: number[] = [];


  ngOnInit() {
 
    if(this.vitalParameters == null) {
      this.addTimestampsBloodPressureAndPulseGraph();
      this.addValuesBloodPressureAndPulseGraph();

      var myGraph = new Chart('myGraph', {
        type: 'line',
        data: {
          datasets: [
            {
              data: this.systolic,
              label: 'Systoliskt blodtryck',
              borderColor: '#0015ff',
              fill: false,
            },
            {
              data: this.diastolic,
              label: 'Diastoliskt blodtryck',
              borderColor: '#ff0019',
              fill: false,
            },
            {
              data: this.data,
              label: 'Puls',
              borderColor: '#03fc03',
              fill: false,
            },
          ],
        },
        options: {
          title: {
            display: true,
            // text: 'World population per region (in millions)'
          },
        },
      });



    } else {
      this.addTimestamps();
      this.addValues();
      var myGraph = new Chart('myGraph', {
        type: 'line',
        data: {
          labels: this.labels,
          datasets: [
            {
              data: this.data,
              label: this.vitalParameters.label,
              borderColor: '#0015ff',
              fill: false,
            },
          ],
        },
        options: {
          title: {
            display: true,
            // text: 'World population per region (in millions)'
          },
        },
      });
    }
  }

  addTimestamps() {
    for(let i = 0; i < this.vitalParameters.data.length; i++) {
      this.labels.push(this.vitalParameters.data[i].time);
    }
  }

  addValues() {
    for(let i = 0; i < this.vitalParameters.data.length; i++) {
      this.data.push(this.vitalParameters.data[i].value);
    } 
  }

  addTimestampsBloodPressureAndPulseGraph() {
    for(let i = 0; i < this.bloodPressure.data.length; i++) {
      this.bloodPressureLabels.push(this.bloodPressure.data[i].time);
    }
    for(let i = 0; i < this.pulse.data.length; i++) {
      this.pulseLabels.push(this.pulse.data[i].time);
    }
  }

  addValuesBloodPressureAndPulseGraph() {
    for(let i = 0; i < this.bloodPressure.data.length; i++) {
      this.systolic.push(this.bloodPressure.data[i].systolic);
      this.diastolic.push(this.bloodPressure.data[i].diastolic);
    }
    for(let i = 0; i < this.pulse.data.length; i++) {
      this.data.push(this.pulse.data[i].value);
    }
  }
}
