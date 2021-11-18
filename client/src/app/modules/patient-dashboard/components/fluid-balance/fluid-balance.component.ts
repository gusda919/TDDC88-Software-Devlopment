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

  data: [];
  labels: [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.getChartData();
  }

  getChartData() {
    this.patientService.getPatientFluidBalance(this.patientId).subscribe((fb: FluidBalance) => {

      fb.in.forEach((fbd: FluidBalanceData) => {

      })

      fb.out.forEach((fbd: FluidBalanceData) => {

      })
   
    })
  }

}
