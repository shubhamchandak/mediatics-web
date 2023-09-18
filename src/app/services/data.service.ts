import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { ITypeCount, IVideoDetails } from '../model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl: string = environment.apiBaseUrl;

  loadedVideoDetails: IVideoDetails = null;

  constructor(private http: HttpClient) {}

  loadVideo(videoDetails: IVideoDetails) {
    this.loadedVideoDetails = videoDetails;
  }

  getloadedVideo() {
    return this.loadedVideoDetails;
  }

  getIntentCount(): Observable<ITypeCount[]> {
    const params = {'videoId': this.getloadedVideo().videoId};
    return this.http.get(this.baseUrl + "/data/getIntentCount", { params: params }).pipe(map(x => x["data"]));
  }

  getOffensiveCount(): Observable<ITypeCount[]> {
    const params = {'videoId': this.getloadedVideo().videoId};
    return this.http.get(this.baseUrl + "/data/getOffensiveCount", { params: params }).pipe(map(x => x["data"]));
  }

  getSentimentCount(): Observable<ITypeCount[]> {
    const params = {'videoId': this.getloadedVideo().videoId};
    return this.http.get(this.baseUrl + "/data/getSentimentCount", { params: params }).pipe(map(x => x["data"]));
  }

  getCommentsAnalytics() {
    return this.http.get(this.baseUrl + "/getCommentsAnalytics");
  }

  getItemDashboardData() {
    return this.http.get(this.baseUrl + "/getItemDashboardData");
  }

  getUserVideos(): Observable<IVideoDetails[]> {
    return this.http.get(this.baseUrl + "/data/getUserVideos").pipe(map(x => x["data"]));
  }

  processVideo(videoUrl: string) {
    return this.http.post(this.baseUrl + "/data/processVideo", {videoUrl: videoUrl})
  }
}
