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
  labels: string[] = [];
  data: number[] = [];
  systolic: number[] = [];
  diastolic: number[] = [];


  ngOnInit() {
    console.log(this.vitalParameters);
    this.addTimestamps();
    this.addValues();

    if(this.vitalParameters.label=='Blodtryck') {
      var myGraph = new Chart('myGraph', {
        type: 'line',
        data: {
          labels: this.labels,
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
    if(this.vitalParameters.label=='Blodtryck') {
      for(let i = 0; i < this.vitalParameters.data.length; i++) {
        this.systolic.push(this.vitalParameters.data[i].systolic);
        this.diastolic.push(this.vitalParameters.data[i].diastolic);
      }
    } else {
      for(let i = 0; i < this.vitalParameters.data.length; i++) {
        this.data.push(this.vitalParameters.data[i].value);
      }
    }
  }

}
