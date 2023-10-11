import { Injectable } from '@angular/core';
import { NotifierOptions, NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifierService: NotifierService) { }

  notify(type: string, message: string, id?: string) {
    this.hideAll();
    if(id){
      this.notifierService.notify(type, message, id);
    } else {
      this.notifierService.notify(type, message);
    }
  }

  hide(id: string) {
    this.notifierService.hide(id);
  }

  hideNewest() {
    this.notifierService.hideNewest();
  }

  hideOldest() {
    this.notifierService.hideOldest();
  }

  hideAll() {
    this.notifierService.hideAll();
  }

}

export const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12,
    },
    vertical: {
      position: 'top',
      distance: 75,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};
