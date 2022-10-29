import axiosInstance from '../services/axiosInstance';
import { IAuthHeader } from '../types/authHeader';
import { INewTweet } from '../types/tweet';

/**
 * QTwitter function hook
 * @param authHeader A function to return authorized headers object
 * @returns Qtwitter functions
 */
function useQTwitter(authHeader: () => IAuthHeader) {
  /**
   * Fetch user feed
   * @param controller AbortController instance. It is used to cancel request when component unmounts.
   * @returns An Axios POST request promise
   */
  const loadFeed = (controller: AbortController) => {
    return axiosInstance.post(
      '/feed',
      {},
      { headers: authHeader(), signal: controller.signal },
    );
  };

  /**
   * Post tweet
   * @param tweet QTwitter tweet object
   * @returns An Axios POST request promise
   */
  const sendTweet = (tweet: INewTweet) => {
    return axiosInstance.post('/tweet', tweet, { headers: authHeader() });
  };

  /**
   * Like tweet
   * @param tweet_id Tweet id
   * @returns An Axios PUT request promise
   */
  const likeTweet = (tweet_id: string) => {
    return axiosInstance.put('/like', { tweet_id }, { headers: authHeader() });
  };

  /**
   * Delete tweet
   * @param tweet_id Tweet id
   * @returns An Axios DELETE request promise
   */
  const deleteTweet = (tweet_id: string) => {
    return axiosInstance.delete('/delete_tweet', {
      headers: authHeader(),
      data: { tweet_id },
    });
  };

  /**
   * Get tweet data by id
   * @param tweet_id Tweet id
   * @param controller AbortController instance. It is used to cancel request when component unmounts.
   * @returns An Axios GET request promise
   */
  const getTweet = (tweet_id: string, controller: AbortController) => {
    return axiosInstance.get(`/tweets/${tweet_id}`, {
      signal: controller.signal,
    });
  };

  /**
   * Follow user
   * @param username QTwitter username
   * @returns An Axios PUT request promise
   */
  const followUser = (username: string) => {
    return axiosInstance.put(
      '/follow',
      { username },
      { headers: authHeader() },
    );
  };

  /**
   * Get QTwitter user profile data
   * @param username QTwitter username
   * @param controller AbortController instance. It is used to cancel request when component unmounts.
   * @returns An Axios GET request promise
   */
  const getUserProfile = (username: string, controller: AbortController) => {
    return axiosInstance.get(`/user/${username}`, {
      headers: authHeader(),
      signal: controller.signal,
    });
  };

  return {
    loadFeed,
    sendTweet,
    likeTweet,
    deleteTweet,
    followUser,
    getTweet,
    getUserProfile,
  };
}

export default useQTwitter;
