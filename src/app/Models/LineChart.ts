import { ChartType } from '../enums/ChartType';
import { IChart } from '../interfaces/IChart';
import { BaseChart } from './BaseChart';
import * as moment from 'moment';

export class LineChart extends BaseChart {

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

      static parser = function(data: any): LineChart {
          if(data.type !== 'Line') {
              throw Error('Chart type is not Line');
          }
          if(!data.name) {
              throw Error('Could not create chart name: Name is not set')
          }

          return new LineChart(data.name, data.sizeX, data.sizeY, data.colour, data.telemetryType, data.requestType, data.timespan, data.interval, data.aggregation, data.segment);
      };

      constructor(name: string, sizeX: number, sizeY: number, chartColour: string, telemetryType: string, requestType: string, timespan: string, interval: string, aggregation: string, segment: string) {
          super(name, '', ChartType.Line, null, sizeX, sizeY, chartColour);

          this.telemetryType = telemetryType;
          this.requestType = requestType;
          this.timespan = timespan;
          this.interval = interval;
          this.aggregation = aggregation;
          this.segment = segment;
          this.chartDatasets = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
          ];
          this.chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
          this.chartColors = [
            {
              backgroundColor: 'rgba(105, 0, 132, .2)',
              borderColor: 'rgba(0, 199, 232, .7)',
              borderWidth: 2,
            },
            {
              backgroundColor: 'rgba(0, 137, 132, .2)',
              borderColor: 'rgba(0, 10, 130, .7)',
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