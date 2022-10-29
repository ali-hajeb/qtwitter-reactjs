import React from 'react';
import { useTweetStyles } from './styles';

export interface TweetProfilePictureProps {
  profileColor: string;
  username: string;
  size?: number;
}

const TweetProfilePicture: React.FunctionComponent<
  TweetProfilePictureProps
> = ({ profileColor, username, size }) => {
  const { classes } = useTweetStyles();
  const style = size ? { width: size, height: size, fontSize: size / 2 } : {};
  return (
    <div
      className={classes['tweet-author--img']}
      style={{ ...style, color: profileColor }}
    >
      {username[0].toUpperCase()}
    </div>
  );
};

export default TweetProfilePicture;
