import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import "./UserDetail.css";
import axios from "axios";
function UserDetail() {
  const { userId } = useParams();
  const [userDetail, setUserDetail] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/user/${userId}`);
      if(response.data.success){
        setUserDetail(response.data.data);
      }
      else{
        console.log(response.data.message);
      }
    }
    catch (error) {
      console.log(error);  
    }
  }

  useEffect(() => {
    fetchData();
  }, [userId]);

  return (
    <div className="user-detail-container">
      {" "}
      {/* Added container class */}
      <Typography variant="h6" className="detail-title">
        User details:
      </Typography>{" "}
      {/* Added class for title */}
      <div className="detail-info">
        {" "}
        {/* Added class for detail info */}
        <Typography variant="body1">
          <strong>Name:</strong> {userDetail.first_name} {userDetail.last_name}
        </Typography>
        <Typography variant="body1">
          <strong>Location:</strong> {userDetail.location}
        </Typography>
        <Typography variant="body1">
          <strong>Description:</strong> {userDetail.description}
        </Typography>
        <Typography variant="body1">
          <strong>Occupation:</strong> {userDetail.occupation}
        </Typography>
        <Typography variant="body1">
          <Link to={`/photos/${userDetail._id}`} className="view-photos-link">
            View Photos
          </Link>{" "}
          {/* Added class for link */}
        </Typography>
      </div>
    </div>
  );
}

export default UserDetail;
