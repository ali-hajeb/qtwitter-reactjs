import React from 'react';
import { Button, createStyles } from '@mantine/core';
import { IconArrowLeft, IconError404, IconHome } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  page: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    '& .icon-tabler': {
      stroke: theme.colors.blue[6],
    },
  },
  big_message: {
    color: theme.colors.blue[6],
  },
}));

export interface NotFoundProps {}

const NotFound: React.FunctionComponent<NotFoundProps> = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.page}>
      <div className={classes.icon}>
        <IconError404 size={96} />
      </div>
      <h1 className={classes.big_message}>Oops! it seems you're lost!</h1>
      <div>
        <Button
          leftIcon={<IconArrowLeft />}
          variant="subtle"
          mr={'md'}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Button
          leftIcon={<IconHome />}
          variant="subtle"
          onClick={() => navigate('/', { replace: true })}
        >
          Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
