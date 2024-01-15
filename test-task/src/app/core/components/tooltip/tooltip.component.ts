import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { alertDeleteNotifyAction } from 'src/app/store/actions/tooltip.actions';

interface TooltipData {
  message: string;
  color: string;
  id: string;
}

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  @Input() public tooltipData!: TooltipData;

  constructor(
    private store: Store,
  ) {}

  public ngOnInit(): void {
    setTimeout(() => this.deleteNotify(), 15000);
  }

  public deleteNotify() {
    this.store.dispatch(alertDeleteNotifyAction({ id: this.tooltipData.id }));
  }

}
