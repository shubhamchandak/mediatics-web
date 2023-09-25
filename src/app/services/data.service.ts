import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { IGetCommentsRequest, ITypeCount, IVideoDetails } from '../model';

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
    return this.http.get(this.baseUrl + "/data/getIntentCount", { params: params, withCredentials: true }).pipe(map(x => x["data"]));
  }

  getOffensiveCount(): Observable<ITypeCount[]> {
    const params = {'videoId': this.getloadedVideo().videoId};
    return this.http.get(this.baseUrl + "/data/getOffensiveCount", { params: params, withCredentials: true }).pipe(map(x => x["data"]));
  }

  getSentimentCount(): Observable<ITypeCount[]> {
    const params = {'videoId': this.getloadedVideo().videoId};
    return this.http.get(this.baseUrl + "/data/getSentimentCount", { params: params, withCredentials: true }).pipe(map(x => x["data"]));
  }

  getComments(getCommentsRequest: IGetCommentsRequest) {
    getCommentsRequest.videoId = this.getloadedVideo().videoId;
    const body = getCommentsRequest;
    return this.http.post(this.baseUrl + "/data/getComments", body, {withCredentials: true}).pipe(map(x => x["data"]));
  }

  getItemDashboardData() {
    return this.http.get(this.baseUrl + "/getItemDashboardData");
  }

  getUserVideos(): Observable<IVideoDetails[]> {
    return this.http.get(this.baseUrl + "/data/getUserVideos", { withCredentials: true }).pipe(map(x => x["data"]));
  }

  processVideo(videoUrl: string) {
    return this.http.post(this.baseUrl + "/data/processVideo", {videoUrl: videoUrl}, { withCredentials: true })
  }
}
