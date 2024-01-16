export interface UserSigninResponse {
  hasError: true,
  errors: [
    string
  ],
  total: number,
  data: UserSigninResponseSuccess
}

export interface UserSigninResponseSuccess {
  userInfo: UserInfo,
  tokens: {
    token: string,
    refreshToken: string
  }
}

export interface UserInfo {
  userId: number,
  userName: string,
  userAvatar: string,
  userRole: number
}

export interface UserDataSignin {
  login: string;
  password: string;
}