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
  
  data: number[] = [];
  systolic: number[] = [];
  diastolic: number[] = [];


  ngOnInit() {

    this.addTimestamps();
    this.addValues();

 
    if(this.vitalParameters == null) {

      const arrowDown = new Image(10,15);
      arrowDown.src = '../../../../assets/arrow_down_bloodpressure_graph.png';
      const arrowUp = new Image(10,15);
      arrowUp.src = '../../../../assets/arrow_up_bloodpressure_graph.png'      

      var myGraph = new Chart('myGraph', {
        type: 'line',        
        data: {
          labels: this.labels,
          datasets: [
            {
              data: this.systolic,
              label: 'Systoliskt blodtryck',
              borderColor: '#000000',
              fill: false,
              pointStyle: arrowDown,
            },
            {
              data: this.diastolic,
              label: 'Diastoliskt blodtryck',
              borderColor: '#000000',
              fill: false,
              pointStyle: arrowUp,
            },
            {
              data: this.data,
              label: 'Puls',
              borderColor: '#ff0000',
              fill: false,
            },
          ],
        },
        options: {
          title: {
            display: true,
            // text: 'World population per region (in millions)'
          },
          maintainAspectRatio: false,
          legend: {
            labels: {
              usePointStyle: true,
            },
          }
        },
      });
    } else {
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
          maintainAspectRatio: false,
          legend: {
            labels: {
              usePointStyle: true,
            },
          }
        },
      });
    }
  }

  addTimestamps() {

    if(this.vitalParameters==null) {
      for(let i = 0; i < this.bloodPressure.data.length; i++) {
        this.labels.push(this.bloodPressure.data[i].time);
      }
    } else {
      for(let i = 0; i < this.vitalParameters.data.length; i++) {
        this.labels.push(this.vitalParameters.data[i].time);
      }
    }
  
  }

  addValues() {

    if(this.vitalParameters==null) {
      for(let i = 0; i < this.bloodPressure.data.length; i++) {
        this.systolic.push(this.bloodPressure.data[i].systolic);
        this.diastolic.push(this.bloodPressure.data[i].diastolic);
      }
      for(let i = 0; i < this.pulse.data.length; i++) {
        this.data.push(this.pulse.data[i].value);
      }  
    } else {
      for(let i = 0; i < this.vitalParameters.data.length; i++) {
        this.data.push(this.vitalParameters.data[i].value);
      } 
    }

  }

}
