import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../components";
import BlogCard from "../components/BlogCard";
import { getPosts } from "../features/blogSlice";

const Profile = () => {
  //All State Varibale
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.user);
  const blogData = useSelector((state) => state.blog.blog);
   // CHange Document Title
   document.title = `Jsdev Blog - Profile Mr ${user?.username}`

  //Example: me user1 fetch all user1 blog if others user example user2 fetch user2 all blogs 
  useEffect(() => {
    const userBaseBlog = async () => {
      if(!token && !user) return <Loader />
      else{
        setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_PROXY}/user-blogs`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: true,
          }
        );
        setLoading(false);
        dispatch(getPosts(data?.blog));
      } catch (error) {
        toast.error('Something Wrong');
        setLoading(false);
      }
      }
    };

    userBaseBlog();
  }, [token]);

  if (loading && !token && !user) return <Loader />;
  

  return (
    <>
      <section className="profile">
        <div className="container">
          <div className="profile_container">
            <div className="profile_left">
              <div className="profile_img">
                <img src={user?.avatar} alt={user?.username} />
              </div>

              <div className="user_info">
                <h3>{user?.username}</h3>
                <p className="email">{user?.email}</p>
                <p>{user?.about}</p>
                <a href={user?.website} target="_blank" rel="noreferrer">
                  Website
                </a>
              </div>
              <button
                className="app_btn btn_fill"
                onClick={() => navigate("/user-profile/update")}
              >
                Update Profile
              </button>
            </div>
            {/* User Blog Post */}
            <div className="user_blog">
              <h2>Your Post All Blogs</h2>
              <div className="all_blogs">
                  {blogData?.length >= 1 ? (
                blogData.map((blog) => <BlogCard key={blog?._id} blog={blog} />)
              ) : (
                <h1
                  style={{
                    marginTop: "20px",
                    color: "#333",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Don't have post any blog yet
                </h1>
              )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
