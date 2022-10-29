import { IconHome } from '@tabler/icons';
import React, { useState, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { IOutletContext } from '../../common/types/outletContext';
import { IMenuList } from '../../components/SideDrawer/common/types';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import { TweetProfilePicture } from '../../features/Tweet';
import { useAppSelector } from '../../store';

export interface PanelProps {}

const Panel: React.FunctionComponent<PanelProps> = () => {
  const [isSideDrawerExpanded, setSideDrawerExpansion] = useState(false);

  const toggleSideDrawerExpansion = () => setSideDrawerExpansion((o) => !o);

  const username = useAppSelector((state) => state.user.username);
  const profileColor = useAppSelector((state) => state.profileColor.value);

  const outletContext = useMemo<IOutletContext>(
    () => ({ isSideDrawerExpanded, toggleSideDrawerExpansion }),
    [isSideDrawerExpanded],
  );
  const menu: IMenuList[] = useMemo(
    () => [
      {
        _id: '1',
        title: 'Main Menu',
        items: [
          {
            to: `/user/${username}`,
            title: 'Profile',
            icon: (
              <TweetProfilePicture
                username={username}
                profileColor={profileColor}
                size={36}
              />
            ),
            end: true,
          },
          {
            to: '/',
            title: 'Home',
            icon: <IconHome color="#000" />,
            end: true,
          },
        ],
      },
    ],
    [profileColor, username],
  );

  return (
    <>
      <SideDrawer
        lists={menu}
        isExpanded={isSideDrawerExpanded}
        toggleExpansion={toggleSideDrawerExpansion}
      />
      <Outlet context={outletContext} />
    </>
  );
};

export default Panel;
