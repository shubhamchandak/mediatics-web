import { Component, OnInit } from '@angular/core';
import { IGetCommentsRequest } from 'src/app/model';
import { DataService } from 'src/app/services/data.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.css']
})
export class ItemTableComponent implements OnInit {
  tableDataSource: any;
  originalDataSource: any;
  // customers: any[];

  // representatives: any[];

  // statuses: any[];
  rowsPerPageOption: number[] = [10,25,50];
  rows: number = this.rowsPerPageOption[0];
  first: number = 0;
  totalRecords: number = 0;

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  SENTIMENTS = ['Positive', 'Negative', 'Neutral'];

  constructor(
    private dataService: DataService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    const getCommentsRequest: IGetCommentsRequest = {
      recordsPerPage: this.rows,
      pageNumber: 1,
      columnFilters: [],
    }
    this.getComments(getCommentsRequest);
  }

  log(val) {
    console.log(val)
  }

  onImgError(event) { 
    event.target.src = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
  }

  onLazyLoad(event) {
    this.rows = event["rows"];
    this.first = event["first"];
    const getCommentsRequest: IGetCommentsRequest = {
      recordsPerPage: this.rows,
      pageNumber: 1 + this.first/this.rows,
      columnFilters: Object.keys(event["filters"]).map(k => ({field: k, values: event["filters"][k][0]["value"]}))
    }
    this.getComments(getCommentsRequest);
  }

  getComments(getCommentsRequest: IGetCommentsRequest) {
    this.dataService.getComments(getCommentsRequest).subscribe({
      next: (data) => {
        data["comments"].map(c => {
          c["Intent"] = this.formatStringToFirstLetterCaps(c["Intent"]);
          c["Sentiment"] = this.formatStringToFirstLetterCaps(c["Sentiment"]);
          c["Offensive"] = this.formatStringToFirstLetterCaps(c["Offensive"]);
        })
        this.originalDataSource = data['comments'] as any[];
        this.totalRecords = data["totalCount"];
        this.tableDataSource = this.originalDataSource;
      },
      error: error => {
        this.notificationService.notify('error', error.error.message);
        console.log(error);
      }
    });
  }

  formatStringToFirstLetterCaps(val: string) {
    let stringArr = val.split("_");
    stringArr = stringArr.map(str => {
      if(str && str.length > 0) {
        str = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }
      return str;
    })
    return stringArr.join(" ");
  }

}
