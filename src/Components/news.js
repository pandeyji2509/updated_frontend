import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./newBody.css";

async function fetchArticle(id) {
  const resp = await fetch("http://tv369.in:8000/api/v1/news/" + id);
  return await resp.json();
}

function News() {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);
  const { newsId } = useParams();

  useEffect(() => {
    (async () => {
      const fetchedArticle = await fetchArticle(newsId);
      setArticle(fetchedArticle);
      setLoading(false);
    })();
  }, [newsId]);

  return (
    <div className="container">
      {loading ? (
        <div
          style={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Fetching the article
        </div>
      ) : (
        <>
          <img
            src={article.cover_image}
            alt="article cover"
            style={{
              display: "block",
              width: "100%",
              maxWidth: "1400px",
              height: "400px",
              objectFit: "fill",
              margin: "auto",
            }}
          />
          <h2
            style={{
              marginTop: "14px",
              marginBottom: "-2px",
              fontFamily: "calibri",
              fontWeight: "900",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ display: "inline-block", marginRight: "10px" }}>{article.title}</span>
            <ul className="navbar-nav d-flex flex-row mt-2 mb-2">
              {article.categories.map((category, j) => (
                <li
                  key={j}
                  className="dark"
                  style={{
                    textTransform: "capitalize",
                    border: "1.5px solid rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Link
                    className="text-dark nav-link fs-6 fw-bold"
                    to={"/" + category.name}
                  >
                    #{category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </h2>
          <h6 style={{ display: "flex", alignItems: "center" }}>
            <i
              className="bi bi-person-circle"
              style={{
                fontSize: "20px",
                display: "inline-block",
                verticalAlign: "middle",
                marginRight: "5px",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            />{" "}
            <span
              style={{
                color: "rgba(0, 0, 0, 0.6)",
                fontWeight: "600",
                fontFamily: "calibri",
                marginTop: "-1px",
              }}
            >
              {article.author.first_name}{" "}
            </span>
            <i
              className="bi bi-dot"
              style={{
                fontSize: "30px",
                display: "inline-block",
                verticalAlign: "middle",
                marginLeft: "-.5rem",
                marginRight: "-.5rem",
                marginTop: "2px",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            ></i>
            <span>{new Date(article.created_at).toLocaleString()}</span>
          </h6>
          <p style={{ fontFamily: "monospace" }}>
            {article.content}
          </p>
        </>
      )}
    </div>
  );
}
export default News;
