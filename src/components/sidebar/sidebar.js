// import React from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
// import { FaScrewdriver } from 'react-icons/fa';
// import { FiUsers } from 'react-icons/fi';
// import { BsGraphUp } from 'react-icons/bs';
// import { useSelector } from 'react-redux';
// import { IoSettingsSharp } from 'react-icons/io5';
// import { MdOutlineDashboardCustomize } from 'react-icons/md';
// import { NavLink } from 'react-router-dom';
// import { RouteKeys } from '../../containers/routes/route-keys';
// import { data } from '../../helper/data';

// export default function SideNavBar({ name, handleClose, show, ...props }) {
//     const authState = useSelector((state) => state.authUser);
//     const uniqueStream = [];

//     data.map((item) => {
//         item.stream.map((stream) => {
//             if (uniqueStream.indexOf(stream) === -1) {
//                 uniqueStream.push(stream);
//             }
//         });
//     });
//     return (
//         <div
//             className=" position-absolute d-none d-md-block"
//             style={{
//                 height: '93.3vh',
//                 maxWidth: '160px',
//                 minWidth: '160px',
//                 background: 'rgb(33, 37, 41)',
//             }}
//         >
//             <Container>
//                 {/* Metrics */}
//                 {/* {authState.profile.role_id === 1 ||
//                 authState.profile.role_id === 2 ? (
//                     <Row>
//                         <Col>
//                             <NavLink to="/metrics">
//                                 {({ isActive }) => (
//                                     <div className="menu">
//                                         <span className="icon">
//                                             <FaScrewdriver
//                                                 size={'1.5em'}
//                                                 color={
//                                                     isActive
//                                                         ? 'rgb(90, 238, 90)'
//                                                         : null
//                                                 }
//                                             />
//                                         </span>
//                                         <span className="ict">Metrics</span>
//                                     </div>
//                                 )}
//                             </NavLink>
//                         </Col>
//                     </Row>
//                 ) : null} */}

//                 {/* Quick sight */}

//                 {authState.profile.role_id === 1 ||
//                 authState.profile.role_id === 2 ? (
//                     <Row style={{ marginTop: '25px' }}>
//                         <Col>
//                             <Row>
//                                 <Col>
//                                     <label
//                                         for="touch"
//                                         className="d-flex gap-2 ms-2"
//                                     >
//                                         <MdOutlineDashboardCustomize
//                                             className="text-light"
//                                             size={'1.5em'}
//                                         ></MdOutlineDashboardCustomize>
//                                         <div className="text-light titlename ">
//                                             Dashboard
//                                         </div>
//                                     </label>
//                                     <input type="checkbox" id="touch"></input>
//                                     <div className="slide">
//                                         <NavLink to="/dashboard/youtube">
//                                             {({ isActive }) => (
//                                                 <div
//                                                     color={
//                                                         isActive
//                                                             ? 'rgb(90, 238, 90)'
//                                                             : null
//                                                     }
//                                                 >
//                                                     Youtube
//                                                 </div>
//                                             )}
//                                         </NavLink>
//                                         {/* <NavLink to="/dashboard/schema">
//                                             {({ isActive }) => (
//                                                 <div
//                                                     color={
//                                                         isActive
//                                                             ? 'rgb(90, 238, 90)'
//                                                             : null
//                                                     }
//                                                 >
//                                                     Schema
//                                                 </div>
//                                             )}
//                                         </NavLink>
//                                         <NavLink to="/dashboard/volume">
//                                             {({ isActive }) => (
//                                                 <div
//                                                     color={
//                                                         isActive
//                                                             ? 'rgb(90, 238, 90)'
//                                                             : null
//                                                     }
//                                                 >
//                                                     Volume
//                                                 </div>
//                                             )}
//                                         </NavLink>
//                                         <NavLink to="/dashboard/distribution">
//                                             {({ isActive }) => (
//                                                 <div
//                                                     color={
//                                                         isActive
//                                                             ? 'rgb(90, 238, 90)'
//                                                             : null
//                                                     }
//                                                 >
//                                                     Distribution
//                                                 </div>
//                                             )}
//                                         </NavLink> */}
//                                     </div>
//                                 </Col>
//                             </Row>
//                         </Col>
//                     </Row>
//                 ) : null}

//                 {/* Qlik */}

