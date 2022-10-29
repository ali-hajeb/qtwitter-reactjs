import React, { Suspense } from 'react';
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

interface UserProtectedRouteProviderProps {
  fallbackComponent: JSX.Element;
  routes: RouteObject[];
}

const UserProtectedRouteContainer: React.FC<
  UserProtectedRouteProviderProps
> = ({ routes, fallbackComponent }) => {
  const router = createBrowserRouter(routes);

  return (
    <>
      <Suspense fallback={fallbackComponent}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default UserProtectedRouteContainer;
