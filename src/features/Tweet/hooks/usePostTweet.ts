import { useState } from 'react';
import { AxiosResponse } from 'axios';
import { INewTweet } from '../types/tweet';

/**
 * A hook for posting tweet
 * @param sendTweet sendTweet function from useQTwitter
 * @param onPostSuccessfulHandler Function that will be run if operation is successful
 * @returns Bunch of states and postTweet function
 */
function usePostTweet(
  sendTweet: (tweet: INewTweet) => Promise<AxiosResponse<any, any>>,
  onPostSuccessfulHandler?: Function,
) {
  const [isSending, setSending] = useState(false);
  const [isLoadingVisibile, setLoadingVisibility] = useState(false);
  const [error, setError] = useState(0);

  /**
   * Post tweet (UI)
   * @param tweet QTwitter tweet object
   * @param form Mantine form object
   */
  const postTweet = (tweet: INewTweet, form?: any) => {
    setSending(true);
    setError(0);
    setLoadingVisibility(true);
    sendTweet(tweet)
      .then((res) => {
        setSending(false);
        setTimeout(() => setLoadingVisibility(false), 2000);
        if (form) form.reset();
        if (onPostSuccessfulHandler) onPostSuccessfulHandler();
      })
      .catch((err) => {
        setSending(false);
        setError(err.response?.status);
        setTimeout(() => setLoadingVisibility(false), 2000);
      });
  };

  return {
    postTweet,
    isSending,
    setSending,
    isLoadingVisibile,
    setLoadingVisibility,
    error,
    setError,
  };
}

export default usePostTweet;
