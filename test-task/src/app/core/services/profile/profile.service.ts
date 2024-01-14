import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileDataSubject = new Subject<{
    userId: number,
    userName: string,
    userAvatar: string,
    userRole: number
  }>();

  public profileData$ = this.profileDataSubject.asObservable();

  public showProfileData(
    userId: number,
    userName: string,
    userAvatar: string,
    userRole: number
    ) {
     this.profileDataSubject.next({userId, userName, userAvatar, userRole});
  }

}
