import React from 'react';
import { IconHeart, IconMessage, IconShare, IconTrash } from '@tabler/icons';
import { Button, Text } from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import TweetProfilePicture from './TweetProfilePicture';
import { useTweetStyles } from './styles';
import { ITweet } from '../../types/tweet';
import { hashtagREGEX } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';

export interface TweetProps extends ITweet {
  profileColor: string;
  isDeletable: boolean;
  isLiked: boolean;
  onLike: (tweet_id: string) => void;
  onDelete: (tweet_id: string) => void;
  sm?: boolean;
}

const Tweet: React.FunctionComponent<TweetProps> = (props) => {
  const navigate = useNavigate();
  const clipboard = useClipboard({timeout: 500});
  const { classes } = useTweetStyles();
  const tweetClasses = [classes.tweet];
  if (props.sm) tweetClasses.push(classes.sm);

  const likeTweetHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.onLike(props.id);
  };
  const deleteTweetHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.onDelete(props.id);
  };
  const replyTweetHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/tweets/${props.id}`, { state: { replyTo: props.id } });
  };
  const copyTweetLinkHandler = () => {
    clipboard.copy(`${window.location.host}/tweets/${props.id}`);
  }
  return (
    <article className={tweetClasses.join(' ')}>
      <Link
        to={`/user/${props.user.username}`}
        style={{ color: 'inherit', textDecoration: 'inherit' }}
      >
        <header className={classes['tweet-header']}>
          <TweetProfilePicture
            profileColor={props.profileColor}
            username={props.user.username}
            size={props.sm ? 48 : 64}
          />
          <div className={classes['tweet-author']}>
            <Text weight={'bold'}>{props.user.name}</Text>
            <Text size={'sm'} color={'dimmed'}>
              @{props.user.username}
            </Text>
          </div>
        </header>
      </Link>
      {props.sm ? (
        <Link
          to={`/tweets/${props.id}`}
          style={{ color: 'inherit', textDecoration: 'inherit' }}
        >
          <section
            className={classes['tweet-body']}
            dir="auto"
            dangerouslySetInnerHTML={{
              __html: props.body.replace(
                hashtagREGEX,
                (tag) => `<a href="/tag/${tag.slice(1)}">${tag}</a>`,
              ),
            }}
          ></section>
        </Link>
      ) : (
        <section
          className={classes['tweet-body']}
          dir="auto"
          dangerouslySetInnerHTML={{
            __html: props.body.replace(
              hashtagREGEX,
              (tag) => `<a href="/tag/${tag.slice(1)}">${tag}</a>`,
            ),
          }}
        ></section>
      )}
      <footer className={classes['tweet-footer']}>
        <div className={classes['tweet-meta']} id="comments">
          <Button variant="subtle" color="gray" onClick={replyTweetHandler}>
            <IconMessage size={props.sm ? 16 : 24} />
            <Text ml="xs">{props.comments.length}</Text>
          </Button>
        </div>
        <div className={classes['tweet-meta']} id="favorites">
          <Button
            variant="subtle"
            color={props.isLiked ? 'red' : 'gray'}
            onClick={likeTweetHandler}
          >
            <IconHeart
              fill={props.isLiked ? 'red' : 'none'}
              color={props.isLiked ? 'red' : 'gray'}
              size={props.sm ? 16 : 24}
            />
            <Text ml="xs">{props.favcount}</Text>
          </Button>
        </div>
        <div className={classes['tweet-meta']} id="share">
          <Button variant="subtle" color="gray" onClick={copyTweetLinkHandler}>
            {clipboard.copied ? 'copied!' : <IconShare size={props.sm ? 16 : 24} />}
          </Button>
        </div>
        {props.isDeletable && (
          <div className={classes['tweet-meta']} id="delete">
            <Button variant="subtle" color="gray" onClick={deleteTweetHandler}>
              <IconTrash size={props.sm ? 16 : 24} />
            </Button>
          </div>
        )}
      </footer>
    </article>
  );
};

export default Tweet;
