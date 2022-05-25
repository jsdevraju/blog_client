import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { FaTrash } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Loader } from '../components'

const Comment = ({comment, postId}) => {
  //All State Define Here
  const [loading, setLoading] = useState(false);
  const { token, user} = useSelector((state) => state.user);

  //When User Delete Any Comment Fire this function
  const handleDeleteComment = async (e) =>{
    e.preventDefault();
    if(window.confirm(`Are you sure you delete this comment?`)){
      setLoading(true)
    try {
      await axios.delete(
        `${process.env.REACT_APP_PROXY}/remove-comment/${postId}/${user?._id}/${comment?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: true,
        }
      );
      setLoading(false);
      toast.success('Comment Delete')
    } catch (error) {
      setLoading(false);
        return toast.error(error.message);
    }
    } else toast.warning(`You cab't delete comment`)

  }

  if(loading && !token && !user) return <Loader />


  return (
    <>
      <div className="comment_show">
        <div className="wrapper">
        <div className="user_img">
          <img
            src={comment?.author?.avatar}
            alt={comment?.author?.username}
          />
        </div>
        <div className="user_comment">
          <h3>{comment?.author?.username}</h3>
          <p>{comment?.text}</p>
          <span>{moment(comment?.date).startOf().fromNow()}</span>
        </div>
        </div>
        <button className="delete" onClick={handleDeleteComment}><FaTrash size={30} /></button>
      </div>
    </>
  );
};

export default Comment;
