import { Alert, DefaultMantineColor } from '@mantine/core';
import { AlertVariant } from '@mantine/core/lib/Alert/Alert.styles';
import React from 'react';

const getColorFromCode = (code: number): DefaultMantineColor => {
  if (code >= 200 && code < 300) return 'green';
  if (code >= 400 && code < 600) return 'red';
  return 'blue';
};

export interface AlertProps {
  icon?: React.ReactNode;
  response: { code: number; message: string } | null;
  title: string;
  variant?: AlertVariant;
  color?: DefaultMantineColor;
}

const AlertBox: React.FunctionComponent<AlertProps> = ({
  icon,
  response,
  title,
  variant,
  color,
}) => {
  return (
    <>
      {response?.code && (
        <Alert
          icon={icon}
          title={title}
          variant={variant}
          color={color || getColorFromCode(response.code)}
        >
          {response.message}
        </Alert>
      )}
    </>
  );
};

export default AlertBox;
