import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-item-summary',
  templateUrl: './item-summary.component.html',
  styleUrls: ['./item-summary.component.css']
})
export class ItemSummaryComponent implements OnInit {
  cards = [
      { title: 'Top Topics', color: "white", expanded: true },
      { title: 'Positive Feedback', color: "white", expanded: true },
      { title: 'Negative Feedback', color: "white", expanded: true },
      { title: 'Suggestions', color: "white", expanded: true },
    ];

  dashboardCardMappings: any;
  positiveFeedback = [];
  negativeFeedback = [];
  contentSuggestions = [];
  hotTopics = []

  cardItems = {
    'Top Topics': this.hotTopics,
    'Positive Feedback': this.positiveFeedback,
    'Negative Feedback': this.negativeFeedback,
    'Suggestions': this.contentSuggestions
  };

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.dataService.getSummary().subscribe({
      next: (data) => {
        this.positiveFeedback = data["positiveFeedback"]?.replaceAll("- ", "")?.split("\n")?.splice(1);
        this.negativeFeedback = data["negativeFeedback"]?.replaceAll("- ", "")?.split("\n")?.splice(1);
        this.contentSuggestions = data["suggestions"]?.replaceAll("- ", "")?.split("\n")?.splice(1);
        this.hotTopics = data["topTopics"]?.replaceAll("- ", "")?.split("\n")?.splice(1);
        this.cardItems = {
          'Top Topics': this.hotTopics,
          'Positive Feedback': this.positiveFeedback,
          'Negative Feedback': this.negativeFeedback,
          'Suggestions': this.contentSuggestions
        };
      },
      error: (err) => {
        this.notificationService.notify('error', err.error.message);
        console.log(err);
      },
    })
  }

  toggleCard(card) {
    card.expanded = !card.expanded;
  }

  // Function to check if the view is in mobile mode
  isMobileView(): boolean {
    const screenWidth = window.innerWidth;
    return screenWidth < 768; // Adjust breakpoint as needed
  }
}
