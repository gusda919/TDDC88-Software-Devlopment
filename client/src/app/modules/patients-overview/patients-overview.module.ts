import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatOptionModule } from '@angular/material/core';
import { OverviewTableComponent } from './components/overview-table/overview-table.component';
import { OverviewPageComponent } from './pages/overview-page/overview-page.component';
import { MatCardModule } from '@angular/material/card';
import {  MatButtonModule } from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { OverviewIncomingComponent } from './components/overview-incoming/overview-incoming.component';


@NgModule({
  declarations: [
    OverviewTableComponent,
    OverviewPageComponent,
    OverviewIncomingComponent,
  
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ]
})
export class PatientsOverviewModule { }
