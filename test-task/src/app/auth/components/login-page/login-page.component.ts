import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TooltipService } from 'src/app/core/services/tooltip/tooltip.service';
import { UserDataSignin, UserSigninResponse, UserSigninResponseSuccess } from '../../models/user-data.models';

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
    private tooltipService: TooltipService,
    private cookieService: CookieService
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

  get email() {
    return this.authForm.get('email') as FormControl;
  }

  get password() {
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
    this.message = 'Вы успешно вошли';
    this.tooltipService.showTooltip(this.message, true);
    this.isResponseSuccess = true;
    this.saveCookies(data);
    this.routingToDashboard();
  }

  private handleSigninError(err: HttpErrorResponse): void {
    this.isSubmitForm = false;
    if (err.error.errors) {
      this.message = String(err.error.errors);
    } else if (err.status === 0){
      this.message = 'Отсутствует соединение с интернетом';
    } else {
      this.message = 'Ошибка сервера';
    }
    this.tooltipService.showTooltip(this.message, false);
    this.isResponseSuccess = false;
    this.authForm.reset();
  }

  private saveCookies(data: UserSigninResponseSuccess): void {
    this.cookieService.set('token', data.tokens.token);
    this.cookieService.set('refreshToken', data.tokens.refreshToken);
  }

  private routingToDashboard() {
    this.route.navigate(['/dashboard']);
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
