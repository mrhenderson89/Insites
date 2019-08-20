import { IChart } from '../interfaces/IChart';

export class ChartConfigurationModel {
    public name: string;
    public icon: string;
    public charts: IChart[];
    public tabIndex: number;

    constructor(name: string, icon: string, tabIndex: number) {
        this.name = name;
        this.icon = icon;
        this.charts = [];
        this.tabIndex = tabIndex;
    }

    public addChart(chart: IChart) {
        this.charts.push(chart);
    }
}