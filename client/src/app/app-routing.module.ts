import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardPageComponent } from './modules/patient-dashboard/pages/dashboard/dashboard-page.component';
import { EmployeesComponent } from './shared/components/employees/employees.component';
import { OverviewPageComponent } from './modules/patients-overview/pages/overview-page/overview-page.component';

// TODO: maybe add routing file to each module 

const routes: Routes = [
  { path: 'dashboard/:patientID', component: DashboardPageComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'overview', component: OverviewPageComponent },
  { path: '', redirectTo: '/overview', pathMatch: 'full'}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
