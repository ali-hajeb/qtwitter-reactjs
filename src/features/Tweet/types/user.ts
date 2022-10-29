import { ITweet } from './tweet';

export interface IQTwitterUser {
  username: string;
  name: string;
  biography: string;
  tweets: ITweet[];
  followings: IQTwitterUser[];
  followers: IQTwitterUser[];
  id: string;
}
