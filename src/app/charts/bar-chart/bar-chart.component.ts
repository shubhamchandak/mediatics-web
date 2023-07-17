import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ChartDataSource } from 'src/app/model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @Input() dataSource: ChartDataSource[];

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
       position: "top"
      } 
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.barChartData = {
      labels: this.dataSource.map(x => x.key),
      datasets: [{
        data: this.dataSource.map(x => x.value),
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56']
      }],
    }
  }

}
