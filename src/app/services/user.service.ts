import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: SocialUser;
  private loggedIn: boolean;

  constructor() {}

  setUser = (user: SocialUser) => {
    this.user = user;
  };

  getUser = (): SocialUser => {
    return this.user;
  };

  setLoggedIn = (status: boolean) => {
    this.loggedIn = status;
  }

  isLoggedIn = (): boolean => {
    return this.loggedIn;
  }

}
