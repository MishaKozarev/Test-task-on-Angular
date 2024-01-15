import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TooltipItem } from 'src/app/store/models/tooltip.models';
import { selectAlertNotifies } from 'src/app/store/selectors/tooltip.selectors';
import { tooltipAnimation } from '../../animations/tooltip.animation';


@Component({
  selector: 'app-tooltips-container',
  templateUrl: './tooltips-container.component.html',
  styleUrls: ['./tooltips-container.component.scss'],
  animations: [tooltipAnimation]
})

export class TooltipsContainerComponent implements OnInit {
  public tooltipItems$!: Observable<TooltipItem[]>;

  constructor(private store: Store) { }

  public ngOnInit(): void {
    this.tooltipItems$ = this.store.select(selectAlertNotifies);
  }

}
