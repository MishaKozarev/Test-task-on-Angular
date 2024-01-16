import { createAction, props } from '@ngrx/store';
import { TooltipData } from 'src/app/core/models/tooltip.models';
import { TooltipActionTypes } from '../action-type/tooltip-action.types';

export const alertAddAlertAction = createAction(
  TooltipActionTypes.GET_TOOLTIP,
  props<{ tooltip: TooltipData }>()
);

export const alertDeleteNotifyAction = createAction(
  TooltipActionTypes.DELETE_TOOLTIP,
  props<{ id: string }>()
);