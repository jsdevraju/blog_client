import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  TelegramIcon,
  RedditIcon,
} from "react-share";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePost } from "../features/blogSlice";
import { toast } from "react-toastify";
import { Comment, Loader } from "../components";
import moment from "moment";
import { FcLike, FcDislike } from "react-icons/fc";

const BlogSingleDetails = () => {
  //All State Varibale
  const dispatch = useDispatch();
  const singlePost = useSelector((state) => state?.blog?.singlePost?.blog);
  const { user, token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const shareUrl = document.URL;
  const { id } = useParams();
  const [postId, setPostId] = useState(id);
  const [text, setText] = useState('');
  //Change Document Title
  document.title = `Jsdev Blog - Blog Details Posted By - ${singlePost?.author?.username}`;

  useEffect(() => {
    setPostId(id);
  }, []);
  //Get a single blog details
  useEffect(() => {
    const getSingleBlog = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_PROXY}/blog/${postId}`
        );
        setLoading(false);
        dispatch(getSinglePost(data));
      } catch (error) {
        setLoading(false);
        return toast.error(error.message);
      }
    };

    getSingleBlog();
  }, [postId]);

  //When user Comment fire this function
  const handleComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_PROXY}/add-comment/${postId}/${user?._id}`,
        {
          text,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: true,
        }
      );
      setText("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return toast.error(error.message);
    }
  };
  //When user click like button fire this function
  const handleLike = async () => {
    if (!singlePost?.reactBy.includes(user?._id)) {
      try {
        const {data} = await axios.get(
          `${process.env.REACT_APP_PROXY}/add-react/${postId}/${user?._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: true,
          }
        );
          setLoading(false);
          dispatch(getSinglePost(data))
      } catch (error) {
        setLoading(false);
        return toast.error(error.message);
      }
    } else {
      try {
        await axios.delete(
          `${process.env.REACT_APP_PROXY}/remove-react/${postId}/${user?._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: true,
          }
        );
      } catch (error) {
        setLoading(false);
        return toast.error(error.message);
      }
    }
  };

  if (loading || singlePost == undefined) return <Loader />;

  return (
    <>
      <section className="blog_details">
        <div className="container">
          <div className="blogDetails_container">
            <div className="blogDetails_img">
              <img src={singlePost?.img} alt="Razu Islam" />
            </div>
            <h3 className="author">
              Posted By: {singlePost?.author?.username}
            </h3>
            <h5 className="category">
              Posted Category: {singlePost?.category}
            </h5>
            <div className="date">
              <p>{moment(singlePost?.createAt).format("MMMM Do YYYY")}</p>
              <p>{moment(singlePost?.createAt).format("h:mm:ss a")}</p>
            </div>
            <div className="like_comment">
              <p>Like: {singlePost?.reactBy?.length}</p>
              <p>Comment: {singlePost?.comments.length}</p>
            </div>
            <div className="liked">
              {!token ? null : (
                <button className="app_btn btn_fill" onClick={handleLike}>
                  {singlePost?.reactBy.includes(user?._id) ? (
                    <FcLike size={30} />
                  ) : (
                    <FcDislike size={30} />
                  )}
                </button>
              )}
            </div>
            <h1 className="title">{singlePost?.title}</h1>
            <div className="description">
              <p>{singlePost?.description}</p>
            </div>
            {/* Social Media Share */}
            <div className="social_share">
              <h1 style={{ marginRight: "16px" }}>Share Social Media :</h1>
              <div className="social">
                <FacebookShareButton url={shareUrl}>
                  <FacebookIcon size={40} />
                </FacebookShareButton>
                <TwitterShareButton url={shareUrl}>
                  <TwitterIcon size={40} />
                </TwitterShareButton>
                <LinkedinShareButton url={shareUrl}>
                  <LinkedinIcon size={40} />
                </LinkedinShareButton>
                <PinterestShareButton url={shareUrl}>
                  <PinterestIcon size={40} />
                </PinterestShareButton>
                <RedditShareButton url={shareUrl}>
                  <RedditIcon size={40} />
                </RedditShareButton>
                <TelegramShareButton url={shareUrl}>
                  <TelegramIcon size={40} />
                </TelegramShareButton>
              </div>
            </div>
            {!token ? null : (
              <div className="comment_box">
                <div className="user_img">
                  <img src={user?.avatar} alt={user?.username} />
                </div>
                {/* COmment Area */}
                <div className="comment_section">
                  <form onSubmit={handleComment}>
                    <textarea
                      placeholder="Enter your comment"
                      id=""
                      cols="30"
                      rows="10"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <button type="submit" className="app_btn btn_trans">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            )}
            {/* Render Every Single Comment */}
            <div className="comment_main">
              {singlePost?.comments &&
                singlePost?.comments?.map((comment) => (
                  <Comment
                    key={comment._id}
                    comment={comment}
                    postId={postId}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogSingleDetails;
