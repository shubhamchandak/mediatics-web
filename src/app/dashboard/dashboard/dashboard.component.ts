import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faChartLine, faCloudArrowDown, faLightbulb, faSearch, faSpinner, faTable } from '@fortawesome/free-solid-svg-icons';
import { IVideoDetails } from 'src/app/model';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router, 
    private dataService: DataService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getUserVideos();
  }

  faSearch = faSearch;
  faLightbulb = faLightbulb;
  faChartLine = faChartLine;
  faTable = faTable;
  faDownload = faCloudArrowDown;
  faSpinner = faSpinner;
  showSpinner: boolean = false;
  showError: boolean = false;
  userVideos: IVideoDetails[] = [];
  pendingVideoChecker: any = {};

  submitVideo(form: NgForm) {
    if(!form.valid) {
      // this.showError = true;
      this.notificationService.notify('error', 'Invalid youtube video URL');
      return;
    }
    const regex: RegExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/
    const match = form.value["videoUrl"].match(regex);
    const videoId = match[6]
    // this.showError = false;
    // this.showSpinner = true;
    this.dataService.processVideo(form.value["videoUrl"]).subscribe({
      next: (data) => {
        this.notificationService.notify('info', typeof data === 'string' ? data : 'Your request is in progress!');
        this.pendingVideoCheckerTask(videoId);
      },
      error: (err) => {
        console.log("error: ", err);
        this.notificationService.notify('error', err.error.message);
      },
    })
  }

  pendingVideoCheckerTask(videoId: string) {
    if(this.userVideos.some(x => x.videoId == videoId)) {
      return;
    }
    const pendingVideo: IVideoDetails = {videoId: videoId} 
    this.userVideos = [pendingVideo].concat(this.userVideos);
    if(this.pendingVideoChecker[videoId]) {
      clearInterval(this.pendingVideoChecker[videoId]);
    }
    this.pendingVideoChecker[videoId] = setInterval(() => this.checkVideoStatus(videoId), 10000);
  }

  checkForPendingVideos() {
    this.dataService.getPendingVideoIds().subscribe({
      next: (data) => {
        if(data.length < 1) return;
        data = data.map(x => {
          this.pendingVideoCheckerTask(x);
        });
      },
      error: (err) => {
        console.log("Error: ", err);
      }
    })
  }

  checkVideoStatus(videoId: string) {
    this.dataService.getVideoDetails(videoId).subscribe({
      next: (data) => {
        const index = this.userVideos.findIndex(x => x.videoId == videoId);
        this.userVideos[index] = data;
        if(data?.summary_status) {
          this.notificationService.notify('info', "Your request has been processed");
          clearInterval(this.pendingVideoChecker[videoId]);
        }
        console.log("videoStatus: ", data);
      },
      error: (err) => {
        console.log("videoStatusError: ", err);
      }
    })
  }

  getUserVideos(refresh?: string) {
    this.dataService.getUserVideos().subscribe({
      next: (data) => {
        this.userVideos = data;
        this.checkForPendingVideos();
      },
      error: (err) => {
        console.log("api error: ", err);
      }
    })
  }

  dashboardClick(videoDetails: IVideoDetails) {
    this.dataService.loadVideo(videoDetails);
    this.router.navigate(['item-dashboard']);
  }

  commentsClick(videoDetails: IVideoDetails) {
    this.dataService.loadVideo(videoDetails);
    this.router.navigate(['comments']);
  }

  summaryClick(videoDetails: IVideoDetails) {
    this.dataService.loadVideo(videoDetails);
    this.router.navigate(['summary']);
  }

}
