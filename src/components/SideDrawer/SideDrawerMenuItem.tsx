import { IconCircle } from '@tabler/icons';
import React from 'react';
import { Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import { useSideDrawerMenuItemStyles } from './common/styles';
import { IMenuItem } from './common/types';
// import SideDrawerItemThemeToggler from './SideDrawerItemThemeToggler';
// import './SideDrawerMenuItem.css';

export interface SideDrawerMenuItemProps extends IMenuItem {}

const SideDrawerMenuItem: React.FC<SideDrawerMenuItemProps> = ({
  to,
  title,
  icon = <IconCircle />,
  className,
  end,
}) => {
  const { classes } = useSideDrawerMenuItemStyles();
  const itemClass = [classes['side-drawer--menu-item']];
  if (className) itemClass.push(className);

  const menuItem = (
    <NavLink className={classes['side-drawer--menu-link']} to={to} end={end}>
      <div className={classes['side-drawer--menu-item--icon']}>{icon}</div>
      <div className={classes['side-drawer--menu-item--title']}>
        <Text>{title}</Text>
      </div>
    </NavLink>
  );
  return <li className={itemClass.join(' ')}>{menuItem}</li>;
};

export default SideDrawerMenuItem;
