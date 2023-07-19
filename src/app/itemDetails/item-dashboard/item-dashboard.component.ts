import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DataService } from 'src/app/services/data.service';
import { ChartDataSource } from 'src/app/model';
import { faComments, faHeartPulse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item-dashboard',
  templateUrl: './item-dashboard.component.html',
  styleUrls: ['./item-dashboard.component.css'],
})
export class ItemDashboardComponent implements OnInit{
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        console.log('hello');
        return [
          { title: 'Performance', cols: 1, rows: 1 },
          { title: 'Intents', cols: 1, rows: 1 },
          { title: 'TextSummary', cols: 1, rows: 2},
          { title: 'Sentiments', cols: 1, rows: 1 },
          { title: 'Offenses', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Performance', cols: 1, rows: 1 },
        { title: 'Intents', cols: 1, rows: 1 },
        { title: 'TextSummary', cols: 1, rows: 2},
        { title: 'Sentiments', cols: 1, rows: 2 },
        { title: 'Offenses', cols: 1, rows: 2 },
      ];
    })
  );

  sentimentData: ChartDataSource[];
  intentData: ChartDataSource[];
  offensiveData: ChartDataSource[];
  numOfLikes: number;
  numOfComments: number;
  dashboardCardMappings: any;
  faHeart = faHeartPulse;
  faComments = faComments

  constructor(private breakpointObserver: BreakpointObserver, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getItemDashboardData().subscribe({
      next: data => {
        setTimeout(() => this.populateData(data), 500);
      },
      error: error => {
        console.log(error);
      }
    })
  }

  populateData(data) {
    console.log(data);
    this.numOfLikes = 22124;
    this.numOfComments = 736;
    this.sentimentData = Object.keys(data["sentiment_count"]).map(x =>  ({ key: x, value: data["sentiment_count"][x] }));
    this.offensiveData = Object.keys(data["offensive_count"]).map(x =>  ({ key: x, value: data["offensive_count"][x] }));
    this.intentData = Object.keys(data["intent_count"]).map(x =>  ({ key: x, value: data["intent_count"][x] }));
    this.dashboardCardMappings = {
      Sentiments: { type: 'pieChart', dataSource: this.sentimentData },
      Intents: { type: 'barChart', dataSource: this.intentData },
      Offenses: { type: 'doughnutChart', dataSource: this.offensiveData},
      Performance: { type: 'performanceStats', },
      TextSummary: {type: 'textSummary'}
    }
  }

  getChartType(title: string) {
    if (this.dashboardCardMappings && this.dashboardCardMappings[title] && this.dashboardCardMappings[title]['type']) {
      console.log("getChartType: ", this.dashboardCardMappings[title]['type'])
      return this.dashboardCardMappings[title]['type'];
    }
    console.log("getChartType: ''")
    return "";
  }

}
