import React from "react";
import "./main.scss";
import { Link } from "react-router-dom";
import Table from "../table/Table";

const Main = () => {
  return (
    <>
      <div className="container">
        <h1 className="font-monospace product_title">Products</h1>
        <div className="container search_container">
          <div className="d-flex justify-content-between align-items-center">
            <div className="col-md-8">
              <div className="search">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                />
                <button className="btn btn-primary">
                  <i className="fa fa-search" />
                  Search
                </button>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Link className="btn btn-primary add_button" to="/addproduct">
                New Product
              </Link>
              <Link to={"/favourite"} className="btn btn-light starred_btn">
                <img src="/assets/starred.svg" alt="" />
              </Link>
            </div>
          </div>
        </div>
        <Table />
      </div>
    </>
  );
};

export default Main;
