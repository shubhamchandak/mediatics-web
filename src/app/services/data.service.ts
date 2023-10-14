import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, map, of } from 'rxjs';
import { IGetCommentsRequest, ITypeCount, IVideoDetails } from '../model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl: string = environment.apiBaseUrl;

  loadedVideoDetails: IVideoDetails = null;
  userVideoList: IVideoDetails[];

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
    if(this.userVideoList) {
      return of(this.userVideoList);
    }
    return this.http.get(this.baseUrl + "/data/getUserVideos", { withCredentials: true }).pipe(map(x => {
      this.userVideoList = x["data"]?.reverse();
      return this.userVideoList;
    }));
  }

  processVideo(videoUrl: string) {
    return this.http.post(this.baseUrl + "/data/processVideo", {videoUrl: videoUrl}, { withCredentials: true }).pipe(map(x => x["data"]));
  }

  getVideoDetails(videoId: string) {
    const params = {'videoId': videoId};
    return this.http.get(this.baseUrl + "/data/getVideoDetails", { params: params, withCredentials: true }).pipe(map(x => x["data"]));
  }

  getSummary() {
    const params = {'videoId': this.getloadedVideo().videoId};
    return this.http.get(this.baseUrl + "/data/getSummary", { params: params, withCredentials: true }).pipe(map(x => x["data"]));
  }

  getUserDetails() {
    return this.http.get(this.baseUrl + "/user/getUserDetails", { withCredentials: true }).pipe(map(x => x["data"]));
  }

  createNewUser() {
    return this.http.post(this.baseUrl + "/user/createNewUser", {}, { withCredentials: true })
  }
}
