import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public inputType: string = "password";
  public authForm!: FormGroup<{
    email: FormControl;
    password: FormControl;
  }>
  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
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

}