//                 {/* {authState.profile.role_id === 3 ? (
//                     <Row style={{ marginTop: '35px' }}>
//                         <Col>
//                             <Row>
//                                 <Col>
//                                     <label
//                                         for="qliktouch"
//                                         className="d-flex gap-2 ms-2"
//                                     >
//                                         <BsGraphUp
//                                             className="text-light"
//                                             size={'1.5em'}
//                                         ></BsGraphUp>
//                                         <div className="text-light titlename ">
//                                             Qlik
//                                         </div>
//                                     </label>
//                                     <input
//                                         type="checkbox"
//                                         id="qliktouch"
//                                     ></input>
//                                     <div className="slide qliksside">
//                                         <NavLink to="/qlik/d489f4a1-1dca-4a76-ac2b-4eb4a41a6418/d49b49a2-7fdd-47b3-bc7b-d64a5e3e3d12">
//                                             {({ isActive }) => (
//                                                 <div
//                                                     color={
//                                                         isActive
//                                                             ? 'rgb(90, 238, 90)'
//                                                             : null
//                                                     }
//                                                 >
//                                                     Schema
//                                                 </div>
//                                             )}
//                                         </NavLink>
//                                         <NavLink to="/qlik/19b59642-d1ee-47e9-8699-5fafaaa07c1a/ebae1db5-77c9-4b13-bae4-bba84566ff30">
//                                             {({ isActive }) => (
//                                                 <div
//                                                     color={
//                                                         isActive
//                                                             ? 'rgb(90, 238, 90)'
//                                                             : null
//                                                     }
//                                                 >
//                                                     Freshness
//                                                 </div>
//                                             )}
//                                         </NavLink>
//                                         <NavLink to="/qlik/be3b38a4-4a68-4aab-8d48-1a17cd98d078/6e3a61b7-66f3-4814-a3f2-8cea7e231ab8">
//                                             {({ isActive }) => (
//                                                 <div
//                                                     color={
//                                                         isActive
//                                                             ? 'rgb(90, 238, 90)'
//                                                             : null
//                                                     }
//                                                 >
//                                                     Volume
//                                                 </div>
//                                             )}
//                                         </NavLink>
//                                         <NavLink to="/qlik/0a4e64f0-cd95-43cb-9735-923410447f26/19ccc49d-cebf-48c3-9cd3-4ed6b4a58d78">
//                                             {({ isActive }) => (
//                                                 <div
//                                                     color={
//                                                         isActive
//                                                             ? 'rgb(90, 238, 90)'
//                                                             : null
//                                                     }
//                                                 >
//                                                     Distribution
//                                                 </div>
//                                             )}
//                                         </NavLink>
//                                     </div>
//                                 </Col>
//                             </Row>
//                         </Col>
//                     </Row>
//                 ) : null} */}

//                 {/* settings */}

//                 {authState.profile.role_id === 1 ? (
//                     <Row style={{ marginTop: '35px' }}>
//                         <Col>
//                             <Row>
//                                 <Col>
//                                     <label
//                                         for="stouch"
//                                         className="d-flex gap-2 ms-2"
//                                     >
//                                         <IoSettingsSharp
//                                             className="text-light"
//                                             size={'1.5em'}
//                                         ></IoSettingsSharp>
//                                         <div className="text-light titlename ">
//                                             Config
//                                         </div>
//                                     </label>
//                                     <input type="checkbox" id="stouch"></input>
//                                     <div className="slide settingsSlide">
//                                         {uniqueStream.map((item) => {
//                                             let url = '/config/' + `${item}`;
//                                             return (
//                                                 <>
//                                                     <NavLink to={url}>
//                                                         {({ isActive }) => (
//                                                             <div
//                                                                 color={
//                                                                     isActive
//                                                                         ? 'rgb(90, 238, 90)'
//                                                                         : null
//                                                                 }
//                                                             >
//                                                                 {item}
//                                                             </div>
//                                                         )}
//                                                     </NavLink>
//                                                 </>
//                                             );
//                                         })}

//                                         {/* <NavLink to={RouteKeys.DataSource}>
//                                             {({ isActive }) => (
//                                                 <div
//                                                     color={
//                                                         isActive
//                                                             ? 'rgb(90, 238, 90)'
//                                                             : null
//                                                     }
//                                                 >
//                                                     Data Source
//                                                 </div>
//                                             )}
//                                         </NavLink> */}
//                                     </div>
//                                 </Col>
//                             </Row>
//                         </Col>
//                     </Row>
//                 ) : null}

//                 {/* Users */}

//                 {authState.profile.role_id === 1 ||
//                 authState.profile.role_id === 3 ? (
//                     <Row>
//                         <Col>
//                             <NavLink
//                                 className={(nav) =>
//                                     nav?.isActive ? 'active' : null
//                                 }
//                                 to="/users"
//                             >
//                                 {({ isActive }) => (
//                                     <div className="menu">
//                                         <span className="icon">
//                                             <FiUsers
//                                                 size={'1.5em'}
//                                                 color={
//                                                     isActive
//                                                         ? 'rgb(90, 238, 90)'
//                                                         : null
//                                                 }
//                                             />
//                                         </span>
//                                         <span className="ict">Users</span>
//                                     </div>
//                                 )}
//                             </NavLink>
//                         </Col>
//                     </Row>
//                 ) : null}
//             </Container>
//         </div>
//     );
// }
