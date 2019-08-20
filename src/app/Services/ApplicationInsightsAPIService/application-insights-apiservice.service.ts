import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

const requestDurationEndpoint = 'https://api.applicationinsights.io/v1/apps/XXXXXXXXXXXXXXXXXXXXXXX/metrics/requests/duration?timespan=P7D&interval=PT1H&aggregation=avg&segment=request%2FurlPath';
const apiDomain = 'https://api.applicationinsights.io/v1/apps/';
const instrumentationKey = 'XXXXXXXXXXXXXXXXXXXXXXX';
const httpOptions = {
  headers: new HttpHeaders({
    'x-api-key': 'XXXXXXXXXXXXXXXXXXXXXXX'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApplicationInsightsAPIService {

  requestURL = '';

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getMetricData(telemetryType: string, requestType: string, timespan: string, interval: string, aggregation: string, segment: string): Observable<any>{

    this.requestURL = apiDomain + instrumentationKey + '/' + telemetryType + '/' + requestType + '?timespan=' + timespan + '&interval=' + interval + '&aggregation=' + aggregation + '&segment=' + segment;

    console.log(this.requestURL);
    return this.http.get(this.requestURL, httpOptions).pipe(map(this.extractData));
  }
}
