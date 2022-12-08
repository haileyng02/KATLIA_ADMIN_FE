import React from "react";
import { Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import AppMenu from "../components/AppMenu";
import profileIcon from "../images/profile.svg";

const drawerWidth = 250;

const Main = () => {
  return (
    <Box sx={{ display: "flex", backgroundColor: "#D9D9D9" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
        }}
      >
        <Toolbar className="flex justify-end">
          {/* <Box sx={{display:'flex', backgroundColor:'#D9D9D94D',borderRadius: 10, width:'28%'}} className='px-[13px] py-[7px]'>
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize:12 }}
              placeholder="Search Product"
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <img src={searchIcon} alt='Search'/>
            </IconButton>
          </Box> */}
          <div className="flex items-center">
            <img src={profileIcon} alt="Profile" />
            <p className="text-black text-[16px] ml-[12px] mb-0">
              Nguyen Huu Trung Kien
            </p>
          </div>
        </Toolbar>
      </AppBar>
      <AppMenu drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          pt: 10,
        }}
        className='min-h-screen'
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Main;
