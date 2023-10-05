import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private authService: SocialAuthService,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      console.log(user);
      this.userService.setUser(user);
      this.user = this.userService.getUser();
      this.loggedIn = user != null;
      if(this.loggedIn) {
        console.log("id_token: ", this.user.idToken);
        this.setCookie();
        // this.dataService.getUserDetails()
        // this.router.navigate(['home']);
        this.login();
      } else {
        this.cookieService.delete("id_token");
        this.router.navigate(['login']);
      }
    });
    // this.authService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then(x => console.log("aceess_token: ", x));
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID)
  }

  setCookie(): void {
    const currentHost = window.location.host;
    const hostParts = currentHost.split(".");
    if(hostParts.length > 1) {
      this.cookieService.set("id_token", this.user.idToken, {domain: `.${hostParts[hostParts.length-2]}.${hostParts[hostParts.length-1]}`});
    } else {
      this.cookieService.set("id_token", this.user.idToken);
    }
  }

  login(): void {
    this.dataService.getUserDetails().subscribe({
      next: (data) => {
        this.router.navigate(['home']);
      },
      error: (err) => {
        if(err.error && err.error.message && err.error.message.errorCode == 404) {
          this.dataService.createNewUser().subscribe({
            next: (data) => {
              this.router.navigate(['home']);
            },
            error: (err) => {
              console.log("error creating user account!", err)
              this.router.navigate(['error']);
            } 
          })
        }
      }
    })
  }
}
