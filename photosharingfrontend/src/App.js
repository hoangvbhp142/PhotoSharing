import "./App.css";

import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TopBar from "./components/TopBar/TopBar";
import UserDetail from "./components/UserDetail/UserDetail";
import UserList from "./components/UserList/UserList";
import UserPhotos from "./components/UserPhotos/UserPhotos";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import HomeView from "./components/HomeView/HomeView";
import Profile from "./components/Profile/Profile";

const App = (props) => {

  const [isLogin, setIsLogin] = useState(false);
  
  useEffect(() => {
    if(localStorage.getItem("token"))
      setIsLogin(true);
    else
      setIsLogin(false);
  }, [localStorage.getItem("token")])

  return (
    <div className="contain">
      <Router>
        <div className="top">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TopBar setIsLogin={setIsLogin}/>
            </Grid>
            <div className="main-topbar-buffer" />
            {
              isLogin
              && <>
                <Grid item sm={3}>
                  <Paper className="main-grid-item">
                    <UserList />
                  </Paper>
                </Grid>
              </>
            }
            <Grid item sm={9}>
              <Paper className="main-grid-item">
                <Routes>
                  <Route path="/" element={<HomeView />} />
                  <Route path="/profile" element={<Profile/>} />
                  <Route path="/loginregister" element={<LoginRegister setIsLogin={setIsLogin}/>} />
                  <Route path="/users" element={<UserList/>} />
                  <Route path="/users/:userId" element={<UserDetail/>} />
                  <Route path="/photos/:userId" element={<UserPhotos/>} />
                </Routes>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Router>
    </div>
  );
};

export default App;
