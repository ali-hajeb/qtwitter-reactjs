import React from 'react';
import { Box, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  box: {
    padding: '.75rem .375rem',
  },
  'auth-form': {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export interface UserFormBoxProps extends React.PropsWithChildren {
  formSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UserFormBox: React.FunctionComponent<UserFormBoxProps> = ({
  children,
  formSubmitHandler,
}) => {
  const { classes } = useStyles();
  return (
    <section className={classes['auth-form']}>
      <Box className={classes.box} sx={{ maxWidth: 300 }}>
        <form onSubmit={formSubmitHandler}>{children}</form>
      </Box>
    </section>
  );
};

export default UserFormBox;
