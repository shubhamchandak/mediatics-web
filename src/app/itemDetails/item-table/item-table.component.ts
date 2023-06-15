import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';

export enum columns {
  comment = 'comment',
  sentiment = 'sentiment',
  intent = 'intent',
  username = 'username',
  offensive = 'offensive',
}

@Component({
  selector: 'app-item-table',
  templateUrl: './item-table.component.html',
  styleUrls: ['./item-table.component.css'],
})

/**
 * @title Table dynamically changing the columns displayed
 */
export class ItemTableComponent implements OnInit {
  constructor(private dataService: DataService) {}

  displayedColumns: string[] = [
    columns.username,
    columns.comment,
    columns.sentiment,
    columns.intent,
    columns.offensive,
  ];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  //data: any = ELEMENT_DATA;
  columns = columns;
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      //this.data = data;
      this.dataSource.data = data as any[];
      console.log(data);
    });
  }

  addColumn() {
    const randomColumn = Math.floor(
      Math.random() * this.displayedColumns.length
    );
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  shuffle() {
    let currentIndex = this.columnsToDisplay.length;
    while (0 !== currentIndex) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap
      let temp = this.columnsToDisplay[currentIndex];
      this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
      this.columnsToDisplay[randomIndex] = temp;
    }
  }

  announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    // if (sortState.direction) {
    //   this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    // } else {
    //   this._liveAnnouncer.announce('Sorting cleared');
    // }
  }
}
