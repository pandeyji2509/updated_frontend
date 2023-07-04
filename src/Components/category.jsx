import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Videos from "./assets/videos.json";
import "./component.css";
import "./World.css";

async function fetchLatestNews(category) {
  const options = {
    ordering: "-created_at",
    page_size: 10,
  };
  // http://tv369.in:8443
  if (category) options["category_name"] = category;
  console.log(options);
  console.log(new URLSearchParams(options));
  
  const resp = await fetch(
    `${process.env.REACT_APP_URL}/api/v1/news/?` + new URLSearchParams(options)

  );
  return await resp.json();
}

async function fetchMostReadNews() {
  const resp = await fetch(
    `${process.env.REACT_APP_URL}/api/v1/news/?` +
      new URLSearchParams({
        category_name: "trending",
        ordering: "-created_at",
        page_size: 10,
      })
  );
  return await resp.json();
}

export default function Category() {
  const { categoryName } = useParams();
  const [news, setNews] = useState({
    loading: true,
    articles: [],
  });

  const [trending, setTrending] = useState({
    loading: true,
    articles: [],
  });

  useEffect(() => {
    (async () => {
      const articles = await fetchLatestNews(categoryName);
      setNews({ loading: false, articles: articles.results });
    })();
  }, [categoryName]);

  useEffect(() => {
    (async () => {
      const trending = await fetchMostReadNews();
      setTrending({ loading: false, articles: trending.results });
    })();
  }, []);

  return (
    <div className="container">
      <div className="">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/index.html">News</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {categoryName}
            </li>
          </ol>
        </nav>
        <div className="row mt-2">
          <div className="col-sm-3">
            <h6 className="text-dark h4 fw-bold display-inline mb-4">
              Trending <i className="bi bi-arrow-right-circle fs-5"></i>
            </h6>

            {trending.loading ? (
              <p>Data is fetching</p>
            ) : trending.articles.length !== 0 ? (
              trending.articles.map((article, i) => (
                <div
                  key={i}
                  className="latest-new read-m border-bottom border-2 pb-3"
                >
                  <div className="col-3 float-start">
                    <img
                      src={article.cover_image}
                      alt="news cover"
                      className="img-fluid"
                    />
                  </div>
                  <div className="padd col-9 float-end pl-10">
                    <h6 className="h6 fw-bold">
                      <Link
                        to={"/news/" + article.id}
                        className="nav-link p-0 text-dark text-justify"
                      >
                        {article.title}
                      </Link>
                    </h6>
                  </div>
                </div>
              ))
            ) : (
              <p>No results to show</p>
            )}
          </div>
          <div className="col-sm-6">
            <h6
              className="text-dark h4 fw-bold display-inline mb-4"
              style={{ textTransform: "capitalize" }}
            >
              {categoryName.replace("-", " ")}{" "}
              <i className="bi bi-arrow-right-circle fs-5"></i>
            </h6>
            {news.loading ? (
              <p>Data is fetching</p>
            ) : news.articles.length !== 0 ? (
              news.articles.map((article, i) => (
                <div key={i} className="latest-new border-bottom border-2 pb-4">
                  <ul className="navbar-nav d-flex flex-row mt-2 mb-2">
                    <li className="mx-1">
                      <span className="mt-2 d-block">
                        {new Date(article.created_at).toLocaleString()}
                      </span>
                    </li>
                  </ul>
                  <div className="col-3 float-end">
                    <img
                      src={article.cover_image}
                      alt="news cover"
                      className="img-fluid"
                    />
                  </div>
                  <h3 className="h4 fw-bold">
                    <Link
                      to={"/news/" + article.id}
                      className="nav-link p-0 m-0 text-dark"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p>
                    {article.content.length > 140
                      ? article.content.slice(0, 140) + "..."
                      : article.content}
                  </p>
                  <Link to={"/news/" + article.id} className="fw-bold">
                    continue reading
                  </Link>
                </div>
              ))
            ) : (
              <p>No articles found</p>
            )}
          </div>
          <div className="col-sm-3">
            <h6 className="text-dark h4 fw-bold display-inline mb-4">
              Videos <i className="bi bi-arrow-right-circle fs-5"></i>
            </h6>
            {Videos.length === 0 ? (
              <p> Data is fetching.....</p>
            ) : (
              Videos.map((Data) => (
                <div className="video-wrapper">
                  <figure className="figure">
                    <iframe
                      src={Data.video}
                      title={Data.title}
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                    <figcaption className="figure-caption">
                      <h6 className="h6 fw-bold">
                        <a
                          href="news.html"
                          className="nav-link p-0 m-0 text-dark"
                        >
                          Lorem Ipsum is simply dummy text of and
                          {Data.content}{" "}
                        </a>
                      </h6>
                    </figcaption>
                  </figure>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
