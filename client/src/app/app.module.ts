import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserlistComponent } from './shared/components/userlist/userlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChartsModule } from 'ng2-charts';
import { NavComponent } from './core/header/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { EmployeesComponent } from './shared/components/employees/employees.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';

import { PatientDashboardModule } from './modules/patient-dashboard/patient-dashboard.module';
import { PatientsOverviewModule } from './modules/patients-overview/patients-overview.module';


@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    NavComponent,
    EmployeesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    RouterModule,
    PatientDashboardModule,
    PatientsOverviewModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
