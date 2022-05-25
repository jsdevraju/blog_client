import React, { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";
import axios from "axios";
import { getPosts } from "../features/blogSlice";

const BlogCard = ({ blog, name }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    _id,
    category,
    createAt,
    description,
    img,
    title,
    reactBy,
    comments,
  } = blog;
  const { user, token } = useSelector((state) => state.user);
  const myBlog = useSelector((state) => state.blog.blog);
  const dispatch = useDispatch();
  
  //When User Click Delete Button Fire this function
  const handleDelete = async () => {
    if (window.confirm("Are you sure to delete this post?")) {
      try {
        const { data } = await axios.delete(
          `${process.env.REACT_APP_PROXY}/blog/delete/${_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: true,
          }
        );
        setLoading(false);
        dispatch(getPosts(myBlog.filter((blog) => blog._id !== _id)))
        toast.success(data.message);
      } catch (error) {
        setLoading(false);
        toast.error('Please to access this');
      }
    } else toast.warning(`You can't able to delete this post`)
  };

  if (loading && !user && !token) return <Loader />;

  return (
    <>
      <div className="singleBlog">
        <div className="blog_img">
          <img src={img} alt="Razu Islam" />
        </div>
        <div className="blog_content">
          <h1>{title.substring(0, 20)}...</h1>
          <p>{category}</p>
          <div className="date">
            <p>{moment(createAt).format("MMMM Do YYYY")}</p>
            <p>{moment(createAt).format("h:mm:ss a")}</p>
          </div>
          <p>{description.substring(0, 150)}...</p>
          <div className="like_comment">
            <p>Like: {reactBy.length}</p>
            <p>Comment: {comments.length}</p>
          </div>
          <button
            style={{ marginTop: "20px" }}
            className="app_btn btn_fill"
            onClick={() => navigate(`/blog/${_id}`)}
          >
            View More
          </button>
          {token === '' ? null : (
            blog.author == user?._id || blog?.author?._id == user?._id && (
              <div className="btn_div">
                <button
                  className="app_btn btn_trans"
                  onClick={() => navigate(`/blog/update/${_id}`)}
                >
                  Update
                </button>
                <button className="app_btn btn_fill" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )
          )}
          {name && name == 'home' &&  blog?.author == user?._id && (
            <div className="btn_div">
              <button
                className="app_btn btn_trans"
                onClick={() => navigate(`/blog/update/${_id}`)}
              >
                Update
              </button>
              <button className="app_btn btn_fill" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogCard;
