import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ChartConfigurationModel } from '../../Models/Chart-configuration.model';
import { TabNavigationService } from '../../Services/tab-navigation.service';
import { ConfigurationLoader } from '../../configuration-loader';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    @Input() selectedTabIndex: number;

    public chartTabs: ChartConfigurationModel[];

    constructor(
        private navigationServer :TabNavigationService,
        private route: ActivatedRoute,
        private location: Location 
    ) {
        this.selectedTabIndex = 0;
        this.chartTabs = [];

        this.navigationServer.addObserver({
            next: (newTabIndex: number) => {
                console.log('[TABS] jump to tab ' + newTabIndex);
                this.selectedTabIndex = newTabIndex;
            }
        });
    }

    ngOnInit() {
        console.log('Initialize app for Sample');

        this.loadCharts('sample');
    }

    private loadCharts(project: string) {
        this.chartTabs = ConfigurationLoader.loadConfiguration(project);
        console.dir(this.chartTabs);
        console.log(`Loaded ${this.chartTabs.length} pages`);
    }
}