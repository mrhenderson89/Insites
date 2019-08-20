import { ChartType } from '../enums/ChartType';

export interface IChart {
    id: number;
    name: string;
    type: ChartType;
    caption: string;
    updatedAt: Date;
    updatedAtString: string;
    sizeX: number;
    sizeY: number;
    chartColour: string;
    chartHeaderColour: string;
    chartWidth: number;
    chartHeight: number;

    updateLastUpdatedString();

    update(chart: IChart, data: any): void;

    onSelect(sender: IChart): void;
}