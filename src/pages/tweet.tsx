import React, { useEffect, useState } from 'react';
import { createStyles } from '@mantine/core';
import { useLocation, useParams } from 'react-router-dom';
import PagePanel from '../containers/PagePanel';
import TweetList, {
  colors,
  randomColor,
  TweetEditor,
  TweetSkeleton,
  usePostTweet,
  useQTwitter,
} from '../features/Tweet';
import { ITweet } from '../features/Tweet/types/tweet';
import { authHeader } from '../features/UserAuthentication';
import { useAppSelector } from '../store';
import { BrowserView, MobileView } from 'react-device-detect';
import TopBarLoading from '../components/TopBarLoading';

const user_colors: Record<string, string> = {};

const useStyles = createStyles((theme) => ({
  'tweet-panel': {
    '@media (min-width:768px)': {
      '&': {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: 10,
      },
    },
  },
  main_tweet: {
    backgroundColor:
      theme.colorScheme === 'light' ? theme.white : theme.colors.dark[6],
    paddingTop: 67,
    '@media (min-width:768px)': {
      '&': {
        paddingTop: 0,
        backgroundColor: 'inherit',
      },
    },
  },
}));

export interface TweetPageProps {}

const TweetPage: React.FunctionComponent<TweetPageProps> = () => {
  const { state } = useLocation();

  const { tweet_id } = useParams();

  const { classes } = useStyles();

  const { getTweet, sendTweet } = useQTwitter(authHeader);

  const user_id = useAppSelector((state) => state.user.id);
  const profileColor = useAppSelector((state) => state.profileColor.value);

  const [mainTweet, setTweet] = useState<ITweet[]>([]);
  const [thread, setThread] = useState<ITweet[]>([]);
  const [replyTweet, setReplyTweet] = useState('');
  const [replyUser, setReplyUser] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [retry, setRetry] = useState(false);

  const setMainTweet = (tweet: ITweet[]) => setTweet(tweet);
  const toggleRetry = () => setRetry((r) => !r);

  const postTweetSuccessHandler = () => {
    setIsReplying(false);
    toggleRetry();
  };

  const {
    error: sendTweetError,
    isLoadingVisibile,
    isSending,
    postTweet,
  } = usePostTweet(sendTweet, postTweetSuccessHandler);

  // Fetch tweet data
  useEffect(() => {
    const controller = new AbortController();
    
    if (tweet_id) {
      getTweet(tweet_id, controller)
        .then((res) => {
          const thread = res.data.thread as ITweet[];

          // Set profile color for this_user
          user_colors[user_id] = profileColor;

          // Assign color to users
          thread.forEach((t: ITweet) => {
            if (!user_colors[t.user.id])
              user_colors[t.user.id] = randomColor(colors);
          });

          setTweet([thread[0]]);
          setThread(thread.filter((t: ITweet) => t.reply === tweet_id));
          setReplyTweet(tweet_id);
          setReplyUser(thread[0].user.username);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tweet_id, retry]);

  // toggle reply component visibility on mobile devices
  useEffect(() => {
    if (state?.replyTo) setIsReplying(true);
  }, [state]);

  return (
    <PagePanel title="" headerWithBackButton stickyHeader>
      {isLoadingVisibile && (
        <TopBarLoading
          isLoading={isSending}
          error={sendTweetError}
          loadingMessage="Publishing..."
          successMessage="Your tweet published successfully!"
          failMessage="Unable to publish your tweet!"
        />
      )}
      <div className={classes['tweet-panel']}>
        <section>
          <section className={classes.main_tweet}>
            {mainTweet.length ? (
              <TweetList
                user_id={user_id}
                authHeader={authHeader}
                setTweets={setMainTweet}
                tweets={mainTweet}
                userColors={user_colors}
              />
            ) : (
              <TweetSkeleton count={1} />
            )}
          </section>
          <section>
            {thread.length > 0 && (
              <TweetList
                user_id={user_id}
                authHeader={authHeader}
                setTweets={setThread}
                tweets={thread}
                userColors={user_colors}
                sm
              />
            )}
          </section>
        </section>

        <aside>
          <MobileView>
            <TweetEditor
              replyTweet={replyTweet}
              replyUser={replyUser}
              isVisibleOnMobile={isReplying}
              setMobileView={setIsReplying}
              postTweet={postTweet}
            />
          </MobileView>

          <BrowserView>
            <TweetEditor
              replyTweet={replyTweet}
              replyUser={replyUser}
              isVisibleOnMobile={isReplying}
              setMobileView={setIsReplying}
              postTweet={postTweet}
            />
          </BrowserView>
        </aside>
      </div>
    </PagePanel>
  );
};

export default TweetPage;
