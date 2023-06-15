import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.userService.setUser(user);
      this.user = this.userService.getUser();
      this.loggedIn = user != null;
      this.router.navigate(['dashboard']);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
}
