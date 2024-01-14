import { createReducer, on } from "@ngrx/store";
import { getProfileAction } from "../actions/profile.actions";
import { ProfileState } from "../models/profile.models";

export const initialStateProfile: ProfileState = {
  dataUserprofile: {
    userId: 0,
    userName: '',
    userAvatar: '',
    userRole: 0
  }
};

export const profileReducer = createReducer(
  initialStateProfile,
  on(
    getProfileAction,
    (state, { profile }): ProfileState => ({
      ...state,
      dataUserprofile: profile,
    })
  ),
);
