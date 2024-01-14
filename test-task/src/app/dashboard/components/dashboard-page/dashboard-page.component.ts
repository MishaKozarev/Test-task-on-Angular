import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/core/models/profile.models';
import { selectProfile } from 'src/app/store/selectors/profile.selectors';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  public profile$: Observable<UserProfile | null> | undefined;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.profile$ = this.store.select(selectProfile);
  }
}
