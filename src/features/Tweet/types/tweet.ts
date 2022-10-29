import { IQTwitterUser } from './user';

export interface INewTweet {
  body: string;
  tags: string[];
  reply?: string;
}

export interface ITweet extends INewTweet {
  user: IQTwitterUser;
  comments: string[];
  favorites: string[];
  favcount: number;
  createdAt: string;
  id: string;
}
