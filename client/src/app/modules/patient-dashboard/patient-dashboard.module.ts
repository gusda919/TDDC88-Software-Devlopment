import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPageComponent } from './pages/dashboard/dashboard-page.component';
import { LineChartComponent } from './components/charts/line-chart/line-chart.component';
import { CardComponent } from './components/card/card.component';
import { VpboxComponent } from './components/vpbox/vpbox.component';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { LayoutModule } from '@angular/cdk/layout';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { JournalComponent } from './components/journal/journal.component';
import { PatientHeaderComponent } from './components/patient-header/patient-header.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MyGraphComponent } from './components/my-graph/my-graph.component';
import { BodySilhouetteComponent } from './components/body-silhouette/body-silhouette.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JournalWidgetComponent } from './components/journal-widget/journal-widget.component';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    CardComponent,
    LineChartComponent,
    DashboardPageComponent,
    JournalComponent,
    PatientHeaderComponent,
    TimelineComponent,
    MyGraphComponent,
    VpboxComponent,
    BodySilhouetteComponent,
    JournalWidgetComponent,
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
    MatMenuModule,
    FontAwesomeModule,
    MatToolbarModule,
  ],
})
export class PatientDashboardModule {}
