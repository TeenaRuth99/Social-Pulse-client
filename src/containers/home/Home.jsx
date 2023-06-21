import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import './home.scss';

import { adminmenu, viewermenu } from '../../helper/data';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Home() {
    const authState = useSelector((state) => state.authUser);

    return (
        <>
            <Navbar
                variant="light"
                className=" "
                style={{
                    background: 'black',
                }}
            >
                <Nav className="me-4">
                    <div className="d-md-flex d-md-block d-none">
                        {authState.profile.role_id === 1
                            ? adminmenu.map((item) => {
                                  return (
                                      <NavLink
                                          to={`/${item}`}
                                          // to="/dashboard/youtube"
                                          key={item}
                                          className={({ isActive }) =>
                                              isActive
                                                  ? ' active-btn px-3 mx-2 btn1'
                                                  : ' px-3 mx-2 btn1 '
                                          }
                                      >
                                          {item}
                                      </NavLink>
                                  );
                              })
                            : viewermenu.map((item) => {
                                  return (
                                      <NavLink
                                          to={`/${item}`}
                                          className={({ isActive }) =>
                                              isActive
                                                  ? ' active-btn px-3 mx-2 btn1'
                                                  : ' px-3 mx-2 btn1 '
                                          }
                                      >
                                          {item}
                                      </NavLink>
                                  );
                              })}
                    </div>
                </Nav>
            </Navbar>
        </>
    );
}

export default Home;
