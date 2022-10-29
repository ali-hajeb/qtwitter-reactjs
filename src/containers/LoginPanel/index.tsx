import React from 'react';
import { TextInput, Group, Button, Checkbox, Loader } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAlertCircle } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import UserFormBox from '../../components/UserFormBox';
import {
  resetResponse,
  userAuthActions,
} from '../../features/UserAuthentication';
import { useAppDispatch, useAppSelector } from '../../store';
import AlertBox from '../../components/Alert';

export interface LoginPanelProps {}

const LoginPanel: React.FC<LoginPanelProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { response, status } = useAppSelector((state) => state.user);

  const form = useForm({
    initialValues: {
      username: '',
      password: '',
      remember: false,
    },
  });

  const formSubmitHandler = form.onSubmit(
    (values, e) => {
      dispatch(userAuthActions.login(values));
    },
    (error) => {
      console.error(error);
    },
  );

  const buttonNavigateHandler = () => {
    dispatch(resetResponse());
    navigate('/signup');
  };
  return (
    <UserFormBox formSubmitHandler={formSubmitHandler}>
      <AlertBox
        response={response}
        title="Oops!"
        icon={<IconAlertCircle size={16} />}
      />
      <TextInput
        type="text"
        label="Username"
        placeholder="Your twitter username"
        disabled={status === 'loading'}
        {...form.getInputProps('username')}
      />
      <TextInput
        type="password"
        label="Password"
        placeholder="Your password"
        disabled={status === 'loading'}
        {...form.getInputProps('password')}
      />
      <Checkbox
        mt="md"
        label="Remember me"
        disabled={status === 'loading'}
        {...form.getInputProps('remember')}
      />
      <Group mt="md">
        <Button type="submit" disabled={status === 'loading'} fullWidth>
          {status === 'loading' ? <Loader variant="dots" /> : 'Login'}
        </Button>
        <Button
          disabled={status === 'loading'}
          variant="subtle"
          onClick={buttonNavigateHandler}
          fullWidth
        >
          Don't have an account?
        </Button>
      </Group>
    </UserFormBox>
  );
};

export default LoginPanel;
