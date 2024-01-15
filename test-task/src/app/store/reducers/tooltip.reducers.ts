import { createReducer, on } from "@ngrx/store";
import { alertAddAlertAction, alertDeleteNotifyAction } from "../actions/tooltip.actions";
import { TooltipState } from "../models/tooltip.models";

export const initialState: TooltipState = {
  tooltips: []
};

export const alertReducer = createReducer(
  initialState,
  on(
    alertAddAlertAction,
    (state: TooltipState, { tooltip }): TooltipState => {
      let newTooltips = [];
      if (state.tooltips.length < 3) {
        newTooltips = [...state.tooltips, tooltip];
      } else {
        newTooltips = [...state.tooltips.slice(1), tooltip];
      }
        return {...state,tooltips: newTooltips}
      }
  ),
  on(
    alertDeleteNotifyAction,
    (state: TooltipState, { id }): TooltipState => ({
      ...state,
      tooltips: [...state.tooltips.filter((tooltip) => tooltip.id !== id)]
    })
  )
);
