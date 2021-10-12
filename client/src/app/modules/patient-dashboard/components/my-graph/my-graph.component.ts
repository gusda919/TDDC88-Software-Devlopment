import { Component, OnInit, Input } from '@angular/core';
//import {Chart} from 'node_modules/chart.js';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-my-graph',
  templateUrl: './my-graph.component.html',
  styleUrls: ['./my-graph.component.scss'],
})
export class MyGraphComponent implements OnInit {
  constructor() {}

  @Input() param: any;

  ngOnInit() {
    var myGraph = new Chart('myGraph', {
      type: 'line',
      data: {
        labels: [
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
        ],
        datasets: [
          {
            data: [120, 122, 119, 116, 124, 128, 130, 126, 117, 121, 120, 123],
            label: 'Systoliskt blodtryck (mmHg)',
            borderColor: '#3e95cd',
            fill: false,
          },
          {
            data: [80, 83, 82, 82, 77, 86, 82, 79, 84, 80, 81, 82],
            label: 'Diastoliskt blodtryck (mmHG)',
            borderColor: '#c45850',
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
