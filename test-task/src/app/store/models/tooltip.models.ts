export interface TooltipItem {
    message: string;
    color: string;
    id: string;
  }

  export interface TooltipState {
    tooltips: TooltipItem[];
  }