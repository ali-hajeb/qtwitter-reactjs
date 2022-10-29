import { RouteObject } from 'react-router-dom';
import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import LogoutPage from '../pages/logout';
import SignupPage from '../pages/signup';
import TweetPage from '../pages/tweet';
import UserPage from '../pages/user';

const protectedRoutes: RouteObject[] = [
  { index: true, element: <HomePage /> },
  { path: '/logout', element: <LogoutPage /> },
  { path: '/user/:username', element: <UserPage /> },
  { path: '/tweets/:tweet_id', element: <TweetPage /> },
];
const authenticationRoutes: RouteObject[] = [
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
];

const routes = { protectedRoutes, authenticationRoutes };
export default routes;
