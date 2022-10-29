import React from 'react';
import { Burger } from '@mantine/core';
import SideDrawerMenuList from './SideDrawerMenuList';
import { IMenuList } from './common/types';
import { IconLogout } from '@tabler/icons';
import { useSideDrawerStyles } from './common/styles';
import SideDrawerItemThemeToggler from './SideDrawerItemThemeToggler';

const logoutMenu = [{ title: 'Logout', to: '/logout', icon: <IconLogout /> }];

export interface SideDrawerProps {
  lists: IMenuList[];
  isExpanded: boolean;
  toggleExpansion: (event: React.MouseEvent<HTMLElement>) => void;
}

const SideDrawer: React.FC<SideDrawerProps> = (props) => {
  const renderMenu = props.lists.map((list) => (
    <SideDrawerMenuList key={list._id} {...list} />
  ));
  const { classes: sideDrawerClasses } = useSideDrawerStyles();

  return (
    <React.Fragment>
      <div
        className={sideDrawerClasses['side-drawer']}
        aria-expanded={props.isExpanded}
      >
        <div className={sideDrawerClasses['side-drawer--burger']}>
          <Burger
            opened={props.isExpanded}
            onClick={props.toggleExpansion}
            size="sm"
          />
        </div>
        {props.lists && (
          <React.Fragment>
            <div className="flex-grow-1">{renderMenu}</div>
            <div className="side-drawer--logout">
              <SideDrawerItemThemeToggler />
              <SideDrawerMenuList _id="bottom" items={logoutMenu} title="" />
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
