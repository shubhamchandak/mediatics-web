import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { ChartDataSource } from 'src/app/model';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  @Input() dataSource: ChartDataSource[];

  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] },
      { data: [ 50, 0, 120 ] },
      { data: [ 250, 130, 70 ] }
    ],
  };
  public doughnutChartLegend = true;
  public doughnutChartPlugins = [];
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
     legend: {
      position: "right"
     } 
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.doughnutChartLabels = this.dataSource.map(x => x.key);
    this.doughnutChartData = {
      labels: this.dataSource.map(x => x.key),
      datasets: [
        { 
          data: this.dataSource.map(x => x.value),
          backgroundColor: ['#36a2eb', '#ff6384', '#cc65fe', '#ffce56',]
        },
      ]
    };
  }

}
