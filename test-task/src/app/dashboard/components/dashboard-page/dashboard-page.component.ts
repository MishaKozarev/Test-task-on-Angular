import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/core/models/profile.models';
import { alertAddAlertAction } from 'src/app/store/actions/tooltip.actions';
import { TooltipItem } from 'src/app/store/models/tooltip.models';
import { selectProfile } from 'src/app/store/selectors/profile.selectors';
import { TooltipButtonText, TooltipColor, TooltipMessages } from '../../constants/tooltip-data.enum';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  public profile$: Observable<UserProfile | null> | undefined;
  public color$: Observable<TooltipItem | null> | undefined;
  public messageForm!: FormGroup<{message: FormControl}>;
  public messageValue!:string;
  public tooltipMessages = {
    error: TooltipMessages.error,
    warning: TooltipMessages.warning,
    success: TooltipMessages.success
  };
  public tooltipColor = {
    red: TooltipColor.red,
    gold: TooltipColor.gold,
    green: TooltipColor.green,
  }
  public buttonText = {
    error: TooltipButtonText.error,
    message: TooltipButtonText.message,
    success: TooltipButtonText.success,
    warning: TooltipButtonText.warning,
  }

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
