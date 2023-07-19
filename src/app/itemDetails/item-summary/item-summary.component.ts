import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-item-summary',
  templateUrl: './item-summary.component.html',
  styleUrls: ['./item-summary.component.css']
})
export class ItemSummaryComponent implements OnInit {
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        console.log('hello');
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
  positiveFeedback = [
    ['Compliments on video quality and editing: ', 'Many viewers appreciate the high production value of your videos and commend your editing skills. They find your content visually appealing and well-crafted.'],
    ['Engaging storytelling: ', 'Commenters express enjoyment and captivation by the stories you tell in your videos. They find your narratives compelling, well-structured, and easy to follow.'],
    ['Sincerity and authenticity: ', 'People appreciate your genuine and down-to-earth approach in your videos. They perceive you as sincere, relatable, and different from other YouTube marketing gurus.'],
    ['Support and encouragement: ', 'Many viewers offer words of encouragement and support, expressing their belief in your potential and wishing you success. They mention being fans of your work and express appreciation for the effort you put into creating content.'],
    ['Enjoyment and entertainment value: ','People state that they enjoy watching your videos and find them entertaining. They express positive emotions and describe your content as engaging and interesting.'],
    ['Recognition of hard work: ','Several comments acknowledge the effort and dedication you put into creating your videos. Viewers commend your work ethic and perseverance, recognizing the commitment it takes to produce content regularly.']
  ];

  negativeFeedback = [
    ['Disappointment with view count: ','Some viewers express disappointment or surprise at the relatively low view counts on your videos. They may have expected your content to receive more views based on its quality or their own perception of its value.'],
    ['Skepticism about the experiment: ','A few commenters question the authenticity or effectiveness of the TikTok experiment you conducted. They express skepticism about the results and suggest that there may have been other factors at play.'],
    ['Dissatisfaction with TikTok\'s algorithm: ','Several viewers express frustration or dissatisfaction with TikTok\'s algorithm and its impact on content creators. They believe that the algorithm is unpredictable, unfair, or biased in favor of certain types of content.'],
    ['Comparison to other creators: ','Some comments compare your content or success to other creators, either positively or negatively. They may express admiration for other creators or suggest that you could learn from their strategies or approaches.'],
    ['Criticism of frequency or style: ','A few viewers comment on the frequency of your uploads, suggesting that posting too frequently may have negatively impacted the performance of your videos. Additionally, there are comments about specific stylistic choices, such as saying "ring my subscribe button," that some viewers find off-putting.'],
    ['Desire for more specific content: ','Certain comments express a desire for more focused or niche content, suggesting that you may need to narrow down your content topics or cater to specific audiences to attract more viewers.'],
  ];

  contentSuggestions = [
    ['Request for specific topics: ','Some viewers suggest or request specific topics they would like to see you cover in your videos. They may be interested in certain subjects or areas of expertise that they believe would make engaging content.'],
    ['Advice on content strategy: ','A few commenters offer advice or suggestions on how to improve your content strategy. They may recommend trying different types of videos, experimenting with new formats, or focusing on specific trends or themes.'],
    ['Desire for more storytelling: ','Several viewers express appreciation for the storytelling aspect of your videos and encourage you to continue incorporating storytelling elements into your content. They find it compelling and engaging.'],
    ['Expectation of consistency: ','Some commenters mention their expectation for consistent content from you. They express their enjoyment of your videos and hope to see more frequent uploads or a regular posting schedule.']
  ];

  hotTopics = [
    ['Compliments and praise for your videos: ','Several comments express appreciation for your content, describing it as compelling, well-edited, and high-quality. People are complimenting your storytelling skills and expressing enjoyment of your videos.'],
    ['TikTok algorithm and views: ','Many comments mention TikTok\'s algorithm and discuss the unpredictability of views on the platform. Some mention experiences with shadowbanning or video takedowns, while others discuss the challenges of gaining followers and getting views.'],
    ['Comparison to other creators: ','Some comments compare your videos or content to other creators, such as mentioning similarities to Ryan Trahan\'s Metaverse video or referencing specific YouTubers like Captain Disillusion and Vsauce.'],
    ['Personal experiences and stories: ','Several comments share personal experiences related to TikTok, YouTube, or content creation. People share their own struggles or successes on the platforms, talk about their aspirations, or provide insights based on their own journeys.'],
    ['Engagement with your content: ','Many comments express support, encouragement, and interest in your videos. People mention subscribing, wanting shoutouts, or being fans of your work. They also discuss specific moments in your videos or ask questions about your process.'],
    ['Miscellaneous topics: ','There are a few comments that touch on unrelated topics, such as religious messages, references to specific scenes in your video, discussions about TikTok\'s data sharing, and comments about your location or appearance.']
  ]

  constructor(private breakpointObserver: BreakpointObserver, private dataService: DataService) {
  }

  ngOnInit(): void {

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
