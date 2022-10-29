import React, { useState } from 'react';
import InputGroup from '../../components/InputGroup';

const formClass: React.CSSProperties = {
  width: '66%',
  maxWidth: '500px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export interface LoginPanelProps {}

const LoginPanel: React.FunctionComponent<LoginPanelProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form style={formClass}>
      <InputGroup
        id="email-input"
        inputType={'email'}
        inputId="email"
        inputValue={email}
        setInputValue={setEmail}
        label="Email"
        errorMessage="Not valid!"
        inputPlaceholder="example@example.com"
      />
      <InputGroup
        id="password-input"
        inputType={'password'}
        inputId="password"
        inputValue={password}
        setInputValue={setPassword}
        label="Password"
        inputPlaceholder="4 - 16 characters"
        descriptions="a-Z, numbers, /_-*+\#@"
      />
    </form>
  );
};

export default LoginPanel;
