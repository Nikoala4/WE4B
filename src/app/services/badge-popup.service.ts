import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BadgeDescriptor } from '../../nooble/api-objs/BadgeDescriptor';

@Injectable({
  providedIn: 'root'
})
export class BadgePopupService {

  badgePopupRequest = new Subject<BadgeDescriptor | null>()

  openPopup(name: string, level: number)
  {
    this.badgePopupRequest.next([name, level]);
  }

  closePopup()
  {
    this.badgePopupRequest.next(null);
  }
}
