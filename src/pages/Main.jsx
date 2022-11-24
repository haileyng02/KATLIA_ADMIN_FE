import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppMenu from "../components/AppMenu";
import profileIcon from "../images/profile.svg";
import Orders from "./Orders";
import { navRoutes } from "../routes";

const drawerWidth = 250;

const Main = () => {
  return (
    <Box sx={{ display: "flex" }}>
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
          <div className="flex">
            <img src={profileIcon} alt="Profile" />
            <p className="text-black text-[16px] ml-[12px] ">
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
          height: "100vh",
          pt: 10,
          backgroundColor: "#D9D9D9",
        }}
      >
        <Routes>
          {navRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </Box>
    </Box>
  );
};

export default Main;
