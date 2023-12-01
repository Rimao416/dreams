import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../footer";
import {
  Blog1,
  Blog2,
  Blog3,
  BlogBanner,
  Icon22,
  Icon23,
  User,
  notFound,
} from "../imagepath";
import BlogHeader from "./header";
import { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {
  getBlog,
  getBlogs,
  getBlogsCategories,
} from "../../redux/slice/blogSlice";

const BlogDetails = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { slug } = useParams();

  const { blogs, loading, index, meta, categories, blog, error } = useSelector(
    (state) => state?.blogReducer
  );


  // const sortedBlogs = blogs?.sort((a, b) => b.created_at - a.created_at);

  // Obtenez les trois blogs les plus récents
  const latestBlogs = blogs?.slice(0, 3);
  // console.log(latestBlogs)

  useEffect(() => {
    dispatch(getBlog(slug)).then((result) => {
      // window.scrollTo(0, 0);
      console.log(result.type)
      if(result.type=="blog/rejected"){
        navigate('/error-404')
      }
    });
    dispatch(getBlogsCategories());

    // dispatch(getBlog(slug))
  }, [dispatch, slug]);

  // activeMenu={"Details"}
  return (
    <>
      <div className="main-wrapper">
        <BlogHeader activeMenu={"Details"} />
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/">Home</Link>{" "}
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        Pages
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        Blog Details
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="course-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-md-12">
                {/* Blog Post */}
                {error == true ? (
                  <>
                    <h1>Article introuvable</h1>
                    <img src={notFound} />
                  </>
                ) : (
                  loading == false && (
                    <>
                      <div className="blog">
                        <div className="blog-image">
                          <Link to="/blog-details">
                            <img
                              className="img-fluid"
                              src={blog?.image}
                              alt="Post Image"
                            />
                          </Link>
                        </div>
                        <div className="blog-info clearfix">
                          <div className="post-left">
                            <ul>
                              <li>
                                <div className="post-author">
                                  <Link to="/instructor-profile">
                                    <img src={User} alt="Post Author" />
                                    <span>{blog?.author}</span>
                                  </Link>
                                </div>
                              </li>
                              <li>
                                <img
                                  className="img-fluid"
                                  src={Icon22}
                                  alt=""
                                />
                                {blog?.created_at}
                              </li>
                              <li>
                                <img
                                  className="img-fluid"
                                  src={Icon23}
                                  alt=""
                                />
                                {blog?.categorie}
                              </li>
                            </ul>
                          </div>
                        </div>
                        <h3 className="blog-title">
                          <Link to=" /blog-details">{blog?.title}</Link>
                        </h3>
                        <div className="blog-content">
                          <p>{blog?.content}</p>
                        </div>
                      </div>
                    </>
                  )
                )}

                {/* /Blog Post */}
              </div>
              {/* Blog Sidebar */}
              <div className="col-lg-3 col-md-12 sidebar-right theiaStickySidebar">
                {/* Search */}
                <div className="stickysidebar">
                  <div className="card search-widget blog-search blog-widget">
                    <div className="card-body">
                      <form className="search-form">
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="Search..."
                            className="form-control"
                          />
                          <button type="submit" className="btn btn-primary">
                            <i className="fa fa-search" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  {/* /Search */}
                  {/* Latest Posts */}
                
                    <>
                      <div className="card post-widget blog-widget">
                        <div className="card-header">
                          <h4 className="card-title">Recent Posts</h4>
                        </div>
                        <div className="card-body">
                          <ul className="latest-posts">
                            {loading == false &&
                              latestBlogs.map((blog, index) => (
                                <>
                                  <li>
                                    <div className="post-thumb">
                                      <Link to={`/blog/${blog?.slug}`}>
                                        <img
                                          className="img-fluid"
                                          src={blog?.image}
                                          alt=""
                                        />
                                      </Link>
                                    </div>
                                    <div className="post-info">
                                      <h4>
                                        <Link to={`/blog/${blog?.slug}`}>
                                          {blog?.title}
                                        </Link>
                                      </h4>
                                      <p>
                                        <img
                                          className="img-fluid"
                                          src={Icon22}
                                          alt=""
                                        />
                                        {blog?.created_at}
                                      </p>
                                    </div>
                                  </li>
                                </>
                              ))}
                          </ul>
                        </div>
                      </div>

                      <div className="card category-widget blog-widget">
                        <div className="card-header">
                          <h4 className="card-title">Categories</h4>
                        </div>
                        <div className="card-body">
                          <ul className="categories">
                            {loading == false &&
                              categories?.map((category, index) => (
                                <>
                                  <li>
                                    <Link to=" #">
                                      <i className="fas fa-angle-right" />{" "}
                                      {category.name}
                                    </Link>
                                  </li>
                                </>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </>
                </div>
              </div>
              {/* /Blog Sidebar */}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BlogDetails;
