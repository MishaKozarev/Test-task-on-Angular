import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReducerKey } from "../constants/reducer-key.enum";
import { ProfileState } from "../models/profile.models";

export const selectProfileState =
  createFeatureSelector<ProfileState>(ReducerKey.profileState);

export const selectProfile = createSelector(
  selectProfileState,
  (state) => state.dataUserProfile
);