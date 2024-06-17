import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Typography } from "@mui/material";
import "./UserPhotos.css";
import axios from "axios";

function UserPhotos() {
  const token = localStorage.getItem("token");
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [comment, setComment] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/api/photo/${userId}`);
      if (response.data.success) {
        setPhotos(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const postComment = async (photo_id) => {
    if (!comment.trim()) {
      alert("Comment cannot be empty");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8081/api/photo/commentsOfPhoto/${photo_id}`, 
        { comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        fetchData();
        setComment("");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="user-photos-container">
      <Typography variant="body1">User Photos:</Typography>
      {photos?.map((photo) => (
        <div className="photo-item" key={photo._id}>
          {/* <img
            src={require(`./../../images/${photo.file_name}`)}
            alt={`Photo ${photo._id}`}
          /> */}
          <img src={`http://localhost:8081/images/${photo.file_name}`} alt="" />
          <div className="photo-info">
            <Typography variant="body1">
              Date/Time: {photo.date_time}
            </Typography>
            <textarea 
              onChange={(e) => setComment(e.target.value)} 
              value={comment} 
              name="comment" 
              id="" 
              placeholder="Comment here">
            </textarea>
            <button onClick={() => postComment(photo._id)}>Post</button>
            <Typography variant="body1">Comments:</Typography>
            {photo.comments ? (
              photo.comments.map((comment) => (
                <div className="comment-item" key={comment._id}>
                  <Typography variant="body1">{comment.date_time}</Typography>
                  <Typography variant="body1">
                    <Link to={`/users/${comment.user_id}`}>
                      User
                    </Link>
                    : {comment.comment}
                  </Typography>
                </div>
              ))
            ) : (
              <Typography variant="body1">No comments yet.</Typography>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;
