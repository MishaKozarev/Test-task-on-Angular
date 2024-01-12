import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UserDataSignin, UserSigninResponse } from '../../models/user-data.models';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public inputType: string = "password";
  public isSubmitForm: boolean = false;
  public message: string = '';
  public authForm!: FormGroup<{
    email: FormControl;
    password: FormControl;
  }>
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
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
        .subscribe({
          next: (data) => this.handleSigninSuccess(data as UserSigninResponse),
          error: (err) => this.handleSigninError(err)
        })
    }
  }

  private handleSigninSuccess(data: UserSigninResponse): void {
    this.isSubmitForm = false;
    this.message = data.data.userInfo.userName;
  }

  private handleSigninError(err: HttpErrorResponse): void {
    this.isSubmitForm = false;
    this.message = err.error.message;
  }

}
