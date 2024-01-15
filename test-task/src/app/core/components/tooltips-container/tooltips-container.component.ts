import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TooltipItem } from 'src/app/store/models/tooltip.models';
import { selectAlertNotifies } from 'src/app/store/selectors/tooltip.selectors';

@Component({
  selector: 'app-tooltips-container',
  templateUrl: './tooltips-container.component.html',
  styleUrls: ['./tooltips-container.component.scss']
})
export class TooltipsContainerComponent implements OnInit {
  public alerts$!: Observable<TooltipItem[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.alerts$ = this.store.select(selectAlertNotifies);
  }

}
