import React from 'react';
import { Textarea, Button, Text, CloseButton } from '@mantine/core';
import { useForm, UseFormReturnType } from '@mantine/form';
import { INewTweet } from '../../types/tweet';
import { useTweetEditorStyles } from '../../components/Tweet/styles';
import { hashtagREGEX } from '../../constants';
import { Link } from 'react-router-dom';

export interface TweetEditorProps {
  postTweet: (tweet: INewTweet, form?: UseFormReturnType<any>) => void;
  isVisibleOnMobile?: boolean;
  replyTweet?: string;
  replyUser?: string;
  title?: string | React.ReactNode;
  setMobileView?: (value: React.SetStateAction<boolean>) => void;
}

const TweetEditor: React.FunctionComponent<TweetEditorProps> = ({
  title = 'New Tweet',
  replyTweet,
  replyUser,
  isVisibleOnMobile = false,
  postTweet,
  setMobileView,
}) => {
  const { classes } = useTweetEditorStyles();

  const form = useForm({
    initialValues: {
      body: '',
    },
    validate: {
      body: (value) =>
        value.length > 3 ? null : 'Tweet must be longer than 3 characters!',
    },
  });

  const formSubmitHandler = form.onSubmit((values, e) => {
    const tags = values.body.match(hashtagREGEX) as string[];
    const tweet: INewTweet = {
      body: values.body,
      tags: tags || [],
      reply: replyTweet,
    };
    postTweet(tweet, form);
  });
  const mobileViewHandler = (e: React.MouseEvent) => {
    if (setMobileView) setMobileView(false);
  };
  return (
    <section
      className={classes['write-tweet']}
      data-visible={isVisibleOnMobile}
    >
      <header className={classes['write-tweet-header']}>
        <Text size={'xl'} weight={'bold'} className="flex-grow-1">
          {replyUser ? (
            <>
              Reply&nbsp;
              <Link to={`/user/${replyUser}`}>@{replyUser}</Link>
            </>
          ) : (
            title
          )}
        </Text>
        {setMobileView && (
          <CloseButton
            title="Close popover"
            className={classes['write-tweet-header--close']}
            size="xl"
            iconSize={20}
            onClick={mobileViewHandler}
          />
        )}
      </header>
      <form onSubmit={formSubmitHandler}>
        <Textarea
          id="tweet-body"
          name="tweet-body"
          placeholder="what's on your mind?"
          {...form.getInputProps('body')}
        />
        <Button id="tweet-submit" type="submit" fullWidth mt="xl">
          Tweet
        </Button>
      </form>
    </section>
  );
};

export default TweetEditor;
