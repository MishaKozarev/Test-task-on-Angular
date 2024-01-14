import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDataSignin, UserSigninResponse, UserSigninResponseSuccess } from 'src/app/auth/models/user-data.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly urlSignin: string = 'http://51.158.107.27:82/api/login';
  constructor(private http: HttpClient) {}

  public sendSigninRequest(userData: UserDataSignin): Observable<UserSigninResponseSuccess> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<UserSigninResponseSuccess>(this.urlSignin, userData, {headers});
  }
}
