import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TooltipData } from "src/app/core/models/tooltip.models";
import { ReducerKey } from "../constants/reducer-key.enum";
import { TooltipState } from "../models/tooltip.models";

const selectAlertFeature = createFeatureSelector<TooltipState>(ReducerKey.tooltipState);

export const selectAlertNotifies = createSelector(
  selectAlertFeature,
  (state: TooltipState): TooltipData[] => state.tooltips
);