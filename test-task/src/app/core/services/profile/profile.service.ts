import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserInfo } from 'src/app/auth/models/user-data.models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileDataSubject = new Subject<UserInfo>();

  public profileData$ = this.profileDataSubject.asObservable();

  public showProfileData(
    userId: number,
    userName: string,
    userAvatar: string,
    userRole: number
  ): void {
     this.profileDataSubject.next({userId, userName, userAvatar, userRole});
  }

}
