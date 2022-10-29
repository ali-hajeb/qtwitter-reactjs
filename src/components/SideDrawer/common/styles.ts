import { createStyles } from '@mantine/core';

export const useSideDrawerStyles = createStyles((theme) => ({
  'side-drawer': {
    backgroundColor: `${
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white
    }`,
    // boxShadow: '-3px 0 16px 1px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '16px',
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    'z-index': '2',
    transitionProperty: 'width, transform',
    transitionDuration: '250ms',
    transitionTimingFunction: 'ease-in-out',
    overflowX: 'hidden',
    width: 250,
    msOverflowStyle: 'none' /* IE and Edge */,
    scrollbarWidth: 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    "&[aria-expanded='true']": {
      transform: 'translateX(0)',
    },
    "&[aria-expanded='false']": {
      transform: 'translateX(-100%)',
    },
    // '& .side-drawer--menu-list:nth-of-type(1)': {
    //   borderRadius: '0.5rem 0.5rem 0 0',
    // },
    '@media (min-width: 768px)': {
      '&': {
        flexGrow: 0,
        minWidth: 'calc(36px + 1rem)',
      },
      "&[aria-expanded='true']": {
        width: 250,
      },
      "&[aria-expanded='false']": {
        transform: 'translateX(0)',
        width: 'calc(36px + 1rem)',
      },
    },
  },
  'side-drawer--bottom': {
    paddingBottom: 16,
    '@media (min-width: 768px)': {
      '&': {
        backgroundColor: 'transparent',
        paddingBottom: 0,
      },
    },
  },
  'side-drawer--burger': {
    padding: 8,
    paddingLeft: 12,
  },
}));

export const useSideDrawerMenuItemStyles = createStyles(
  (theme, _params, getRef) => ({
    'side-drawer--menu-item': {
      width: '100%',
      '& .button': {
        display: 'flex',
        flexDirection: 'row',
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        border: 'none',
        background: 'transparent',
        width: '100%',
      },
    },
    'side-drawer--menu-item--title': {
      marginLeft: 8,
    },
    'side-drawer--menu-link': {
      display: 'flex',
      textDecoration: 'none',
      alignItems: 'center',
      whiteSpace: 'nowrap',
      color: `${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[0]
          : theme.colors.dark[9]
      }`,
      padding: 8,
      fontSize: 'larger',
      [`& .${getRef('icon')} .icon-tabler`]: {
        stroke: `${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[0]
            : theme.colors.dark[9]
        }`,
      },
      '&:hover': {
        color: `${
          theme.colorScheme === 'dark'
            ? theme.colors.blue[0]
            : theme.colors.blue[7]
        }`,
      },
      [`&:hover .${getRef('icon')} .icon-tabler`]: {
        stroke: `${
          theme.colorScheme === 'dark'
            ? theme.colors.blue[0]
            : theme.colors.blue[7]
        }`,
      },
      '&.active': {
        borderRadius: '0 1.5rem 1.5rem 0',
        fontWeight: 500,
        color: theme.colors.blue[4],
        [`& .${getRef('icon')} .icon-tabler`]: {
          stroke: theme.colors.blue[4],
        },
      },
      '@media (min-width: 768px)': {
        fontSize: 'medium',
      },
    },
    'side-drawer--menu-item--icon': {
      ref: getRef('icon'),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: '0 0 36px',
      height: 36,
    },
  }),
);

export const useSideDrawerMenuListStyles = createStyles(() => ({
  'side-drawer--menu-list': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
}));
