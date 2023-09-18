import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { faChartLine, faCloudArrowDown, faLightbulb, faSearch, faTable } from '@fortawesome/free-solid-svg-icons';
import { IVideoDetails } from 'src/app/model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.getUserVideos()
  }

  faSearch = faSearch;
  faLightbulb = faLightbulb;
  faChartLine = faChartLine;
  faTable = faTable;
  faDownload = faCloudArrowDown;
  showSpinner: boolean = false;
  showError: boolean = false;
  userVideos: IVideoDetails[] = [];

  submitVideo(form: NgForm) {
    if(!form.valid) {
      this.showError = true;
      return;
    }
    this.showError = false;
    this.showSpinner = true;
    this.dataService.processVideo(form.value["videoUrl"]).subscribe({
      next: (data) => {
        console.log("data: ", data);
      },
      error: (err) => {
        console.log("error: ", err);
      },
    })
  }

  getUserVideos() {
    this.dataService.getUserVideos().subscribe({
      next: (data) => {
        this.userVideos = data;
        console.log(this.userVideos);
      },
      error: (err) => {
        console.log("api error: ", err);
      }
    })
  }

  dashboardClick(videoDetails: IVideoDetails) {
    console.log('click click click', videoDetails);
    this.dataService.loadVideo(videoDetails);
    this.router.navigate(['item-dashboard']);
  }

}
