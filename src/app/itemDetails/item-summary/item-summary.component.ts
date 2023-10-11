import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-item-summary',
  templateUrl: './item-summary.component.html',
  styleUrls: ['./item-summary.component.css']
})
export class ItemSummaryComponent implements OnInit {
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {

        return [
          { title: 'Top Topics', cols: 1, rows: 1 },
          { title: 'Positive Feedback', cols: 1, rows: 1 },
          { title: 'Negative Feedback', cols: 1, rows: 1},
          { title: 'Suggestions', cols: 1, rows: 1 },
        ];
      }

      return [
          { title: 'Top Topics', cols: 1, rows: 1 },
          { title: 'Positive Feedback', cols: 1, rows: 1 },
          { title: 'Negative Feedback', cols: 1, rows: 1},
          { title: 'Suggestions', cols: 1, rows: 1 },
      ];
    })
  );

  dashboardCardMappings: any;
  positiveFeedback = [];

  negativeFeedback = [];

  contentSuggestions = [];

  hotTopics = []

  constructor(
    private breakpointObserver: BreakpointObserver, 
    private dataService: DataService,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.dataService.getSummary().subscribe({
      next: (data) => {
        this.positiveFeedback = data["positiveFeedback"]?.split("\n")?.splice(1);
        this.negativeFeedback = data["negativeFeedback"]?.split("\n")?.splice(1);
        this.contentSuggestions = data["suggestions"]?.split("\n")?.splice(1);
        this.hotTopics = data["topTopics"]?.split("\n")?.splice(1);  
      },
      error: (err) => {
        this.notificationService.notify('error', err.error.message);
        console.log(err);
      },
    })
  }

  getChartType(title: string) {
    if (this.dashboardCardMappings && this.dashboardCardMappings[title] && this.dashboardCardMappings[title]['type']) {
      console.log("getChartType: ", this.dashboardCardMappings[title]['type'])
      return this.dashboardCardMappings[title]['type'];
    }
    return "";
  }

}
