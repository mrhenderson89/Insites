import { IChart } from './interfaces/IChart';
import { ChartConfigurationModel } from './Models/Chart-configuration.model';
import { LineChart } from './Models/LineChart';
import { BarChart } from './Models/BarChart';
import { PieChart } from './Models/PieChart';

// Configurations
import * as chartconfiguration_Sample from '../assets/configuration/projectConfig_sample.json';

export class ConfigurationLoader {

    static loadConfiguration(projectId: string): ChartConfigurationModel[] {

        let chartconfigurationData: any;
        if (projectId === 'sample') {
            chartconfigurationData = chartconfiguration_Sample;
        }

        const result: ChartConfigurationModel[] = [];

        ConfigurationLoader.validate(chartconfigurationData);

        const pages = chartconfigurationData.default.pages;

        for(let i = 0; i < pages.length; i++) {
            const newPage = new ChartConfigurationModel(pages[i].name, pages[i].icon, pages[i].index);

            // add Charts
            const charts = pages[i].charts;
            charts.forEach(chart => {
                // create chart based on type
                let chartInstance: IChart;
                try {
                    switch(chart.type) {
                        case 'Line':
                            chartInstance = LineChart.parser(chart);
                            break;
                        case 'Bar':
                            chartInstance = BarChart.parser(chart);
                            break;
                        case 'Pie':
                            chartInstance = PieChart.parser(chart);
                            break;
                        default:
                            throw Error('Could not match card type ' + chart.type);
                    }
                } catch(error) {
                    console.error('Could not parse  card for page ' + i + '. Error: ' + error);
                    return;
                }

                newPage.addChart(chartInstance);
            });
            result.push(newPage);
        }

        return result;
    }

    private static validate(chartconfigurationData) {
        if(!chartconfigurationData) {
            throw Error('Could not load chart configuration data');
        }

        if(!chartconfigurationData.default.pages) {
            throw Error('Could not get pages attribute from config data.');
        }

        const pages = chartconfigurationData.default.pages as any[];

        if (pages.length === 0) {
            throw Error('Chart configuration data doesnt contain any pages');
        }
    }
}