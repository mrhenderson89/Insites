import { Component, OnInit, Input } from '@angular/core';
import { IChart } from '../../interfaces/IChart';

@Component({
    selector: 'app-control-page',
    templateUrl: './control-page.component.html',
    styleUrls: ['./control-page.component.css']
})
export class ControlPageComponent implements OnInit {

    @Input() pageCharts: IChart[];

    constructor() {

    }

    ngOnInit() {
        
    }
}