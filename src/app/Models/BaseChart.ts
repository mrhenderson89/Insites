import { ChartType } from '../enums/ChartType';
import { IChart } from '../interfaces/IChart';
import * as moment from 'moment';

const standardChartHeight = 115;
const standardChartWidth = 115;
const chartMargin = 48;
const chartGridPadding = 16;

let currentChartId = 0;

export abstract class BaseChart implements IChart {
    id: number;
    name: string;
    title: string;
    type: ChartType;
    caption: string;
    sizeX: number;
    sizeY: number;
    updatedAt: Date;
    updatedAtString: string;
    chartColour: string;
    chartHeaderColour: string;
    chartWidth: number;
    chartHeight: number;

    protected constructor(
    name: string,
    title: string,
    type: ChartType,
    caption: string,
    sizeX?: number,
    sizeY?: number,
    chartColour?: string,
    chartHeaderColour?: string) {

        this.id = currentChartId;
        currentChartId++;

        this.name = name;
        this.title = title;
        this.caption = caption || '';
        
        this.type = type;

        this.updatedAt = moment().toDate();

        this.sizeX = sizeX || 400;
        this.sizeY = sizeY || 600;

        this.chartHeight = 500;
        this.chartWidth = 750;
        //this.chartWidth = this.sizeX * standardChartWidth + chartMargin * (this.sizeX - 1) + chartGridPadding * (this.sizeX - 1);
        //this.chartHeight = this.sizeY * standardChartHeight + chartMargin * (this.sizeY - 1) + chartGridPadding * (this.sizeY - 1);

        this.chartHeaderColour = chartHeaderColour;
        this.chartColour = chartColour;

        console.log('Chart ' + this.name + ' (' + this.type.toString() + ' ) created with' + this.chartWidth + 'x' + this.chartHeight );

    }

        public isDefaultChartColour(element: string): boolean {
            if(element) {
                return false;
            }
            return true;
        }

        private getLastUpdatedString() {
            return moment(this.updatedAt).format('mm:ss');
        }

        updateLastUpdatedString() {
            this.updatedAt = new Date();
            this.updatedAtString = this.getLastUpdatedString();
        }

        abstract update(chart: BaseChart, data: any): void;

        onSelect(sender: BaseChart): void {
        }

        toString(): string {
            return this.name + ' (id ' + this.id + '): ' + this.caption;
        }

    }