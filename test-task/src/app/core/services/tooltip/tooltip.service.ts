import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {
  private tooltipSubject = new Subject<{
    message: string;
    isSuccess: boolean;
  }>();

  public tooltip$ = this.tooltipSubject.asObservable();

  public showTooltip(message: string, isSuccess: boolean): void {
    this.tooltipSubject.next({ message, isSuccess });
  }

}
