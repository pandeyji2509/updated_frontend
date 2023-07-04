import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./newBody.css";

async function fetchLiveNews() {
  const resp = await fetch(
    "http://tv369.in:8000/api/v1/news/?" +
      new URLSearchParams({
        category_name: "live",
        ordering: "-created_at",
        page_size: 10,
      })
  );
  return await resp.json();
}

async function fetchMostReadNews() {
  const resp = await fetch(
    "http://tv369.in:8000/api/v1/news/?" +
      new URLSearchParams({
        category_name: "trending",
        ordering: "-created_at",
        page_size: 10,
      })
  );
  return await resp.json();
}

async function fetchLatestNews(category) {
  const options = {
    ordering: "-created_at",
    page_size: 10,
  };
  if (category) options["category_name"] = category;

  const resp = await fetch(
    "http://tv369.in:8000/api/v1/news?" + new URLSearchParams(options)
  );
  return await resp.json();
}

async function fetchCategories() {
  const resp = await fetch("http://tv369.in:8000/api/v1/news/categories");
  return await resp.json();
}

function NewsbodyData() {
  const [live, setLive] = useState({
    loading: true,
    articles: [],
  });
  const [latest, setLatest] = useState({
    loading: true,
    articles: [],
  });
  const [mostRead, setMostRead] = useState({
    loading: true,
    articles: [],
  });
  const [categories, setCategories] = useState([]);
  const [loadingCat, setLoadingCat] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    (async () => {
      const liveNews = await fetchLiveNews();
      setLive({ loading: false, articles: liveNews.results });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const mostRead = await fetchMostReadNews();
      setMostRead({ loading: false, articles: mostRead.results });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const categories = await fetchCategories();
      const latestNews = await fetchLatestNews();
      setCategories(categories.results);
      setLoadingCat(false);
      setLatest({ loading: false, articles: latestNews.results });
    })();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setLatest({ loading: true, articles: [] });
      (async () => {
        let category =
          selectedCategory === "all" ? undefined : selectedCategory;
        const latestNews = await fetchLatestNews(category);
        setLatest({ loading: false, articles: latestNews.results });
      })();
    }
  }, [selectedCategory]);
