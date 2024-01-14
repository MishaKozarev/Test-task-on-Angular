export interface UserProfile {
  userId: number,
  userName: string,
  userAvatar: string,
  userRole: number
}

export interface ProfileState {
  dataUserprofile: UserProfile;
}
