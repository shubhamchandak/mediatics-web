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
        return [
          { title: 'Performance', cols: 1, rows: 1 },
          { title: 'Intents', cols: 1, rows: 1 },
          { title: 'TextSummary', cols: 1, rows: 2},
          { title: 'Sentiments', cols: 1, rows: 1 },
          { title: 'Offensive', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Performance', cols: 1, rows: 1 },
        { title: 'Intents', cols: 1, rows: 1 },
        { title: 'TextSummary', cols: 1, rows: 2},
        { title: 'Sentiments', cols: 1, rows: 2 },
        { title: 'Offensive', cols: 1, rows: 2 },
      ];
    })
  );

  sentimentData: ChartDataSource[];
  intentData: ChartDataSource[];
  offensiveData: ChartDataSource[];
  numOfLikes: number;
  numOfComments: number;
  dashboardCardMappings: any = {};
  faHeart = faHeartPulse;
  faComments = faComments

  constructor(private breakpointObserver: BreakpointObserver, private dataService: DataService) {
  }

  ngOnInit(): void {
    // this.dashboardCardMappings = {
    //   Sentiments: { type: 'pieChart', dataSource: this.sentimentData },
    //   Intents: { type: 'barChart', dataSource: this.intentData },
    //   Offenses: { type: 'doughnutChart', dataSource: this.offensiveData},
    //   Performance: { type: 'performanceStats', },
    //   TextSummary: {type: 'textSummary'}
    // }
    console.log("initmappings: ", this.dashboardCardMappings);
    this.setIntentCount();
    this.setOffensiveCount();
    this.setSentimentCount();
  }

  // populateData(data) {
  //   console.log(data);
  //   this.numOfLikes = 22124;
  //   this.numOfComments = 736;
  //   this.sentimentData = Object.keys(data["sentiment_count"]).map(x =>  ({ key: x, value: data["sentiment_count"][x] }));
  //   this.offensiveData = Object.keys(data["offensive_count"]).map(x =>  ({ key: x, value: data["offensive_count"][x] }));
  //   this.intentData = Object.keys(data["intent_count"]).map(x =>  ({ key: x, value: data["intent_count"][x] }));
  //   this.dashboardCardMappings = {
  //     Sentiments: { type: 'pieChart', dataSource: this.sentimentData },
  //     Intents: { type: 'barChart', dataSource: this.intentData },
  //     Offenses: { type: 'doughnutChart', dataSource: this.offensiveData},
  //     Performance: { type: 'performanceStats', },
  //     TextSummary: {type: 'textSummary'}
  //   }
  // }

  getChartType(title: string) {
    if (this.dashboardCardMappings && this.dashboardCardMappings[title] && this.dashboardCardMappings[title]['type']) {
      // console.log("getChartType: ", this.dashboardCardMappings[title]['type'])
      return this.dashboardCardMappings[title]['type'];
    }
    // console.log("getChartType: ''")
    return "";
  }

  setIntentCount() {
    this.dataService.getIntentCount().subscribe({
      next: (data) => {
        this.intentData = data.map(x => ({key: x.type, value: x.count}));
        this.dashboardCardMappings['Intents'] = { type: 'barChart', dataSource: this.intentData };
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  setOffensiveCount() {
    this.dataService.getOffensiveCount().subscribe({
      next: (data) => {
        this.offensiveData = data.map(x => ({key: x.type, value: x.count}));
        this.dashboardCardMappings['Offensive'] = { type: 'doughnutChart', dataSource: this.offensiveData };
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  setSentimentCount() {
    this.dataService.getSentimentCount().subscribe({
      next: (data) => {
        this.sentimentData = data.map(x => ({key: x.type, value: x.count}));
        this.dashboardCardMappings['Sentiments'] = { type: 'pieChart', dataSource: this.sentimentData };
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

}
