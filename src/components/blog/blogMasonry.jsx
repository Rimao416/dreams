import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../footer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import Header from "../header";
import { Icon22, Icon23 } from "../imagepath";
import BlogHeader from "./header";
import { getBlogs, incrementIndex } from "../../redux/slice/blogSlice";

const BlogMasonry = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(getBlogs(page));
  }, [dispatch]);
  const { blogs, loading, index, meta } = useSelector(
    (state) => state?.blogReducer
  );
  console.log(meta);
  const loadMore = async () => {
    setPage(page + 1);
    await dispatch(incrementIndex(page));
    await dispatch(getBlogs(page + 1));
  };
  return (
    <>
      <div className="main-wrapper">
        <BlogHeader activeMenu={"Masonry"} />
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        Pages
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        Blog Masonry
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
            <div className="row masonry-blog-blk">
              {loading == false &&
                blogs?.map((blog, index) => (
                  <>
                    <div className="col-lg-4 col-md-6 blog grid-blog">
                      <div className="blog-image">
                        <Link to={`/blog/${blog?.slug}`}>
                          <img
                            className="img-fluid"
                            src={blog?.image}
                            alt="Post Image"
                          />
                        </Link>
                      </div>
                      <div className="blog-grid-box masonry-box">
                        <div className="blog-info clearfix">
                          <div className="post-left">
                            <ul>
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
                          <Link to={`/blog/${blog?.slug}`}>{blog?.title}</Link>
                        </h3>
                        <div className="blog-content blog-read">
                          <p>{blog?.content.substring(0, 125)} […]</p>
                          <Link
                            to={`/blog/${blog?.slug}`}
                            className="read-more btn btn-primary"
                          >
                            Lire plus
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>
            {/* Load button */}
            {meta?.current_page < meta?.last_page && (
              <div className="load-more text-center">
                <button className="btn btn-primary" onClick={loadMore}>
                  Charger plus
                </button>
              </div>
            )}
            {/* /Load button */}
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default BlogMasonry;