console.log(process.env.REACT_APP_URL);
  return (
    <div className="container" id="">
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <div className="row">
            <div className="col-sm-4">
              <h6 className="text-dark h3 fw-bold col-12">
                Live <i className="bi bi-arrow-right-circle fs-5"></i>
              </h6>
              {live.loading ? (
                <p style={{ marginBottom: 0, textAlign: "center" }}>
                  fetching live news
                </p>
              ) : live.articles.length !== 0 ? (
                live.articles.map((news, i) => (
                  <div
                    key={i}
                    className="latest-new border-bottom border-2 pb-4 my-3"
                  >
                    <h3 className="h4 fw-bold">
                      <Link
                        to={"/news/" + news.id}
                        className="nav-link p-0 m-0 text-dark"
                      >
                        {news.title}
                      </Link>
                    </h3>
                    <p>
                      {news.content.length > 140
                        ? news.content.slice(0, 140) + "..."
                        : news.content}
                    </p>
                    <Link to={"/news/" + news.id} className="fw-bold">
                      continue reading
                    </Link>
                  </div>
                ))
              ) : (
                <p>No articles to show</p>
              )}
            </div>
            <div className="col-sm-4">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h6 className="text-dark h3 fw-bold display-inline">
                  Latest News <i className="bi bi-arrow-right-circle fs-5"></i>
                </h6>
                <select
                  id="categories"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {loadingCat ? (
                    <option>
                      <i>fetching...</i>
                    </option>
                  ) : (
                    <>
                      <option value="all">All</option>
                      {categories.map((category, i) => (
                        <option key={i} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              {latest.loading ? (
                <p style={{ marginBottom: 0, textAlign: "center" }}>
                  fetching latest news
                </p>
              ) : latest.articles.length !== 0 ? (
                latest.articles.map((article, i) => (
                  <div
                    key={i}
                    className="latest-new border-bottom border-2 pb-4"
                  >
                    <ul className="navbar-nav d-flex flex-row mt-2 mb-2">
                      {article.categories.map((category, j) => (
                        <li
                          key={j}
                          className="dark"
                          style={{ textTransform: "capitalize" }}
                        >
                          <Link
                            className="text-dark nav-link fs-6 fw-bold"
                            to={"/" + category.name}
                          >
                            {category.name}
                          </Link>
                        </li>
                      ))}
                      <li className="mx-1">
                        <span className="mt-2 d-block">
                          {new Date(article.created_at).toLocaleDateString()}
                        </span>
                      </li>
                    </ul>
                    <div className="col-3 float-end">
                      <img
                        src={article.cover_image}
                        alt="article cover"
                        className="img-fluid "
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
                <p>No articles to show</p>
              )}
            </div>
            <div className="col-sm-4">
              <h6 className="text-dark h3 fw-bold col-12">
                Most Read <i className="bi bi-arrow-right-circle fs-5"></i>
              </h6>
              {mostRead.loading ? (
                <p style={{ textAlign: "center" }}> fetching most read news</p>
              ) : mostRead.articles.length !== 0 ? (
                mostRead.articles.map((article, i) => (
                  <div key={i} className="latest-new read-m">
                    <div className="col-9 float-start">
                      <ul className="navbar-nav d-flex flex-row mt-1 mb-1">
                        {article.categories.map((category, j) => (
                          <li
                            key={j}
                            className="dark"
                            style={{ textTransform: "capitalize" }}
                          >
                            <Link
                              className="text-dark nav-link fs-6 fw-bold"
                              to={"/" + category.name}
                            >
                              {category.name}
                            </Link>
                          </li>
                        ))}
                        <li className="mx-1">
                          <span className="mt-2 d-block">
                            {new Date(article.created_at).toLocaleDateString()}
                          </span>
                        </li>
                      </ul>
                      <h5 className="h5 fw-bold">
                        <Link
                          to={"/news/" + article.id}
                          className="nav-link p-0 m-0 text-dark"
                        >
                          {article.title}
                        </Link>
                      </h5>
                      <p>
                        {article.content.length > 140
                          ? article.content.slice(0, 140) + "..."
                          : article.content}
                      </p>
                      <Link to={"/news/" + article.id} className="fw-bold">
                        continue reading
                      </Link>
                    </div>
                    <div className="col-3 float-end">
                      <img
                        src={article.cover_image}
                        alt="article cover"
                        className="img-fluid"
                      />
                    </div>
                    <div style={{ borderBottom: "1.5px solid #ccc" }} />
                  </div>
                ))
              ) : (
                <p>No articles to show</p>
              )}
            </div>
          </div>
          <div className="container mb-3 mt-3">
            <div className="row mt-2 bg-primary p-3">
              <div className="col-sm-2 text-white">
                <p className="mb-0">
                  <strong>Market Snapshot</strong>
                </p>
                <span>11:40 PM</span>
              </div>
              <div className="col-sm-8">
                <ul className="nav justify-content-center text-white">
                  <li className="nav-item">
                    <Link
                      className="nav-link active text-white"
                      aria-current="page"
                      href="#"
                    >
                      Futures
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" href="#">
                      Americs
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" href="#">
                      Europe
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" href="#">
                      Asia
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" href="#">
                      Commodities
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="col-sm-2 d-flex navbar-nav  flex-row-reverse">
                <Link href="#" className="block  fs-6 nav-link">
                  View All
                </Link>
              </div>
              <div className="col-sm-12">
                <ul className="p-0  card-li-b">
                  <li className="bg-white list-group-item p-4">
                    <div className="col-12">
                      <p className="mb-0">
                        <strong>Doller Rate</strong> <span>+0.00</span>
                      </p>
                      <p>
                        2548.55 <span className="mx-1">-0.57</span>
                      </p>
                      <div className="">
                        <i className="bi bi-clock"></i> 10:20PM{" "}
                        <i className="bi bi-graph-up fs-3 mx-3"></i>
                      </div>
                    </div>
                  </li>
                  <li className="bg-white list-group-item p-4">
                    <div className="col-12">
                      <p className="mb-0">
                        <strong>Doller Rate</strong> <span>+0.00</span>
                      </p>
                      <p>
                        2548.55 <span className="mx-1">-0.57</span>
                      </p>
                      <div className="">
                        <i className="bi bi-clock"></i> 10:20PM{" "}
                        <i className="bi bi-graph-up fs-3 mx-3"></i>
                      </div>
                    </div>
                  </li>
                  <li className="bg-danger list-group-item p-4">
                    <div className="col-12 text-white">
                      <p className="mb-0">
                        <strong>Doller Rate</strong> <span>+0.00</span>
                      </p>
                      <p>
                        2548.55 <span className="mx-1">-0.57</span>
                      </p>
                      <div className="">
                        <i className="bi bi-clock"></i> 10:20PM{" "}
                        <i className="bi bi-graph-up fs-3 mx-3"></i>
                      </div>
                    </div>
                  </li>
                  <li className="bg-Success list-group-item p-4"></li>
                  <div className="col-12">
                    <p className="mb-0">
                      <strong>Doller Rate</strong> <span>+0.00</span>
                    </p>
                    <p>
                      2548.55 <span className="mx-1">-0.57</span>
                    </p>
                    <div className="">
                      <i className="bi bi-clock"></i> 10:20PM{" "}
                      <i className="bi bi-graph-up fs-3 mx-3"></i>
                    </div>
                  </div>
                  <li className="bg-danger list-group-item p-4"></li>
                  <div className="col-12 text-white">
                    <p className="mb-0">
                      <strong>Doller Rate</strong> <span>+0.00</span>
                    </p>
                    <p>
                      2548.55 <span className="mx-1">-0.57</span>
                    </p>
                    <div className="">
                      <i className="bi bi-clock"></i> 10:20PM{" "}
                      <i className="bi bi-graph-up fs-3 mx-3"></i>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NewsbodyData;
