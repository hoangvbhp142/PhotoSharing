import "./Profile.css"
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import axios from "axios";
import {assets} from '../../assets/assets'
const Profile = () => {
    const [image, setImage] = useState(false);
    const { userId } = useParams();
    const [userDetail, setUserDetail] = useState({});
    const token = localStorage.getItem("token");
    
    const fetchData = async () => {
        try {
        const response = await axios.post(`http://localhost:8081/api/user/profile`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if(response.data.success){
          console.log(response.data.user);
          setUserDetail(response.data.user);
        }
        else{
            console.log(response.data.message);
        }
        }
        catch (error) {
        console.log(error);  
        }
    }

    const postImage = async () => {
      const formData = new FormData();
      formData.append("image", image);
      const response = await axios.post("http://localhost:8081/api/photo/add",
        formData,
        {headers: {Authorization: `Bearer ${token}`}}
      );

      if(response.data.success){
        console.log(response.data.message);
        setImage(false);
      }
      else{
        console.log(response.data.message);
      }
      alert(response.data.message);
    }

    useEffect(() => {
        fetchData();
    }, [userId]);

    return (
        <div className="user-detail-container">
          {" "}
          {/* Added container class */}
          <Typography variant="h6" className="detail-title">
            Profile:
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
            <Typography>
              <label htmlFor="image">
                  <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
              </label>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required/>
              <button onClick={postImage}>Post</button>
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

export default Profile
