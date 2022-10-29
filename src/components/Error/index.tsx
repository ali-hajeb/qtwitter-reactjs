import React from 'react';
import { Text, createStyles, Button } from '@mantine/core';
import { IconMoodSad, IconRefresh } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  'error-box': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  'error-message': {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.dark[1],
    fontWeight: 700,
  },
  icon: {
    stroke:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[2]
        : theme.colors.dark[1],
  },
}));

export interface ErrorBoxProps extends React.PropsWithChildren {
  withSadFace?: boolean;
  message?: string;
  retry?: () => void;
}

const ErrorBox: React.FunctionComponent<ErrorBoxProps> = ({
  withSadFace = false,
  message,
  retry,
  children,
}) => {
  const { classes } = useStyles();

  return (
    <article className={classes['error-box']}>
      {withSadFace && <IconMoodSad className={classes.icon} size={128} />}
      {message && <Text className={classes['error-message']}>{message}</Text>}
      {retry && (
        <div>
          <Button variant="light" color="gray" onClick={retry}>
            Refresh <IconRefresh size={24} />
          </Button>
        </div>
      )}
      {children}
    </article>
  );
};

export default ErrorBox;
