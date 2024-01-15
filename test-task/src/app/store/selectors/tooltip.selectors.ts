import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReducerKey } from "../constants/reducer-key.enum";
import { TooltipItem, TooltipState } from "../models/tooltip.models";

const selectAlertFeature = createFeatureSelector<TooltipState>(ReducerKey.tooltipState);

export const selectAlertNotifies = createSelector(
  selectAlertFeature,
  (state: TooltipState): TooltipItem[] => state.tooltips
);