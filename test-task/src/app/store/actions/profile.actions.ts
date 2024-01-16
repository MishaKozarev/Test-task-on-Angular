import { createAction, props } from '@ngrx/store';
import { UserInfo } from 'src/app/auth/models/user-data.models';
import { ProfileActionTypes } from '../action-type/profile-action.types';

export const getProfileAction = createAction(
  ProfileActionTypes.GET_PROFILE,
  props<{ profile: UserInfo }>()
);
