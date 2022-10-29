export interface IUserSignUpObject {
  email: string;
  username: string;
  password: string;
}

export interface IUserLoginObject {
  username: string;
  password: string;
  remember: boolean;
}

export interface IUserResponseObject {
  token: string;
}

export interface IUserRedux extends IUser {
  isLoggedIn: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  response: { code: number; message: string } | null;
}

export default interface IUser {
  id: string;
  username: string;
  token: string;
}
