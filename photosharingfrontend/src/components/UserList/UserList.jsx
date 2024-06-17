import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import "./UserList.css";
import axios from "axios";

function UserList() {
  const [userList, setUserList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/user/list");
      if (response.data.success) {
        setUserList(response.data.data);
      } else {
        console.log(response.data.message);
      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="user-list-container">
      {" "}
      {/* Added container class */}
      <Typography variant="h6" className="list-title">
        User List:
      </Typography>{" "}
      {/* Added class for title */}
      <List className="list">
        {" "}
        {/* Added class for list */}
        {userList.map((user) => (
          <ListItem
            key={user._id}
            component={Link}
            to={`/users/${user._id}`}
            className="list-item"
          >
            {" "}
            {/* Added class for list items */}
            <ListItemText
              primary={`${user.first_name} ${user.last_name}`}
              className="list-text"
            />{" "}
            {/* Added class for list text */}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default UserList;
