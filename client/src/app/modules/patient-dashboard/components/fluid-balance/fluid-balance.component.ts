import { Component, Input, OnInit } from '@angular/core';
import { Chart } from "chart.js";
import { PatientService } from 'src/app/core/services/patient.service';
import { FluidBalance, FluidBalanceData } from 'src/app/shared/models/patient';

@Component({
  selector: 'app-fluid-balance',
  templateUrl: './fluid-balance.component.html',
  styleUrls: ['./fluid-balance.component.scss']
})
export class FluidBalanceComponent implements OnInit {

  @Input()
  patientId: string;

  data: number[][] = [];
  labels: string[] = [];
  backgroundColors: string[] = [];

  waterfall: Chart;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.getChartData();

  }

  getChartData() { 
    this.patientService.getPatientFluidBalance(this.patientId).subscribe((fb: FluidBalance) => {
      let total: number = 0;

      fb.in.forEach((fbd: FluidBalanceData) => {
        let vStart: number = total;
        total += fbd.value;
        this.data.push([vStart, total]);
        this.labels.push(fbd.label);
        this.backgroundColors.push('rgb(76, 175, 80)');
      })

      fb.out.forEach((fbd: FluidBalanceData) => {
        let vStart: number = total;
        total -= fbd.value;
        this.data.push([vStart, total]);
        this.labels.push(fbd.label);
        this.backgroundColors.push('rgb(229, 57, 53)');
      })

      this.data.push([0, total]);
      this.labels.push("Skillnad");
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
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end'
          },
          tooltips: {
            callbacks: {
              label: (tooltipItem: any) => {
                let v = tooltipItem.index ? this.data[tooltipItem.index][1] - this.data[tooltipItem.index][0] : 0;
                console.log(v);
                return v;
              }
            }
          },
        }
      }
    });

  }

}

