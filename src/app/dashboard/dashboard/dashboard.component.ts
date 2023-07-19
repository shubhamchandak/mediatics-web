import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faSearch = faSearch
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  showSpinner: boolean = false;

  submit() {
    console.log("hello")
    this.showSpinner = true;
    setTimeout(() => this.router.navigate(['/item-dashboard']), 3000);
  }

}
