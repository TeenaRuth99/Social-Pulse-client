import React, { useState, useEffect } from "react";
import "./User.scss";
import api from "../../api";
import DynamicUserTable from "../../components/tablewithpaginationandlimit/user-table";
// import Filter from '../../components/filter/filter';
import Filters from "../../components/filter/filters";
import { Container, Row, Col } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import SearchBar from "../../components/searchBar/searchBar";
import { useNavigate } from "react-router-dom";
import TableSkeletonLoader from "../../components/loader/table-skeleton-loader/table-skeleton-loader";
import CreateUser from "../../components/Crud/CreateUser";
import Sort from "../../components/sort/sort";
import Limitdropup from "../../components/limit-drop-up/limit-drop-up";
import Pagination from "../../components/pagination/pagination";

const User = () => {
  const [user, setUser] = useState([]);
  const [filter, setFilter] = useState();
  const [sort, setSort] = useState([]);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [filterData, setFilterData] = useState();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emptyFilter, setEmptyFilter] = useState(false);
  const [emptySearchbar, setEmptySearchbar] = useState(false);

  const navigate = useNavigate();

  const request = {
    resource: "users",
    // limit,
    // currentPage,
    search,
    // sort,
    filter,
  };

  // for limit
  const handlingLimit = (limit) => {
    setLimit(limit);
    setCurrentPage(1);
  };

  //for page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //for sort
  const handleSort = (value) => {
    setSort(value);
    setCurrentPage(1);
  };

  //for search
  const handleSearch = (value) => {
    setEmptyFilter(!emptyFilter);
    setFilter({
      dataSource: [],
      checktypes: [],
    });
    setSearch(value);
    setCurrentPage(1);
  };

  //for filter
  const handleFilter = (value) => {
    setEmptySearchbar(!emptySearchbar);
    setSearch("");
    setFilter(value);
    setCurrentPage(1);
  };

  const handleEdit = (row) => {
    navigate(`/edituser/${row.original.user_id}`);
  };

  const columns = [
    {
      Header: "User",
      Cell: ({ row }) => (
        <div className="d-flex flex-row gap-1  color ">
          <div
            style={{
              width: "38px",
              backgroundColor: "#1F67C6",
              height: "37px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <h6 className="text-light  text-uppercase d-flex flex-row pt-1">
              <div>{row.original.first_name.split("").join()[0]}</div>
              <div>{row.original.last_name.split("").join()[0]}</div>
            </h6>
          </div>
          <div className="pt-2">
            <div className="fw-bolder" style={{ fontSize: "15px" }}>
              {row.original.display_name}
            </div>
            <div className="text-secondary" style={{ fontSize: "15px" }}>
              {row.original.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      Header: "First Name",
      accessor: "first_name",
    },
    {
      Header: "Last Name",
      accessor: "last_name",
    },

    {
      Header: "Role",
      Cell: ({ row }) => <>{row.original.role_id == 1 ? "Admin" : "Viewer"}</>,
      // accessor: 'role_id',
    },
    {
      Header: "Status",
      Cell: ({ row }) => (
        <>
          {row.original.status == "Active" ? (
            <div className="d-flex flexx-row gap-1">
              <FaCircle className="pt-2 text-success"></FaCircle>
              <div>Active</div>
            </div>
          ) : (
            <div className="d-flex flexx-row gap-1">
              <FaCircle className="pt-2 text-danger"></FaCircle>
              <div>Inactive</div>
            </div>
          )}
        </>
      ),
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <FaEdit
          className="text-dark mx-2 font-size"
          onClick={() => {
            handleEdit(row);
          }}
        ></FaEdit>
      ),
    },
  ];

  const fetchUserTable = async () => {
    try {
      setIsLoading(true);
      const userData = await api.crud.getList1(request);
      //setPages(userData.data.pages);
      if (userData.data?.data?.rows == null) setUser(userData.data?.data);
      else setUser(userData.data?.data?.rows);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserRole = async () => {
    try {
      const userList = await api.rolelist.getRole();
      let arr = userList?.data?.data?.rows?.map((data) => ({
        role_name: data.role_name,
        role_id: data.role_id,
      }));
      setFilterData(arr);
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  useEffect(() => {
    fetchUserTable();
  }, [search, filter]); //eslint-disable-line react-hooks/exhaustive-deps
  //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <>
        <div className="d-flex justify-content-between">
          <h5 className="text-dark pt-4 fw-bold">Users</h5>

          <div className="d-flex gap-2 mt-3 mb-3">
            <button
              type="button"
              className="btn btn text-light custom_button d-flex flex-row"
              style={{
                backgroundColor: "rgb(73, 151, 73)",
              }}
              onClick={() => {
                navigate("/addUser");
              }}
            >
              <div className="add-user">
                <div className="icons">
                  <IoPersonAddSharp
                    size={"15px"}
                    style={{
                      marginRight: "7px",
                      marginBottom: "4px",
                    }}
                  />
                  <span>Add User</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        <Row>
          <Col md={4} className="my-1">
            <SearchBar
              handleSearch={handleSearch}
              emptySearchbar={emptySearchbar}
            ></SearchBar>
          </Col>
          <Col md={8}>
            <Filters
              filterData={filterData}
              handleFilter={handleFilter}
              emptyFilter={emptyFilter}
              statusData={["Active", "Inactive"]}
            ></Filters>
          </Col>
        </Row>

        {isLoading ? (
          <TableSkeletonLoader
            intialrows={8}
            initalcolumns={5}
          ></TableSkeletonLoader>
        ) : (
          <>
            <DynamicUserTable
              row={user}
              columns={columns}
              isPagination={false}
              isLimit={false}
              pages={pages}
              limit={limit}
              // handlingLimit={handlingLimit}
              // handlePageChange={handlePageChange}
              // currentPage={currentPage}
            ></DynamicUserTable>
            <div className="d-flex justify-content-end  mx-auto  w-100 ">
              <Row>
                <div className="d-flex  mx-3">
                  <div className="py-2 font-weight-semibold">
                    Records per page
                  </div>
                  <div className=" px-1">
                    <Limitdropup
                      limit={limit}
                      handlingLimit={handlingLimit}
                    ></Limitdropup>
                  </div>
                </div>
              </Row>

              <div className="py-1">
                <Pagination
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  pages={pages}
                ></Pagination>
              </div>
            </div>
          </>
        )}
      </>
    </Container>
  );
};

export default User;
