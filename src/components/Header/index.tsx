import {
  Burger,
  createStyles,
  MediaQuery,
  Text,
  ActionIcon,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  "app-header": {
    padding: "21px 15px 10px",
    display: "flex",
    alignItems: "center",
  },
  "header-title": {
    color: `${
      theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black
    }`,
    fontSize: "x-large",
    fontWeight: "bold",
  },
  sticky: {
    padding: "21px 15px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    "@media (max-width: 767.99px)": {
      "&": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? "rgba(37,38,43,0.5)"
            : "rgba(255,255,255, .85)",
        backdropFilter: "blur(8px)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 201,
      },
    },
  },
}));

export interface HeaderProps {
  title: string | React.ReactNode;
  isSideDrawerExpanded: boolean;
  toggleSideDrawer: () => void;
  sticky?: boolean;
  withBackButton?: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  title,
  isSideDrawerExpanded,
  toggleSideDrawer,
  withBackButton,
  sticky,
}) => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const headerClasses = [classes["app-header"]];
  if (sticky) headerClasses.push(classes.sticky);
  return (
    <div className={headerClasses.join(" ")}>
      <div>
        {withBackButton ? (
          <div className='header-back-button'>
            <ActionIcon
              color='dark'
              variant='transparent'
              onClick={() => navigate(-1)}>
              <IconArrowLeft />
            </ActionIcon>
          </div>
        ) : (
          <MediaQuery largerThan='sm' styles={{ display: "none" }}>
            <Burger
              opened={isSideDrawerExpanded}
              onClick={toggleSideDrawer}
              size='sm'
              mr='xl'
            />
          </MediaQuery>
        )}
      </div>
      <Text className={classes["header-title"]}>{title}</Text>
    </div>
  );
};

export default Header;
