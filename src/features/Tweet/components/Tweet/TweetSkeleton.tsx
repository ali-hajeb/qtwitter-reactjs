import React from 'react';
import { Skeleton } from '@mantine/core';
import { useTweetStyles } from './styles';

const TweetSkeleton: React.FC<{ count: number }> = ({ count = 1 }) => {
  const { classes } = useTweetStyles();
  const content = [...Array(count)].map((_, i) => (
    <article key={i} className={classes.tweet}>
      <section className={classes['tweet-header']}>
        <div>
          <Skeleton height={48} circle />
        </div>
        <div className={classes['tweet-author']}>
          <Skeleton height={8} width="30%" radius="xl" />
          <Skeleton height={8} mt={6} width="30%" radius="xl" />
        </div>
      </section>
      <section className={classes['tweet-body']} dir="auto">
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} radius="xl" />
        <Skeleton height={8} mt={6} width="70%" radius="xl" />
      </section>
      <section className={classes['tweet-footer']}>
        <div className={classes['tweet-meta']} id="comments">
          <Skeleton height={16} width={32} mb={6} radius="xl" />
        </div>
        <div className={classes['tweet-meta']} id="favorites">
          <Skeleton height={16} width={32} mb={6} radius="xl" />
        </div>
        <div className={classes['tweet-meta']} id="share">
          <Skeleton height={16} width={32} mb={6} radius="xl" />
        </div>
      </section>
    </article>
  ));
  return <>{content}</>;
};

export default TweetSkeleton;
