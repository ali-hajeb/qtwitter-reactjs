import React, { useState, useEffect } from 'react';
import { Skeleton, Text, Divider, Button, createStyles } from '@mantine/core';
import { IconUserPlus, IconCheck } from '@tabler/icons';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../store';
import { IQTwitterUser } from '../features/Tweet/types/user';
import TweetList, {
  colors,
  randomColor,
  TweetProfilePicture,
  TweetSkeleton,
  useQTwitter,
} from '../features/Tweet';
import { authHeader } from '../features/UserAuthentication';
import { ITweet } from '../features/Tweet/types/tweet';
import PagePanel from '../containers/PagePanel';
import NotFound from '../components/404';
import ErrorBox from '../components/Error';

const useStyles = createStyles((theme) => ({
  profile: {
    marginTop: -16,
    borderRadius: '16px 16px 0 0',
    padding: 10,
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'light' ? theme.white : theme.colors.dark[7],
    // boxShadow: '0px 7px 16px 4px rgb(0 0 0 / 10%)',
  },
  header: {
    // borderRadius: '16px 16px 0 0',
    height: 150,
  },
  profile_img: {
    position: 'absolute',
    top: 0,
    left: 10,
    transform: 'translateY(-50%)',
    borderRadius: '50%',
    border: `5px solid ${
      theme.colorScheme === 'light' ? theme.white : theme.colors.dark[7]
    }`,
  },
  profile_desc: {
    marginTop: 36,
  },
  profile_desc_top: { display: 'flex' },
  user_stats: {
    display: 'flex',
    marginTop: 10,
    gap: 20,
    '& div': {
      display: 'flex',
      gap: 5,
    },
  },
  user_tweetlist: {
    // backgroundColor:
    //   theme.colorScheme === 'light'
    //     ? theme.colors.gray[0]
    //     : theme.colors.dark[7],
    marginTop: 10,
    height: '100%',
  },
  divider: {
    borderTopWidth: 3,
    borderTopColor:
      theme.colorScheme === 'dark'
        ? theme.colors.gray[9]
        : theme.colors.gray[1],
  },
  user_follow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    gap: 5,
  },
}));
export interface UserPageProps {}

const UserPage: React.FunctionComponent<UserPageProps> = () => {
  const { classes } = useStyles();

  const { username } = useParams();

  const { getUserProfile, followUser } = useQTwitter(authHeader);

  const { id: user_id, username: this_username } = useAppSelector(
    (state) => state.user,
  );
  const pColor = useAppSelector((state) => state.profileColor.value);

  const [user, setUser] = useState<IQTwitterUser>();
  const [reload, setReload] = useState(false);
  const [canBeFollowed, setCanBeFollowed] = useState(true);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [profileColor] = useState(
    username !== this_username ? randomColor(colors) : pColor,
  );
  const [error, setError] = useState(0);

  const toggleReload = () => setReload(r => !r);
  const setTweets = (tweets: ITweet[]) => {
    const updated = { ...user } as IQTwitterUser;
    updated.tweets = [...tweets];
    setUser(updated);
  };

  // Handler for following a user
  const followUserHandler = () => {
    setIsRequestPending(true);
    if (user?.username) {
      followUser(user.username)
        .then((res) => {
          setTimeout(() => {
            setReload((r) => !r);
          }, 500);
        })
        .catch((err) => {
          console.log(err);
          setIsRequestPending(false);
        });
    }
  };

  // Fetch user data
  useEffect(() => {
    const controller = new AbortController();
    if (username) {
      getUserProfile(username, controller)
        .then((res) => {
          const user = res.data as IQTwitterUser;
          if (user.followers.findIndex((u) => u.id === user_id) > -1) {
            setCanBeFollowed(false);
          }
          setIsRequestPending(false);
          setUser(res.data);
        })
        .catch((err) => {
          setError(err.response?.status)
          console.log(err);
        });
    }

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, reload]);

  return (
    <PagePanel title={username || ''} stickyHeader headerWithBackButton>
      <section className="h-100">
        <header
          className={classes.header}
          style={{ backgroundColor: profileColor }}
        >
        </header>
        <section className={classes.profile}>
          <div className={classes.profile_img}>
            {user ? (
              <TweetProfilePicture
                username={user?.username}
                profileColor={profileColor}
                size={72}
              />
            ) : (
              <Skeleton height={72} circle />
            )}
          </div>
          <div className={classes.profile_desc}>
            <div className={classes.profile_desc_top}>
              <div className="flex-grow-1">
                {user ? (
                  <Text size={'lg'} weight={'bolder'}>
                    {user.name}
                  </Text>
                ) : (
                  <Skeleton height={8} width="30%" radius="xl" />
                )}
                {user ? (
                  <Text size={'sm'} color="dimmed">
                    @{user.username}
                  </Text>
                ) : (
                  <Skeleton height={8} mt={6} width="30%" radius="xl" />
                )}
              </div>
              <div>
                {user && user?.id !== user_id && (
                  <Button
                    variant={canBeFollowed ? 'filled' : 'outline'}
                    loading={isRequestPending}
                    onClick={followUserHandler}
                  >
                    {canBeFollowed ? (
                      <div className={classes.user_follow}>
                        {!isRequestPending && <IconUserPlus />}
                        <div>Follow</div>
                      </div>
                    ) : (
                      <div className={classes.user_follow}>
                        {!isRequestPending && <IconCheck />}
                        <div>Unfollow</div>
                      </div>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {user ? (
              <Text size={'md'} mt={'md'}>
                {user.biography || `Hey, This is ${user.name}. 🙋‍♂️`}
              </Text>
            ) : (
              <>
                <Skeleton height={8} mt={10} radius="xl" />
                <Skeleton height={8} mt={6} radius="xl" />
                <Skeleton height={8} mt={6} width="70%" radius="xl" />
              </>
            )}
            {user ? (
              <div className={classes.user_stats}>
                <div>
                  <Text weight={'bold'}>{user.followers.length}</Text>
                  <Text>Followers</Text>
                </div>
                <div>
                  <Text weight={'bold'}>{user.followings.length}</Text>
                  <Text>Followings</Text>
                </div>
              </div>
            ) : (
              <Skeleton height={8} mt={10} width="30%" radius="xl" />
            )}
          </div>
        </section>
        <Divider mb={'sm'} className={classes.divider} />
        <section className={classes.user_tweetlist}>
          {error ? error === 404 ? <NotFound /> : <ErrorBox retry={toggleReload} message='Oops! Something went wrong' withSadFace />: user ? (
            <TweetList
              authHeader={authHeader}
              setTweets={setTweets}
              tweets={user?.tweets}
              profileColor={profileColor}
              user_id={user_id}
              sm
            />
          ) : (
            <TweetSkeleton count={10} />
          )}
        </section>
      </section>
    </PagePanel>
  );
};

export default UserPage;
