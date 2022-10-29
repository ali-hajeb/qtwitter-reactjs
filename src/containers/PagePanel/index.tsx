import React from 'react';
import { createStyles } from '@mantine/core';
import Header from '../../components/Header';
import { useOutletContext } from 'react-router-dom';
import { IOutletContext } from '../../common/types/outletContext';

const useStyles = createStyles(() => ({
  'page-panel': {
    transition: 'margin 250ms ease-in-out',
    'z-index': '1',
    '@media (min-width: 768px)': {
      "&[aria-expanded='true']": {
        marginLeft: 'calc(36px + 1rem)',
      },
      "&[aria-expanded='false']": {
        marginLeft: '250px',
      },
    },
  },
  'page-side-panel': {
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
}));

export interface PagePanelProps extends React.PropsWithChildren {
  title: string | React.ReactNode;
  stickyHeader?: boolean;
  headerWithBackButton?: boolean;
}

const PagePanel: React.FunctionComponent<PagePanelProps> = ({
  title,
  stickyHeader,
  headerWithBackButton,
  children,
}) => {
  const { classes } = useStyles();
  const { isSideDrawerExpanded, toggleSideDrawerExpansion } =
    useOutletContext<IOutletContext>();
  return (
    <div
      className={classes['page-panel']}
      aria-expanded={!isSideDrawerExpanded}
    >
      <header>
        <Header
          title={title}
          isSideDrawerExpanded={isSideDrawerExpanded}
          toggleSideDrawer={toggleSideDrawerExpansion}
          withBackButton={headerWithBackButton}
          sticky={stickyHeader}
        />
      </header>
      <section className="h-100">{children}</section>
    </div>
  );
};

// const PageSidePanel: React.FC<PropsWithChildren> = ({children}) => <section>{children}</section>

export default PagePanel;
