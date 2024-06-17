import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import "./TopBar.css";
import { HiOutlineUserCircle } from "react-icons/hi";

function TopBar({setIsLogin}) {
  const { userId } = useParams(); // Extract userId from URL
  const [appContext, setAppContext] = useState(""); // State to hold app context
  const location = useLocation();
  const navigate = useNavigate();
  
  const logout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/");
  }

  // Fetch data for app context
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch data based on the current location
  //       const namePath = location.pathname.slice(0, 7);
  //       console.log("check namepath", namePath);
  //       console.log("Check location", location);
  //       const userId = location.pathname.slice(7);

  //       const user = models.userModel(userId);
  //       const fullname = `${user.first_name} ${user.last_name}`;

  //       console.log("check user", user);
  //       if (location.pathname === "/") {
  //         setAppContext("Home");
  //       } else if (location.pathname.includes("/users/")) {
  //         setAppContext(`Details of User ${fullname}`);
  //       } else if (namePath === "/photos") {
  //         setAppContext(`Photos of User ${fullname}`);
  //       } else {
  //         setAppContext("");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [location]);

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar className="navbar">
        <Typography variant="h6" color="inherit" className="app-context">
          <Link to={"/"} style={{textDecoration: "none", color: "white"}}>{appContext ? `${appContext}` : "Photo Sharing"}</Link>
        </Typography>
        <div className="navbar-right">
          {
            !localStorage.getItem("token")
            ? <Link to='/loginregister'><button>Login</button></Link>
            : <>
              <Link to={'/profile'}><HiOutlineUserCircle style={{ color: "white", cursor: "pointer", fontSize: '40px' }} /></Link>
              <button onClick={logout}>Logout</button>
            </>
          }
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;


