import React from "react";
import { Col } from "reactstrap";
import Sidebar from "../sidebar/Sidebar";
import Routers from "../../router/Routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./layout.css";

const Layout = () => {
  return (
    <>
      <div className="layout__container d-flex">
        <Col lg="3" md="2" className="sidebarCol">
          <Sidebar />
        </Col>

        <Col lg="9" md="10">
          <Routers />
        </Col>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Layout;
