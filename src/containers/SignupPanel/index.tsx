import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, Group, Button, Loader } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  resetResponse,
  userAuthActions,
} from '../../features/UserAuthentication';
import UserFormBox from '../../components/UserFormBox';
import AlertBox from '../../components/Alert';

export interface LoginPanelProps {}

const SignupPanel: React.FC<LoginPanelProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { response, status } = useAppSelector((state) => state.user);

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      remember: false,
    },
    validate: {
      email: (value) =>
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : 'Invalid email',
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
    validateInputOnChange: true,
  });
  const formSubmitHandler = form.onSubmit(
    (values, e) => {
      dispatch(userAuthActions.signUp(values));
    },
    (error) => {
      console.error(error);
    },
  );

  const buttonNavigateHandler = () => {
    dispatch(resetResponse());
    navigate('/login', { replace: true });
  };
  return (
    <UserFormBox formSubmitHandler={formSubmitHandler}>
      <AlertBox
        response={response}
        title="Oops!"
        icon={<IconAlertCircle size={16} />}
      />
      <TextInput
        withAsterisk
        type="email"
        name="email"
        label="Email"
        placeholder="email@example.com"
        disabled={status === 'loading'}
        {...form.getInputProps('email')}
      />
      <TextInput
        withAsterisk
        type="text"
        name="username"
        label="Username"
        placeholder="Unique username"
        disabled={status === 'loading'}
        {...form.getInputProps('username')}
      />
      <TextInput
        withAsterisk
        type="password"
        name="password"
        label="Password"
        placeholder="Your password"
        disabled={status === 'loading'}
        {...form.getInputProps('password')}
      />
      <TextInput
        withAsterisk
        type="password"
        name="password"
        label="Confirm Password"
        placeholder="Repeat Your password"
        disabled={status === 'loading'}
        {...form.getInputProps('confirmPassword')}
      />
      <Group mt="md">
        <Button type="submit" disabled={status === 'loading'} fullWidth>
          {status === 'loading' ? <Loader variant="dots" /> : 'Sign Up'}
        </Button>
        <Button
          disabled={status === 'loading'}
          variant="subtle"
          onClick={buttonNavigateHandler}
          fullWidth
        >
          Already have an account?
        </Button>
      </Group>
    </UserFormBox>
  );
};

export default SignupPanel;
