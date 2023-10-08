import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/services/data.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  returnUrl: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loggedIn = this.userService.isLoggedIn();
  }

  ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    this.returnUrl = queryParams.get('returnUrl');
    this.router.navigate([this.returnUrl || 'home']);
  }

  
}
