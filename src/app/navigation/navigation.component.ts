import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../services/data.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit{

  constructor(private authService: SocialAuthService,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService,
    private dataService: DataService,
    private route: ActivatedRoute) {}

  private scrollPosition = 0;
  user: SocialUser;
  loggedIn: boolean;
  cookieDomain: string;

  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Check if the user is scrolling down or up
    if (scrollTop > this.scrollPosition) {
      // Scrolling down, add the transparent background class
      this.toggleTransparentBg(true);
    } else {
      // Scrolling up, remove the transparent background class
      this.toggleTransparentBg(false);
    }

    this.scrollPosition = scrollTop;
  }

  private toggleTransparentBg(add: boolean) {
    const toolbar = document.querySelector('.mat-toolbar') as HTMLElement;

    if (add) {
      toolbar.classList.add('transparent-bg');
    } else {
      toolbar.classList.remove('transparent-bg');
    }
  }

  ngOnInit(): void {
    this.userService.setLoggedIn(this.cookieService.get("id_token").length > 0);
    if(this.userService.isLoggedIn()) {
      this.getUserDetails();
    }
    this.enableLoginFlow();
  }

  enableLoginFlow() {
    this.authService.authState.subscribe((user) => {
      // console.log("auth satge change: ", user);
      this.menuTrigger.closeMenu();
      this.userService.setUser(user);
      this.user = this.userService.getUser();
      this.userService.setLoggedIn(user != null);
      if(this.userService.isLoggedIn()) {
        this.setCookie();
        // this.dataService.getUserDetails()
        // this.router.navigate(['home']);
        this.getUserDetails();
      } else {
        this.cookieService.delete("id_token");
        this.router.navigate(['/']);
      }
    });
  }

  setCookie(): void {
    const currentHost = window.location.host;
    const hostParts = currentHost.split(".");
    if(hostParts.length > 1) {
      this.cookieDomain = `.${hostParts[hostParts.length-2]}.${hostParts[hostParts.length-1]}`;
    } else {
      this.cookieDomain = 'localhost';
    }
    const cookieExpiry = new Date();
    cookieExpiry.setHours(cookieExpiry.getHours() + 1);
    this.cookieService.set("id_token", this.user.idToken, {domain: this.cookieDomain, expires: cookieExpiry, secure: this.cookieDomain != 'localhost' });
  }

  getUserDetails(): void {
    this.dataService.getUserDetails().subscribe({
      next: (data) => {
        const queryParams = this.route.snapshot.queryParamMap;
        this.router.navigate([queryParams.get('returnUrl') || 'home']);
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
        } else {
          console.log("error: ", err);
        }
      }
    });
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

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  logout(): void {
    this.menuTrigger.closeMenu();
    const cookieExpiry = new Date();  //expire cokie immediately
    this.cookieService.set('id_token', 'logout', {domain: this.cookieDomain, expires: cookieExpiry, secure: this.cookieDomain != 'localhost' });
    this.userService.setLoggedIn(false);
    if(this.userService.getUser()) {
      this.signOut();
    }
    this.router.navigate(['/']);
  }
}
