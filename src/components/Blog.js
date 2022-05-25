import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { getPosts } from "../features/blogSlice";
import BlogCard from "./BlogCard";
import Slide from "react-reveal/Slide";

const Blog = () => {
  //Define All State
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blog.blog);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogCount, setBlogCount] = useState(1);
  const resultPerPage = 3;
  //Pagination When Change
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  //It's fire automatically to fetch user data
  const handleBlog = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_PROXY}/blogs?page=${currentPage}&limit=${resultPerPage}`
      );
      setLoading(false);
      dispatch(getPosts(data?.result));
      setBlogCount(data?.blogCount);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleBlog();
  }, [currentPage]);

  if (loading) return <Loader />;

  return (
    <>
      <section className="home_blog">
        <div className="container">
          <div className="homeBlog_container">
            <Slide top>
              <h1 style={{ textAlign: "center" }}>Our Least Blog</h1>
            </Slide>
            <div className="all_blogs">
              {/* Render Single Blog Here */}
              {data?.length >= 1 ? (
                data.map((blog) => (
                  <BlogCard name={"home"} key={blog?._id} blog={blog} />
                ))
              ) : (
                <h1
                  style={{
                    marginTop: "20px",
                    color: "#333",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  Don't have any blog yet
                </h1>
              )}
            </div>
            {/* Pagination */}
            {resultPerPage < blogCount && (
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={blogCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
