import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { CardComponent } from './components/card/card.component';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { LayoutModule } from '@angular/cdk/layout';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CardComponent,
    LineChartComponent,
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    ChartsModule,
    RouterModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule
  ]
})
export class PatientDashboardModule { }
