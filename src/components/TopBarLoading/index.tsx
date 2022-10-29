import React from 'react';
import { Loader, createStyles } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  box: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '0 10px 10px',
  },
  circle: {
    height: 32,
    width: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&[data-type="error"]': {
      backgroundColor: theme.colors.red,
    },
    '&[data-type="success"]': {
      backgroundColor: theme.colors.green,
    },
    '& .icon-tabler': {
      stroke: theme.white,
    },
  },
}));

export interface TopBarLoadingProps {
  isLoading: boolean;
  error: number;
  loadingMessage?: string;
  successMessage?: string;
  failMessage?: string;
}

const TopBarLoading: React.FunctionComponent<TopBarLoadingProps> = ({
  isLoading,
  error,
  loadingMessage = 'Finishing task...',
  successMessage = 'Task completed!',
  failMessage = 'Task failed!',
}) => {
  const { classes } = useStyles();
  return isLoading ? (
    <div className={classes.box}>
      <Loader height={24} />
      <div>{loadingMessage}</div>
    </div>
  ) : error ? (
    <div className={classes.box}>
      <div className={classes.circle} data-type="error">
        <IconX height={24} />
      </div>
      <div>{failMessage}</div>
    </div>
  ) : (
    <div className={classes.box}>
      <div className={classes.circle} data-type="success">
        <IconCheck height={24} />
      </div>
      <div>{successMessage}</div>
    </div>
  );
};
export default TopBarLoading;
