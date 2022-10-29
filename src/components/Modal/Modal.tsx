import React from 'react';
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  modal: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    backdropFilter: 'blur(4px)',
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
    opacity: 0,
    transition: 'opacity 250ms ease-in-out',
    zIndex: 999999,
  },
  flex: {
    display: 'flex !important',
  },
}));

export interface ModalProps extends React.PropsWithChildren {
  isVisible: boolean;
  onClick: () => void;
}

const Modal: React.FC<ModalProps> = ({ isVisible, ...props }) => {
  const { classes } = useStyles();
  const modalClasses = [classes.modal];
  if (isVisible) modalClasses.push(classes.flex);

  return (
    <div
      className={modalClasses.join(' ')}
      onClick={props.onClick}
      aria-hidden={!isVisible}
    >
      {props.children}
    </div>
  );
};

export default Modal;
