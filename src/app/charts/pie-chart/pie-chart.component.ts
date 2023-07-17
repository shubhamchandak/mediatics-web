import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ChartDataSource } from 'src/app/model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() dataSource: ChartDataSource[];

  public pieChartLabels = [
    ['Download', 'Sales'],
    ['In Store', 'Sales'],
    'Mail Sales',
  ];
  public pieChartDatasets: ChartData<'pie'> = {
    datasets: [{
      data: [300, 500, 100],
    }],
  }
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public pieChartOptions: ChartOptions<'pie'> = {
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
    this.pieChartLabels = this.dataSource.map(x => x.key);
    this.pieChartDatasets = {
      datasets: [
        {
          data: this.dataSource.map(x => x.value),
          backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56']
        }
      ]
    }
  }

}
