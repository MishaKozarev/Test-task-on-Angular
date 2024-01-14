import { createAction, props } from '@ngrx/store';
import { ProfileActionTypes } from '../action-type/profile-action.types';
import { UserProfile } from '../models/profile.models';

export const getProfileAction = createAction(
  ProfileActionTypes.GET_PROFILE,
  props<{ profile: UserProfile }>()
);
