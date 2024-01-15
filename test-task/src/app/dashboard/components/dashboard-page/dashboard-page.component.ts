import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/core/models/profile.models';
import { alertAddAlertAction } from 'src/app/store/actions/tooltip.actions';
import { TooltipItem } from 'src/app/store/models/tooltip.models';
import { selectProfile } from 'src/app/store/selectors/profile.selectors';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  public profile$: Observable<UserProfile | null> | undefined;
  public color$: Observable<TooltipItem | null> | undefined;
  public condition = '';

  constructor(
    private store: Store,

  ) { }

  public ngOnInit(): void {
    this.profile$ = this.store.select(selectProfile);
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
