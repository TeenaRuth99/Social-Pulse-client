import React from "react";
import { Col, Row } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaChartPie, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoSettingsSharp } from "react-icons/io5";
import "../offcanvas/offcanvas.scss";
import { RouteKeys } from "../../containers/routes/route-keys";
import { AzureLogout } from "../../containers/auth/AzureLogin";

function RenderOffCanvas({ name, handleClose, show, ...props }) {
  const authState = useSelector((state) => state.authUser);

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header
          closeButton
          closeVariant="white"
          className="bg-dark text-white"
        >
          <Offcanvas.Title>
            <FaUser size={"1.3em"} className="m-2" />
            <span style={{ color: "rgb(34, 194, 34)" }}>
              {authState.profile.display_name}
            </span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="bg-dark text-white">
          <Row>
            <Col>
              <NavLink to="/dashboard">
                {({ isActive }) => (
                  <div className="menu" onClick={handleClose}>
                    <span className="icon">
                      <FaChartPie
                        size={"1.4em"}
                        color={isActive ? "rgb(90, 238, 90)" : null}
                      />
                    </span>
                    <span className="ict text-sm-start ms-2">Dashboard</span>
                  </div>
                )}
              </NavLink>
            </Col>
          </Row>

          {authState.profile.role_id === 1 ? (
            <Row>
              <Col>
                <NavLink to="/Config">
                  {({ isActive }) => (
                    <div className="menu" onClick={handleClose}>
                      <span className="icon">
                        <FaCog
                          size={"1.4em"}
                          color={isActive ? "rgb(90, 238, 90)" : null}
                        />
                      </span>
                      <span className="ict text-sm-start ms-2">Config</span>
                    </div>
                  )}
                </NavLink>
              </Col>
            </Row>
          ) : null}
          {authState.profile.role_id === 1 ? (
            <Row>
              <Col>
                <NavLink to="/user">
                  {({ isActive }) => (
                    <div className="menu" onClick={handleClose}>
                      <span className="icon">
                        <FaUser
                          size={"1.4em"}
                          color={isActive ? "rgb(90, 238, 90)" : null}
                        />
                      </span>
                      <span className="ict text-sm-start ms-2">Users</span>
                    </div>
                  )}
                </NavLink>
              </Col>
            </Row>
          ) : null}

          <Row>
            <Col>
              <FaSignOutAlt size={"1.4em"} />
              <AzureLogout></AzureLogout>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default RenderOffCanvas;
