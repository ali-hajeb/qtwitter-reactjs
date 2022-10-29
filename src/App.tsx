import React from 'react';
import { createStyles } from '@mantine/core';
import UserProtectedRouteProvider from './features/UserAuthentication';
import routes from './routes';
import Panel from './containers/MainPanel';
import NotFoundPage from './pages/404';

const useStyles = createStyles((theme) => ({
  app: {
    width: '100%',
    height: '100%',
  },
}));

const App: React.FC = () => {
  const { classes } = useStyles();

  return (
    <main className={classes.app}>
      <UserProtectedRouteProvider
        fallbackComponent={<strong>Loading...</strong>}
        protectedRoutes={routes.protectedRoutes}
        authenticationRoutes={routes.authenticationRoutes}
        userPanelComponent={<Panel />}
        notFoundPage={<NotFoundPage />}
      />
    </main>
  );
};

export default App;
