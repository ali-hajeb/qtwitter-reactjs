import React from 'react';
import { useSideDrawerMenuListStyles } from './common/styles';
import { IMenuList } from './common/types';
import SideDrawerMenuItem from './SideDrawerMenuItem';
// import './SideDrawerMenuList.css';

export interface SideDrawerMenuListProps extends IMenuList {}

const SideDrawerMenuList: React.FC<SideDrawerMenuListProps> = (props) => {
  const items = props.items.map((item, i) => (
    <SideDrawerMenuItem key={item.title + i} {...item} />
  ));
  const { classes } = useSideDrawerMenuListStyles();
  return (
    <ul className={classes['side-drawer--menu-list']} aria-label={props.title}>
      {items}
    </ul>
  );
};

export default SideDrawerMenuList;
