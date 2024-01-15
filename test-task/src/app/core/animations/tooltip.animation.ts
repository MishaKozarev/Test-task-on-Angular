import { animate, state, style, transition, trigger } from '@angular/animations';

export const tooltipAnimation =
  trigger('tooltipAnimation', [
    state('void', style({
      opacity: 0,
      transform: 'translateY(140px)'
    })),
    transition(':enter, :leave', [
      animate('0.5s cubic-bezier(0.25, 0.8, 0.25, 1)')
    ]),
    state('visible', style({
      opacity: 1,
      transform: 'translateY(70px)'
    })),
  ]);