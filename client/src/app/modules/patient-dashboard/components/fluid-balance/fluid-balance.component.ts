import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Chart, ChartData, ChartTooltipItem } from "chart.js";
import { PatientService } from 'src/app/core/services/patient.service';
import { FluidBalance, FluidBalanceData } from 'src/app/shared/models/patient';

@Component({
  selector: 'app-fluid-balance',
  templateUrl: './fluid-balance.component.html',
  styleUrls: ['./fluid-balance.component.scss']
})
export class FluidBalanceComponent implements OnChanges {

  @Input()
  patientId: string;

  data: number[][] = [];
  labels: string[] = [];
  backgroundColors: string[] = [];

  waterfall: Chart;

  constructor(private patientService: PatientService) { }

  ngOnChanges(): void {
    this.getChartData();

  }

  getChartData() { 

    this.data = [];
    this.labels = [];


    this.patientService.getPatientFluidBalance(this.patientId).subscribe((fb: FluidBalance) => {
      let total: number = 0;

      fb.in.forEach((fbd: FluidBalanceData) => {
        if (fbd.value != 0) {
          let vStart: number = total;
          total += fbd.value;
          this.data.push([vStart, total]);
          this.labels.push(fbd.label);
          this.backgroundColors.push('rgb(76, 175, 80)');
        }     
      })

      fb.out.forEach((fbd: FluidBalanceData) => {
        if (fbd.value != 0) {
          let vStart: number = total;
          total -= fbd.value;
          this.data.push([vStart, total]);
          this.labels.push(fbd.label);
          this.backgroundColors.push('rgb(229, 57, 53)');
        }  
      })

      this.data.push([0, total]);
      this.labels.push("Vätskebalans");
      this.backgroundColors.push('rgb(255, 193, 7)')
      
      this.renderChart();
      console.log(this.data);
    });
  }

  renderChart() {
    this.waterfall = new Chart('waterfall', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          data: this.data,
          backgroundColor: this.backgroundColors,
          barPercentage: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        tooltips: {
            callbacks: {
              label: function(tooltipItem, data: ChartData) {
                  let i = tooltipItem.index ? tooltipItem.index : 0;
        
                  if (data && data.datasets && data.datasets[0].data && i >= 0) {
                    let d = data.datasets[0].data[i];
                    return (Array.isArray(d) ? (d[1] - d[0]) : 0).toString() + ' ml';
                  }
                  return '0 ml';
              }
            }
          },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end'
          },
          
        }
      }
    });

  }

}

