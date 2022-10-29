import React from 'react';
import useQTwitter from '../../hooks/useQTwitter';
import { ITweet } from '../../types/tweet';
import Tweet from '../../components/Tweet';
import { IAuthHeader } from '../../types/authHeader';
import TweetSkeleton from '../../components/Tweet/TweetSkeleton';

export interface TweetListProps {
  tweets: ITweet[] | [];
  setTweets: (value: ITweet[]) => void;
  onLikeTweet?: (tweet_id: string) => void;
  onDeleteTweet?: (tweet_id: string) => void;
  authHeader: () => IAuthHeader;
  userColors?: { [id: string]: string };
  profileColor?: string;
  sm?: boolean;
  user_id: string;
}

const TweetList: React.FunctionComponent<TweetListProps> = ({
  tweets,
  setTweets,
  onLikeTweet,
  onDeleteTweet,
  authHeader,
  userColors,
  profileColor = '#4dabf7',
  user_id,
  sm,
}) => {
  const { likeTweet, deleteTweet } = useQTwitter(authHeader);
  const likeTweetHandler = (tweet_id: string) => {
    likeTweet(tweet_id)
      .then((res) => {
        const updated = [...tweets];
        const t = tweets.findIndex((t) => t.id === tweet_id);
        if (t > -1) {
          const tweet = { ...tweets[t] };
          if (!tweet.favorites.includes(user_id)) {
            tweet.favorites.push(user_id);
            tweet.favcount = tweet.favorites.length;
            updated[t] = tweet;
          }
        }
        setTweets(updated);
        if (onLikeTweet) onLikeTweet(tweet_id);
      })
      .catch((err) => console.log(err));
  };
  const deleteTweetHandler = (tweet_id: string) => {
    deleteTweet(tweet_id)
      .then((res) => {
        if (onDeleteTweet) onDeleteTweet(tweet_id);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {tweets.length ? (
        tweets.map((t) => (
          <Tweet
            key={t.id}
            profileColor={userColors ? userColors[t.user.id] : profileColor}
            isLiked={t.favorites.includes(user_id)}
            isDeletable={t.user.id === user_id}
            onDelete={deleteTweetHandler}
            onLike={likeTweetHandler}
            sm={sm}
            {...t}
          />
        ))
      ) : (
        <TweetSkeleton count={10} />
      )}
    </>
  );
};

export default TweetList;
