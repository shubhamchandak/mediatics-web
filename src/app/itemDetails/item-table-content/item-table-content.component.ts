import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-item-table-content',
  templateUrl: './item-table-content.component.html',
  styleUrls: ['./item-table-content.component.css']
})
export class ItemTableContentComponent implements OnInit {
  tableDataSource: any;
  originalDataSource: any;
  // customers: any[];

  // representatives: any[];

  // statuses: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  SENTIMENTS = ['Positive', 'Negative', 'Neutral']

  customFilters = {
    Sentiment: [],
    Offensive: [],
    Intent: []
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getCommentsAnalytics().subscribe({
      next: (data) => {
      //this.data = data;
      this.originalDataSource = data as any[];
      console.log(data);
      this.tableDataSource = this.originalDataSource;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  log(val) {
    console.log(val)
  }

  customFilter(field: string, arr: string[]) {
    this.log(arr);
    if(!(['Sentiment', 'Intent', 'Offensive'].some(x => x == field))) {
      console.log(`Invalid filter for field - ${field}`);
      return;
    }
    this.customFilters[field] = arr;
    this.tableDataSource = this.originalDataSource;
    Object.keys(this.customFilters).forEach(x => {
      if(this.customFilters[x].length == 0) {
        return;
      }
      this.tableDataSource = this.tableDataSource.filter(a => this.customFilter[x].indexOf(a[x]) != 1);
    })
  }

  onImgError(event) { 
    event.target.src = "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
}

}
