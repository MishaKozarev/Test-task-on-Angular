export interface UserDataSignin {
  login: string;
  password: string;
}

export interface UserSigninResponse {
  hasError: true,
  errors: [
    string
  ],
  total: number,
  data: {
    userInfo: {
      userId: number,
      userName: string,
      userAvatar: string,
      userRole: number
    },
    tokens: {
      token: string,
      refreshToken: string
    }
  }
}