import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { OverviewTableComponent } from './components/overview-table/overview-table.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { MatCardModule } from '@angular/material/card';
import {  MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    OverviewTableComponent,
    OverviewPageComponent,
  
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule
  ]
})
export class PatientsOverviewModule { }
