import { Component, OnInit, Input } from '@angular/core';
import { ChartType } from '../../../enums/ChartType';
import { IChart } from '../../../interfaces/IChart';

@Component({
    selector: 'app-chart-container',
    templateUrl: './chart-container.component.html',
    styleUrls: ['./chart-container.component.css']
})
export class ChartContainerComponent implements OnInit {
    @Input() chart: IChart;

    ChartType: typeof ChartType = ChartType;

    constructor() {

    }

    ngOnInit() {
        
    }
}