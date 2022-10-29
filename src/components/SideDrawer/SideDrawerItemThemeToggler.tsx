import React from 'react';
import { IconSun, IconMoonStars } from '@tabler/icons';
import {
  ActionIcon,
  Text,
  useMantineColorScheme,
  createStyles,
} from '@mantine/core';
import { useSideDrawerMenuItemStyles } from './common/styles';

const useStyles = createStyles({
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '0 0 36px',
    height: 36,
  },
});
const SideDrawerItemThemeToggler = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  const { classes: iconClass } = useStyles();
  const { classes } = useSideDrawerMenuItemStyles();

  return (
    <div className={classes['side-drawer--menu-link']}>
      <div className={iconClass.icon}>
        <ActionIcon
          color={dark ? 'yellow' : 'blue'}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
        </ActionIcon>
      </div>
      <div className={classes['side-drawer--menu-item--title']}>
        <Text>Switch to {dark ? 'Light Mode' : 'Dark mode'}</Text>
      </div>
    </div>
  );
};

export default SideDrawerItemThemeToggler;
