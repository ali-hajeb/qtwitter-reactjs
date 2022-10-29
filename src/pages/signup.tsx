import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store';
import SignupPanel from '../containers/SignupPanel';

export interface SignupPageProps {}

const SignupPage: React.FunctionComponent<SignupPageProps> = () => {
  const { state } = useLocation();

  const token = useAppSelector((state) => state.user.token);

  const redirectPath = state?.from !== '/logout' ? state.from || '/' : '/';
  const redirect = token ? <Navigate to={redirectPath} replace /> : null;

  return redirect || <SignupPanel />;
};

export default SignupPage;
