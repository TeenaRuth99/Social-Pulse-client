import React from "react";
import { useState } from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import RenderOffCanvas from "../offcanvas/offcanvas";
import {
  FaBars,
  FaUser,
  FaCog,
  FaChartPie,
  FaSignOutAlt,
} from "react-icons/fa";
import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AzureLogout } from "../../containers/auth/AzureLogin";
import User from "../../containers/user/User";
import Admin from "../../containers/config/admin";
import { UpperCase } from "react-lodash";
// import api from '../../api';

function Navigationbar() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  // const [active, setActive] = useState(false);

  // const theme = useSelector((state) => state.themesSettings);
  const authState = useSelector((state) => state.authUser);
  //let name = UpperCase(authState.profile.first_name[0]); ;
  return (
    <>
      <Navbar
        variant="light"
        className=" nav"
        style={{
          height: 37,
          background: "#ffffff",
        }}
      >
        <Container className="ms-3">
          <Navbar.Brand
            className="brand fw-bolder pt-3 navtitle"
            onClick={() => navigate("/dashboard")}
          >
            <h4>
              <span className="fw-bolder" id="brandpre">
                Social
              </span>{" "}
              <span className="fw-bolder">Pulse</span>
            </h4>
          </Navbar.Brand>
        </Container>

        <Nav className="me-4">
          <div className="d-md-flex d-md-block d-none">
            {/* <FaUser size={'1.3em'} className="m-1 mt-2" /> */}
            {authState.profile.role_id === 1 ? (
              <Dropdown>
                <Dropdown.Toggle
                  variant="white"
                  className="text-success border border-success"
                >
                  {authState.profile.display_name}
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item
                    href="/Dashboard"
                    className=" text-sm text-gray-700 hover:bg-gray-200"
                  >
                    <FaChartPie size={"0.9em"} className="m-1 " />
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="/Config"
                    className=" text-sm text-gray-700 hover:bg-gray-200 "
                  >
                    <FaCog size={"0.9em"} className="m-1 " />
                    Config
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="/user"
                    className=" text-sm text-gray-700 hover:bg-gray-200 "
                  >
                    <FaUser size={"0.9em"} className="m-1 " />
                    User
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-1"
                    className=" text-sm text-gray-700 hover:bg-gray-200"
                  >
                    <FaSignOutAlt size={"0.9em"} className="m-1 " />

                    <AzureLogout />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : null}
            {authState.profile.role_id === 2 ? (
              <Dropdown>
                <Dropdown.Toggle variant="white">
                  {authState.profile.display_name}
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  <Dropdown.Item
                    href="/Dashboard"
                    className=" text-sm text-gray-700 hover:bg-gray-200"
                  >
                    <FaChartPie size={"0.9em"} className="m-1 " />
                    Dashboard
                  </Dropdown.Item>

                  <Dropdown.Item
                    href="#/action-1"
                    className=" text-sm text-gray-700 hover:bg-gray-200"
                  >
                    <FaSignOutAlt size={"0.9em"} className="m-1 " />
                    <AzureLogout />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : null}
          </div>
          <FaBars
            size={"1.4em"}
            className="d-md-none d-sm-block"
            onClick={handleShow}
          />
        </Nav>
      </Navbar>
      <RenderOffCanvas
        name="side bar"
        handleClose={handleClose}
        show={show}
        placement={"end"}
      />
    </>
  );
}

export default Navigationbar;
