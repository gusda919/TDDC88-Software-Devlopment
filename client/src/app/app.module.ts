import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ChartsModule } from 'ng2-charts';
import { NavComponent } from './core/header/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';  
import {CdkTableModule} from '@angular/cdk/table';
import { MatBadgeModule } from '@angular/material/badge';

import { PatientDashboardModule } from './modules/patient-dashboard/patient-dashboard.module';
import { PatientsOverviewModule } from './modules/patients-overview/patients-overview.module';
import { JournalComponent } from './modules/patient-dashboard/components/journal/journal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSwedishPaginatorIntl } from './modules/patients-overview/components/overview-table/overview-table.component';
//import { uuid } from 'uuid';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
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
    MatTableModule,
    CdkTableModule,
    MatBadgeModule,
    FontAwesomeModule,
    MatSnackBarModule,
   // uuidv4,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSwedishPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 