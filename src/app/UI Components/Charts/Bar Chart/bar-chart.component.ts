import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApplicationInsightsAPIService } from '../../../Services/ApplicationInsightsAPIService/application-insights-apiservice.service';
import { BarChart } from '../../../Models/BarChart';
import { RequestSegment, Segment, Metric, Value, Response } from '../../../Models/ApplicationInsightsAPIResponse';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {

  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [];

  public chartOptions: any;

  public response: Response;


  @Input() chart: BarChart;
  constructor(private insightsAPI: ApplicationInsightsAPIService) {

  }

  ngOnInit() {
    //this.chartType = this.chart.type.valueOf.toString();
    this.chartColors = this.chart.chartColors;
    this.chartOptions = this.chart.chartOptions;
    this.getMetricData();
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  public updateChartData(timespan: string, interval: string)
  {
    this.chart.timespan = timespan;
    this.chart.interval = interval;
    this.getMetricData();
  }

  public getMetricData()
  {
    this.insightsAPI.getMetricData(this.chart.telemetryType, this.chart.requestType, this.chart.timespan, this.chart.interval, this.chart.aggregation, this.chart.segment).subscribe(
      res => {
        this.createChartDataSets(res, this.chart.requestType, this.chart.aggregation, this.chart.segment);
      }
    );
  }

  public createChartDataSets(res: any, requestType: string, aggregation: string, segmentation: string)
  {
    this.chartDatasets = [];
    this.chartLabels = [];
    var pipe = new DatePipe('en-GB'); // Use your own locale
    console.log("Response: ");
    console.dir(res);
    this.response = res;
        this.response.value.segments.forEach(segment => {
          this.chartLabels.push(pipe.transform(segment.end, 'd LLL HH aaa'));
          segment.segments.forEach(innerSegment => {
        innerSegment.metricId = innerSegment[segmentation];
        innerSegment.metric = innerSegment[requestType];
        innerSegment.metric.value = innerSegment.metric[aggregation];
        var datasetObj = this.chartDatasets.find(x => x.label === innerSegment.metricId);
        if(datasetObj)
        {
          let datasetIndex = this.chartDatasets.indexOf(datasetObj);
          this.chartDatasets[datasetIndex].data.push(innerSegment.metric.value);
        }
        else {
          this.chartDatasets.push({ data: [innerSegment.metric.value], label: innerSegment.metricId.toString() });
        };
      })

    });
    console.log("DataSets: ");
    console.dir(this.chartDatasets);
  }
}