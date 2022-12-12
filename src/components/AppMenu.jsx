import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  ordersIcon,
  productsIcon,
  importIcon,
  staffIcon,
  userIcon,
  promotionIcon,
  statisticIcon,
} from "../images/main-nav";
import {
  ordersIcon2,
  productsIcon2,
  importIcon2,
  staffIcon2,
  userIcon2,
  promotionIcon2,
  statisticIcon2,
} from "../images/main-nav-selected";
import logOutIcon from "../images/log-out.svg";

const navItems = [
  {
    title: "Orders",
    icon: ordersIcon,
    selectedIcon: ordersIcon2,
  },
  {
    title: "Products",
    icon: productsIcon,
    selectedIcon: productsIcon2,
  },
  {
    title: "Import",
    icon: importIcon,
    selectedIcon: importIcon2,
  },
  {
    title: "Staff",
    icon: staffIcon,
    selectedIcon: staffIcon2,
  },
  {
    title: "User",
    icon: userIcon,
    selectedIcon: userIcon2,
  },
  {
    title: "Promotion",
    icon: promotionIcon,
    selectedIcon: promotionIcon2,
  },
  {
    title: "Statistic",
    icon: statisticIcon,
    selectedIcon: statisticIcon2,
  },
];

const AppMenu = ({ drawerWidth }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currNav, setCurrNav] = useState("orders");

  const handleNavClick = (path) => {
    navigate("/" + path.toLowerCase());
  };

  // Get current nav based on URL
  useEffect(() => {
    const path = window.location.pathname;
    let nav = path.substring(1);
    if (nav === "") nav = "orders";
    setCurrNav(nav);
  }, [navigate]);

  const drawer = (
    <div className="flex flex-col h-full">
      <Box sx={{ height: 90, backgroundColor: "#C85A27", display: "flex" }}>
        <h1 className="text-30 m-auto font-inder">KATLIA</h1>
      </Box>
      <List disablePadding>
        {navItems.map((nav, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => handleNavClick(nav.title)}
            sx={{
              backgroundColor:
                currNav === nav.title.toLocaleLowerCase()
                  ? "rgba(249, 175, 94, 0.9)"
                  : "white",
            }}
          >
            <ListItemButton className="py-[18px] px-[41px]">
              <ListItemIcon>
                <img
                  src={
                    currNav === nav.title.toLocaleLowerCase()
                      ? nav.selectedIcon
                      : nav.icon
                  }
                  alt="Sidebar"
                  className="fill-white"
                />
              </ListItemIcon>
              <ListItemText
                primary={nav.title}
                disableTypography
                className="font-inter"
                sx={{
                  color:
                    currNav === nav.title.toLocaleLowerCase()
                      ? "white"
                      : "black",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box className="flex-1" sx={{ backgroundColor: "#C85A27" }} />
      <Box sx={{ height: 60 }}>
        <Button
          startIcon={<img src={logOutIcon} alt="Log out" />}
          sx={{
            width: "100%",
            height: "100%",
            textTransform: "none",
            color: "black",
            fontFamily: "Inter",
          }}
        >
          Log Out
        </Button>
      </Box>
    </div>
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AppMenu;
