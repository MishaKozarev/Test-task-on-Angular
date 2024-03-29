import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/auth/models/user-data.models';
import { TooltipData } from 'src/app/core/models/tooltip.models';
import { alertAddAlertAction } from 'src/app/store/actions/tooltip.actions';
import { selectProfile } from 'src/app/store/selectors/profile.selectors';
import { TooltipButtonText, TooltipColor, TooltipMessages } from '../../constants/tooltip-data.enum';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  public profile$: Observable<UserInfo | null> | undefined;
  public color$: Observable<TooltipData | null> | undefined;
  public messageForm!: FormGroup<{message: FormControl}>;
  public messageValue!:string;
  public tooltipMessages = TooltipMessages;
  public tooltipColor = TooltipColor;
  public buttonText = TooltipButtonText;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.profile$ = this.store.select(selectProfile);
    this.initForm();
  }

  private initForm(): void {
    this.messageForm = this.fb.group({
      message: ['', Validators.required],
    });
  }

  public get message() {
    return this.messageForm.get('message') as FormControl;
  }

  public onSubmitForm(): void {
    if (!this.messageForm.invalid) {
      const messageValue = this.message.value;
      this.messageValue = messageValue;
    }
    this.store.dispatch(
      alertAddAlertAction({
        tooltip: {
          message: this.messageValue,
          color: TooltipColor.gold,
          id: window.crypto.randomUUID()
        }
      })
    );
    this.messageForm.reset();
  }

  public showTooltip(message: string, color: string): void {
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
}
