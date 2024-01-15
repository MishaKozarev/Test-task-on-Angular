import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { getProfileAction } from 'src/app/store/actions/profile.actions';
import { alertAddAlertAction } from 'src/app/store/actions/tooltip.actions';
import { ErrorsDescription } from '../../constants/errors.enum';
import { TokenDescription } from '../../constants/token.enum';
import { UserDataSignin, UserSigninResponseSuccess } from '../../models/user-data.models';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public inputType: string = "password";
  public isSubmitForm: boolean = false;
  public message: string = '';
  public authForm!: FormGroup<{
    email: FormControl;
    password: FormControl;
  }>
  public isResponseSuccess = false;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private cookieService: CookieService,
    private store: Store,
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public get email() {
    return this.authForm.get('email') as FormControl;
  }

  public get password() {
    return this.authForm.get('password') as FormControl;
  }

  public toggleInputType(): void {
    this.inputType = (this.inputType === "password") ? "text" : "password";
  }

  public onSubmitForm(): void {
    if (this.authForm.status === 'VALID') {
      const userData: UserDataSignin = {
        login: this.authForm.value.email,
        password: this.authForm.value.password
      };
      this.authService.sendSigninRequest(userData)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (data) => this.handleSigninSuccess(data as UserSigninResponseSuccess),
          error: (err) => this.handleSigninError(err)
        })
    }
  }

  private handleSigninSuccess(data: UserSigninResponseSuccess): void {
    this.isSubmitForm = false;
    this.message = ErrorsDescription.SUCCESS;
    this.showTooltip(this.message, 'green');
    this.isResponseSuccess = true;
    this.saveCookies(data);
    this.saveProfileToStore(data);
    this.routingToDashboard();
  }

  private saveProfileToStore(data: UserSigninResponseSuccess) {
    const profileDataForAction = {
      profile: {
        userId: data.userInfo.userId,
        userName: data.userInfo.userName,
        userAvatar: data.userInfo.userAvatar,
        userRole: data.userInfo.userRole
      }
    }
    this.store.dispatch(getProfileAction(profileDataForAction));
  }

  private handleSigninError(err: HttpErrorResponse): void {
    this.isSubmitForm = false;
    if (err.error.errors) {
      this.message = String(err.error.errors);
    } else if (err.status === 0){
      this.message = ErrorsDescription.NO_CONNECT;
    } else {
      this.message = ErrorsDescription.ERROR_SERVER;
    }
    this.showTooltip(this.message, 'red');
    this.isResponseSuccess = false;
    this.authForm.reset();
  }

  private showTooltip(message: string, color: string) {
    this.store.dispatch(
      alertAddAlertAction({
        tooltip: {
          message: message,
          color: color,
          id: window.crypto.randomUUID()
        }
      })
    );
  }

  private saveCookies(data: UserSigninResponseSuccess): void {
    this.cookieService.set(TokenDescription.TOKEN, data.tokens.token);
    this.cookieService.set(TokenDescription.TOKEN, data.tokens.refreshToken);
  }

  private routingToDashboard(): void {
    this.route.navigate(['/dashboard']);
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
