import React, { useEffect, useState } from "react";
import {
  createStyles,
  ActionIcon,
  Affix,
  Transition,
  Text,
} from "@mantine/core";
import { IconPencil } from "@tabler/icons";
import { useAppSelector } from "../store";
import ErrorBox from "../components/Error";
import TopBarLoading from "../components/TopBarLoading";
import TweetList, {
  colors,
  randomColor,
  TweetSkeleton,
  usePostTweet,
  useQTwitter,
} from "../features/Tweet/";
import PagePanel from "../containers/PagePanel";
import TweetEditor from "../features/Tweet/containers/TweetEditor";
import { BrowserView, MobileView } from "react-device-detect";
import { ITweet } from "../features/Tweet/types/tweet";
import { authHeader } from "../features/UserAuthentication";

const user_colors: { [id: string]: string } = {};

const useStyles = createStyles((theme) => ({
  "home-panel": {
    "@media (min-width:768px)": {
      "&": {
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: 10,
      },
    },
  },
  "floadting-btn": {
    display: "block",
    "@media (min-width:768px)": {
      "&": {
        display: "none",
      },
    },
  },
}));

export interface FeedPageProps {}

const HomePage: React.FunctionComponent<FeedPageProps> = () => {
  const { classes } = useStyles();

  const { sendTweet, loadFeed } = useQTwitter(authHeader);

  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [isWrittingTweet, setIsWrittingTweet] = useState(false);
  const [retry, setRetry] = useState(false);

  const user_id = useAppSelector((state) => state.user.id);
  const profileColor = useAppSelector((state) => state.profileColor.value);

  const toggleRetry = () => setRetry((r) => !r);

  // View tweet editor on mobile devices
  const newTweetHandler = () => setIsWrittingTweet(true);
  const postTweetSuccessHandler = () => {
    setIsWrittingTweet(false);
    toggleRetry();
  };

  const {
    error: sendTweetError,
    isLoadingVisibile,
    isSending,
    postTweet,
  } = usePostTweet(sendTweet, postTweetSuccessHandler);

  useEffect(() => {
    const controller = new AbortController();
    let timeout: NodeJS.Timeout;
    setLoading(true);
    setError(false);
    loadFeed(controller)
      .then((res) => {
        // Assign colors to users
        user_colors[user_id] = profileColor;
        res.data.tweets.forEach((t: ITweet) => {
          if (!user_colors[t.user.id])
            user_colors[t.user.id] = randomColor(colors);
        });
        setTweets(res.data.tweets);
        setLoading(false);
      })
      .catch((err) => {
        if (err.code !== "ERR_CANCELED") {
          console.log(err);
          setError(true);
          setLoading(false);
        }
      });

    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retry]);

  return (
    <PagePanel title='Home'>
      {isLoadingVisibile && (
        <TopBarLoading
          isLoading={isSending}
          error={sendTweetError}
          loadingMessage='Tweeting! ...'
          successMessage='Your tweet has been published successfully!'
          failMessage='OOps! Something went wrong :('
        />
      )}
      <div className={classes["home-panel"]}>
        <section>
          {isLoading ? (
            <TweetSkeleton count={10} />
          ) : error ? (
            <ErrorBox
              message='Unable to fetch data'
              retry={toggleRetry}
              withSadFace
            />
          ) : tweets.length ? (
            <TweetList
              authHeader={authHeader}
              onDeleteTweet={toggleRetry}
              user_id={user_id}
              tweets={tweets}
              userColors={user_colors}
              setTweets={setTweets}
              sm
            />
          ) : (
            <Text px={"md"}>Nothing to see here!</Text>
          )}
        </section>
        <aside>
          <MobileView>
            <TweetEditor
              title='New Tweet'
              isVisibleOnMobile={isWrittingTweet}
              setMobileView={setIsWrittingTweet}
              postTweet={postTweet}
            />
          </MobileView>

          <BrowserView>
            <TweetEditor
              title='New Tweet'
              isVisibleOnMobile={isWrittingTweet}
              setMobileView={setIsWrittingTweet}
              postTweet={postTweet}
            />
          </BrowserView>
        </aside>
      </div>
      <Affix
        position={{ right: 20, bottom: 20 }}
        className={classes["floadting-btn"]}>
        <Transition transition={"slide-up"} duration={250} mounted={true}>
          {(transitionStyles) => (
            <ActionIcon
              color='blue'
              radius='xl'
              size={"xl"}
              variant='filled'
              onClick={newTweetHandler}>
              <IconPencil size={24} />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </PagePanel>
  );
};

export default HomePage;
