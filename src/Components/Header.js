import React from 'react';
import "./component.css";
import logo from "./logo.png";
import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <>
      <div className="container">
        <div className="row border-bottom pb-3">
          <div className="col-xs-4 col-sm-3 col-md-3 left-icon pl-0">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 flex-row mt-4 float-start">
              <li style={{ marginRight: "1.5rem!important" }}><a href="#"><i className="bi bi-list fs-4 text-dark"></i></a></li>
              <li className="mx-3 mt-1"><a href="#"><i className="bi bi-search fs-6 text-dark"></i></a></li>
              <li className="mx-3 mt-1"><a href="#"><i className="bi bi-bell-fill fs-6 text-dark"></i></a></li>
            </ul>
          </div>
          <div className="col-xs-4 col-sm-6 col-md-5 mt-3 text-center logo-main">
            <img height="45px" src={logo} />
          </div>
          <div className="col-xs-4 col-xs-p0 col-sm-3 col-md-4 sign-up pr-0">
            <ul className="navbar-nav d-flex flex-row-reverse mt-4">
              <li className="mx-1"><a className="bg-white text-dark p-2 nav-link fs-6 border border-1" href="#">Subscribe</a></li>
              <li className="mx-1"><a href="#" className="bg-dark text-white p-2 nav-link fs-6 "><i className="bi bi-person">Sign
                in</i></a></li>
            </ul>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-sm-2">
            <p id="current-date"><strong>Sunday</strong><br />
              17 Aug, 2023
            </p>
          </div>
          <div className="col-sm-10">
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
              {/* <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
              type="button" role="tab" aria-controls="pills-home" aria-selected="true">News</button> */}
                <Link to="/" className="nav-link active" id="pills-home-tab" data-bs-target="#pills-home"
                role="tab" aria-controls="pills-home" aria-selected="true">News</Link>
              </li>
              <li className="nav-item" role="presentation">
              {/* <button className="nav-link" id="pills-gravitas-tab" data-bs-toggle="pill" data-bs-target="#pills-gravitas"
              type="button" role="tab" aria-controls="pills-gravitas" aria-selected="true">Gravitas</button> */}
                <Link as={Link} to={"/gravitas"} className="nav-link">Gravitas</Link>
                  {/* <Link to="/gravitas" className="nav-link">Gravitas</Link> */}
              </li>
              <li className="nav-item" role="presentation">
                <Link as={Link} className="nav-link" to={"/world-data"}>World</Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link as={Link} className="nav-link" to={"/science"}>Science</Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link as={Link} className="nav-link" to={"/entertainment"}>Entertainment</Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link as={Link} className="nav-link" to={"/sports"}>Sports</Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link as={Link} className="nav-link" to={"/business"}>Business</Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link as={Link} className="nav-link bi bi-tv fs-6 text-dark" to={"/live"}> Live Tv</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}