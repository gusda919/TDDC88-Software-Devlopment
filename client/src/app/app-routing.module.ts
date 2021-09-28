import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './modules/patient-dashboard/dashboard/dashboard.component';
import { EmployeesComponent } from './shared/components/employees/employees.component';
import { OverviewTableComponent } from './modules/patients-overview/overview-table/overview-table.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'overview', component: OverviewTableComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
