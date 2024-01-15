import { createAction, props } from '@ngrx/store';
import { TooltipActionTypes } from '../action-type/tooltip-action.types';
import { TooltipItem } from '../models/tooltip.models';

export const alertAddAlertAction = createAction(
  TooltipActionTypes.GET_TOOLTIP,
  props<{ tooltip: TooltipItem }>()
);

export const alertDeleteNotifyAction = createAction(
  TooltipActionTypes.DELETE_TOOLTIP,
  props<{ id: string }>()
);