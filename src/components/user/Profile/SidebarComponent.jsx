import React, { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import { NavLink, useMatch, useNavigate } from "react-router-dom";

const themes = {
  light: {
    sidebar: {
      backgroundColor: "#6E939B",
      color: "#B9D8E9",
    },
    menu: {
      menuContent: "#fbfcfd",
      icon: "#0098e5",
      SubMenu: {
        openBackgroundColor: "#e0e0e0",
      },
      hover: {
        backgroundColor: "red",
      },
      disabled: {
        color: "#9fb6cf",
      },
    },
  },
  dark: {
    sidebar: {
      backgroundColor: "#0b2948",
      color: "#8ba1b7",
    },
    menu: {
      menuContent: "#082440",
      icon: "#59d0ff",
      hover: {
        backgroundColor: "#00458b",
        color: "#b6c8d9",
      },
      disabled: {
        color: "#3e5e7e",
      },
    },
  },
};
const sidebarClasses = {
  root: "ps-sidebar-root",
  container: "ps-sidebar-container",
  image: "ps-sidebar-image",
  backdrop: "ps-sidebar-backdrop",
  collapsed: "ps-collapsed",
  toggled: "ps-toggled",
  rtl: "ps-rtl",
  broken: "ps-broken",
};
const menuClasses = {
  root: "ps-menu-root",
  menuItemRoot: "ps-menuitem-root",
  subMenuRoot: "ps-submenu-root",
  button: "ps-menu-button",
  prefix: "ps-menu-prefix",
  suffix: "ps-menu-suffix",
  label: "ps-menu-label",
  icon: "ps-menu-icon",
  subMenuContent: "ps-submenu-content",
  SubMenuExpandIcon: "ps-submenu-expand-icon",
  disabled: "ps-disabled",
  active: "ps-active",
  open: "ps-open",
};
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const SidebarPro = () => {
  const changeUsername = useMatch("/profile/change-username");
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const handleThemeChange = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };
  const [hasImage, setHasImage] = useState(false);
  const menuItemStyles = {
    root: {
      fontSize: "0.78rem",
      fontWeight: 400,
      transition: "all 0.3 ease in",
    },

    icon: {
      color: themes[theme].menu.icon,
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },

    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? hexToRgba(
              themes[theme].menu.menuContent,
              hasImage && !collapsed ? 0.4 : 1
            )
          : "transparent",
      transition: "all 0.3 ease in",
    }),
    button: {
      [`&.${menuClasses.disabled}`]: {
        color: themes[theme].menu.disabled.color,
      },

      "&:hover": {
        color: themes[theme].menu.hover.color,
      },
      transition: "all 0.3s ease",
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };
  const { toggleSidebar, collapseSidebar, broken, collapsed } = useProSidebar();

  return (
    <Sidebar
      collapsed={collapsed}
      customBreakPoint="768px"
      className="sidedar-profile"
      closeOnClick="true"
      backgroundColor={"#085078"}
      rootStyles={{
        color: themes[theme].sidebar.color,
        [`.${menuClasses.subMenuContent}`]: {
          backgroundColor: "#085078",
          paddingTop: "5px",
          paddingBottom: "5px",
        },
        [`.${menuClasses.button}`]: {
          borderRadius: "18px",
          "&:hover": {
            borderRadius: "18px",
            backgroundColor: "#0A6895  !important",
          },
          [`&.active`]: {
            backgroundColor: "#0A6895  !important",
          },
        },
        [`.${sidebarClasses.root}`]: {
          borderRightWidth: "0",
        },
        [`.${sidebarClasses.container}`]: {
          padding: "10px",
        },

        [`.${menuClasses.menuItemRoot}`]: {
          paddingTop: "5px",
          paddingBottom: "5px",
        },
      }}
    >
      <Menu menuItemStyles={menuItemStyles}>
        <MenuItem
          component={<NavLink exact to="/profile/dashboard" />}
          onClick={() => {
            toggleSidebar();
          }}
        >
          Dashboard
        </MenuItem>
        <SubMenu label="Account">
          <MenuItem
            component={<NavLink exact to="/profile/change-username" />}
            onClick={() => {
              toggleSidebar();
            }}
          >
            Change username
          </MenuItem>
          {/*<MenuItem> Line charts </MenuItem>*/}
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default SidebarPro;
