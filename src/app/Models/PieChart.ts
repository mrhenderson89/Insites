import { ChartType } from '../enums/ChartType';
import { IChart } from '../interfaces/IChart';
import { BaseChart } from './BaseChart';
import * as moment from 'moment';

export class PieChart extends BaseChart {

    public chartDatasets: Array<any>;
    
      public chartLabels: Array<any>;
    
      public chartColors: Array<any>;
    
      public chartOptions: any;

      public telemetryType: string;

      public requestType: string;

      public timespan: string;

      public interval: string;

      public aggregation: string;

      public segment: string;

      static parser = function(data: any): PieChart {
          if(data.type !== 'Pie') {
              throw Error('Chart type is not Pie');
          }
          if(!data.name) {
              throw Error('Could not create chart name: Name is not set')
          }

          return new PieChart(data.name, data.sizeX, data.sizeY, data.colour, data.telemetryType, data.requestType, data.timespan, data.interval, data.aggregation, data.segment);
      };

      constructor(name: string, sizeX: number, sizeY: number, chartColour: string, telemetryType: string, requestType: string, timespan: string, interval: string, aggregation: string, segment: string) {
          super(name, '', ChartType.Pie, null, sizeX, sizeY, chartColour);

          this.telemetryType = telemetryType;
          this.requestType = requestType;
          this.timespan = timespan;
          this.interval = interval;
          this.aggregation = aggregation;
          this.segment = segment;
          this.chartDatasets = [
            { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
          ];
          this.chartLabels = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];
          this.chartColors = [
            {
              backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
              hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
              borderWidth: 2,
            }
          ];
          this.chartOptions = {
            responsive: true
          };
          moment.locale('en');
      }

      update(chart: IChart, data: any) {}

      updateChartValues(chartDatasets: Array<any>, chartLabels: Array<any>, chartColors: Array<any>, chartOptions: any) {
          this.chartDatasets = chartDatasets;
          this.chartLabels = chartLabels;
          this.chartColors = chartColors;
          this.chartOptions= chartOptions;
      }
    }