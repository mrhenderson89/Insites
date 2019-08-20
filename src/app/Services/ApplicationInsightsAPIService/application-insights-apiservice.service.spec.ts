import { TestBed } from '@angular/core/testing';

import { ApplicationInsightsAPIService } from './application-insights-apiservice.service';

describe('ApplicationInsightsAPIServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApplicationInsightsAPIService = TestBed.get(ApplicationInsightsAPIService);
    expect(service).toBeTruthy();
  });
});
