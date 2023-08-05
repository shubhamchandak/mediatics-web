import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faSearch = faSearch
  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (data) => {
        console.log("api_data: ", data);
      },
      error: (err) => {
        console.log("api error: ", err);
      }
    })
  }

  showSpinner: boolean = false;

  submit() {
    console.log("hello")
    this.showSpinner = true;
    setTimeout(() => this.router.navigate(['/item-dashboard']), 3000);
  }

}
