import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material-module/material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ChartContainerComponent } from './UI Components/Charts/Chart-Container/chart-container.component';
import { ControlPageComponent } from './Pages/Control Page/control-page.component';
import { DashboardComponent } from './Pages/Dashboard/dashboard.component';
import { LineChartComponent } from './UI Components/Charts/Line Chart/line-chart.component';
import { BarChartComponent } from './UI Components/Charts/Bar Chart/bar-chart.component';
import { PieChartComponent } from './UI Components/Charts/Pie Chart/pie-chart.component';

import { ApplicationInsightsAPIService } from './Services/ApplicationInsightsAPIService/application-insights-apiservice.service';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    DashboardComponent,
    ChartContainerComponent,
    ControlPageComponent
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [ApplicationInsightsAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
