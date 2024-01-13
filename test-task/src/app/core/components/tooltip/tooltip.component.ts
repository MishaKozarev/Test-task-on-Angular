import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TooltipService } from '../../services/tooltip/tooltip.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, OnDestroy {
  public message: string = '';
  public isResponseSuccess = false;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private tooltipService: TooltipService
  ) {}

  public ngOnInit(): void {
    this.initTooltipService();
  }

  private initTooltipService() {
    this.tooltipService.tooltip$
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe(({message, isSuccess}) => {
      this.message = message;
      this.isResponseSuccess = isSuccess;
      setTimeout(() => {
        this.message = '';
        this.isResponseSuccess = false;
      }, 15000);
    });
  }

  public closedTooltip(): void {
    this.message = '';
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
