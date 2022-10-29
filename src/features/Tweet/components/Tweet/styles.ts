import { createStyles } from '@mantine/core';

export const useTweetStyles = createStyles((theme, _params, getRef) => ({
  tweet: {
    marginBottom: 10,
  },
  'tweet-header': {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    gap: 10,
  },
  sm: {
    [`& .${getRef('author')}`]: {
      display: 'flex',
      gap: 2,
      alignItems: 'baseline',
    },
    [`& .${getRef('footer')}`]: {
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.gray[9]
          : theme.colors.gray[1]
      }`,
    },
  },
  'tweet-author': {
    ref: getRef('author'),
    flexGrow: 1,
  },
  'tweet-author--img': {
    borderRadius: '50%',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[5]
        : theme.colors.gray[2],
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 900,
    fontSize: '1.5em',
    padding: 5,
  },
  'tweet-body': {
    padding: 10,
    '& a': {
      textDecoration: 'none',
      color: theme.colors.blue[4],
      '&:hover': {
        color: theme.colors.blue[8],
      },
    },
  },
  'tweet-footer': {
    ref: getRef('footer'),
    padding: '5px 5px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottom: `3px solid ${
      theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[2]
    }`,
  },
  'tweet-meta': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    '$ .icon-tabler': {
      fill: 'red',
      stroke:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[9],
    },
  },
}));

export const useTweetEditorStyles = createStyles((theme) => ({
  'write-tweet': {
    padding: '0 5px',
    '@media (max-width: 767.99px)': {
      '&': {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        padding: '15px 10px',
        position: 'fixed',
        transform: 'translateY(100%)',
        borderRadius: '16px 16px 0 0',
        boxShadow: '0px -7px 16px 4px rgb(0 0 0 / 10%)',
        width: '100%',
        bottom: 0,
        left: 0,
        right: 0,
        transition: 'transform 250ms ease-in-out',
        zIndex: 202,
        '&[data-visible="true"]': {
          transform: 'translateY(0)',
        },
      },
    },
  },
  'write-tweet-header': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    '& a': {
      color: theme.colors.blue[5],
      textDecoration: 'none',
    },
  },
  'write-tweet-header--close': {
    '@media (min-width: 768px)': {
      display: 'none',
    },
  },
}));
