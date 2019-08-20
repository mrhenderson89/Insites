import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApplicationInsightsAPIService } from '../../../Services/ApplicationInsightsAPIService/application-insights-apiservice.service';
import { PieChart } from '../../../Models/PieChart';
import { RequestSegment, Segment, Metric, Value, Response } from '../../../Models/ApplicationInsightsAPIResponse';
import { ChartAggregation } from '../../../enums/ChartAggregation'

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {

  public chartType: string = 'Pie';

  public chartDatasets: Array<any> = [];

  public chartLabels: Array<any> = [];

  public chartColors: Array<any> = [];

  public chartOptions: any;

  public response: Response;


  @Input() chart: PieChart;
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
    this.chartDatasets = [{ data: [], label: this.chart.title }];
    this.chartLabels = [];
    console.log("Response: ");
    console.dir(res);

    //let chartDatasets: ChartDataSetsObjectType;
                try {
                    switch(this.chart.aggregation) {
                        case ChartAggregation.Avg.toString():

                            break;
                        case ChartAggregation.Count.toString():
                            //Find labels index of metric. IF not exist, add to labels, add 1 to end of dataset. If exist, increase dataset [Index] by 1.
                            this.response.value.segments.forEach(segment => {
                                //this.chartLabels.push(pipe.transform(segment, 'd LLL HH aaa'));
                                segment.segments.forEach(innerSegment => {
                              innerSegment.metricId = innerSegment[segmentation];
                              innerSegment.metric = innerSegment[requestType];
                              innerSegment.metric.value = innerSegment.metric[aggregation];
                              var datasetObj = this.chartLabels.find(x => x === innerSegment.metricId);
                              if(datasetObj)
                              {
                                let datasetIndex = this.chartLabels.indexOf(datasetObj);
                                this.chartDatasets[0].data[datasetIndex].value ++;
                              }
                              else {
                                this.chartLabels.push(innerSegment.metricId.toString());
                                this.chartDatasets[0].push(1);
                              };
                            })
                          });
                            break;
                        case ChartAggregation.Max.toString():
                            //Find labels index of metric. IF not exist, add to labels, add value to end of dataset. If exist, is value greater than in dataset? Replace. 
                            this.response.value.segments.forEach(segment => {
                                //this.chartLabels.push(pipe.transform(segment, 'd LLL HH aaa'));
                                segment.segments.forEach(innerSegment => {
                              innerSegment.metricId = innerSegment[segmentation];
                              innerSegment.metric = innerSegment[requestType];
                              innerSegment.metric.value = innerSegment.metric[aggregation];
                              var datasetObj = this.chartLabels.find(x => x === innerSegment.metricId);
                              if(datasetObj)
                              {
                                let datasetIndex = this.chartLabels.indexOf(datasetObj);
                                if(this.chartDatasets[0].data[datasetIndex].value < innerSegment.metric.value)
                                {
                                    this.chartDatasets[0].data[datasetIndex].value = innerSegment.metric.value;
                                }
                              }
                              else {
                                this.chartLabels.push(innerSegment.metricId.toString());
                                this.chartDatasets[0].push(innerSegment.metric.value);
                              };
                            })
                          });
                            break;
                        case ChartAggregation.Min.toString():
                            //Find labels index of metric. IF not exist, add to labels, add value to end of dataset. If exist, is value lesser than in dataset? Replace.
                            this.response.value.segments.forEach(segment => {
                                //this.chartLabels.push(pipe.transform(segment, 'd LLL HH aaa'));
                                segment.segments.forEach(innerSegment => {
                              innerSegment.metricId = innerSegment[segmentation];
                              innerSegment.metric = innerSegment[requestType];
                              innerSegment.metric.value = innerSegment.metric[aggregation];
                              var datasetObj = this.chartLabels.find(x => x === innerSegment.metricId);
                              if(datasetObj)
                              {
                                let datasetIndex = this.chartLabels.indexOf(datasetObj);
                                if(this.chartDatasets[0].data[datasetIndex].value > innerSegment.metric.value)
                                {
                                    this.chartDatasets[0].data[datasetIndex].value = innerSegment.metric.value;
                                }
                              }
                              else {
                                this.chartLabels.push(innerSegment.metricId.toString());
                                this.chartDatasets[0].push(innerSegment.metric.value);
                              };
                            })
                          });
                            break;
                        case ChartAggregation.Sum.toString():
                            //Find labels index of metric. IF not exist, add to labels, add value to end of dataset. If exist, increase dataset [Index] by value.
                                this.response.value.segments.forEach(segment => {
                                    //this.chartLabels.push(pipe.transform(segment, 'd LLL HH aaa'));
                                    segment.segments.forEach(innerSegment => {
                                  innerSegment.metricId = innerSegment[segmentation];
                                  innerSegment.metric = innerSegment[requestType];
                                  innerSegment.metric.value = innerSegment.metric[aggregation];
                                  var datasetObj = this.chartLabels.find(x => x === innerSegment.metricId);
                                  if(datasetObj)
                                  {
                                    let datasetIndex = this.chartLabels.indexOf(datasetObj);
                                    this.chartDatasets[0].data[datasetIndex].value + innerSegment.metric.value;
                                  }
                                  else {
                                    this.chartLabels.push(innerSegment.metricId.toString());
                                    this.chartDatasets[0].push(innerSegment.metric.value);
                                  };
                                })
                              });
                            break;
                        default:
                            throw Error('Could not create datasets for aggregation: ' + this.chart.type);
                    }
                } catch(error) {
                    console.error('Could not parse  dataset for chart ' + this.chart.title + '. Error: ' + error);
                    return;
                }
    console.log("DataSets: ");
    console.dir(this.chartDatasets);
  }
}