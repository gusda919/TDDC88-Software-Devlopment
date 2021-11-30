import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

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
import { MatInputModule } from '@angular/material/input'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatOption, MatOptionModule } from '@angular/material/core';

import { MatTableModule } from '@angular/material/table';  
import {CdkTableModule} from '@angular/cdk/table';
import { MatBadgeModule } from '@angular/material/badge';

import { PatientDashboardModule } from './modules/patient-dashboard/patient-dashboard.module';
import { PatientsOverviewModule } from './modules/patients-overview/patients-overview.module';
import { JournalComponent } from './modules/patient-dashboard/components/journal/journal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getSwedishPaginatorIntl } from './modules/patients-overview/components/overview-table/overview-table.component';
import { SearchBarComponent } from './core/header/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    SearchBarComponent,
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
    MatOptionModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useValue: getSwedishPaginatorIntl() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 