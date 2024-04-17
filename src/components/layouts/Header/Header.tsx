import Image from "next/image";
import {IoIosSettings} from "react-icons/io";
import {FaUser} from "react-icons/fa";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sidebarToggle} from "@/redux/reducer/sidebar";
import {googleLogout} from "@react-oauth/google";
import {RootState} from "@/redux/store";
import {removeToken} from "@/redux/reducer/login";
import {usePathname} from "next/navigation";
import {Dropdown} from "react-bootstrap";
import Link from "next/link";
import {useRouter} from "next/router";
import {CiLogout} from "react-icons/ci";
const Header = () => {
  const [userClick, setUserClick] = useState(false);
  const dispatch = useDispatch();
  const path = usePathname();
  const router = useRouter();

  const user = useSelector(
    (state: RootState) => state.login.userToken
  );
  const {open} = useSelector(
    (state: RootState) => state.sidebar
  );

  const onNavToggle = (open: boolean) => {
    dispatch(sidebarToggle(!open));
  };

  const onLogOut = () => {
    dispatch(removeToken());
    googleLogout();
  };

  return (
    <nav
      className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl"
      id="navbarBlur"
      data-scroll="false"
    >
      <div className="container-fluid py-1 px-3 w-100">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm text-white">
              <a className="opacity-5 text-white" href="javascript:;">
                Pages
              </a>
            </li>
            {path?.split("/").map((path, index) => {
              if (path) {
                return (
                  <li
                    key={index}
                    className="breadcrumb-item text-sm text-white active text-capitalize"
                    aria-current="page"
                  >
                    {path}
                  </li>
                );
              }
            })}
          </ol>
          <h6 className="font-weight-bolder text-white mb-0 text-capitalize">
            {path?.split("/").pop()}
          </h6>
        </nav>
        <div
          className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4"
          id="navbar"
        >
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group">
              {/* <span className="input-group-text text-body">
                <i className="fas fa-search" aria-hidden="true"></i>
              </span> */}
              {/* <input
                type="text"
                className="form-control"
                placeholder="Type here..."
              /> */}
            </div>
          </div>
          <ul className="navbar-nav  justify-content-end">
            <li className="nav-item  px-3 d-flex align-items-center">
              <a
                href="javascript:;"
                className="nav-link text-white p-0"
                id="iconNavbarSidenav"
              >
                <div
                  className="sidenav-toggler-inner"
                  onClick={() => onNavToggle(open)}
                >
                  <i className="sidenav-toggler-line bg-white"></i>
                  <i className="sidenav-toggler-line bg-white"></i>
                  <i className="sidenav-toggler-line bg-white"></i>
                </div>
              </a>
            </li>
            <div
              style={{
                backgroundColor: "right",
                color: "white",
                fontWeight: 600,
                marginTop: "5px",
              }}
              role="button"
            >
              {/* {profileData?.first_name && profileData?.last_name
                ? `${profileData.first_name} ${profileData.last_name}`
                : 'Admin'} */}
            </div>
            <Dropdown as="li" className="ms-2">
              <Dropdown.Toggle
                as="a"
                bsPrefix=" "
                className="rounded-circle"
                id="dropdownUser"
              >
                <div className="avatar avatar-md avatar-indicators avatar-online">
                  <div
                    style={{
                      lineHeight: "0px",
                      cursor: "pointer",
                      width: "33px",
                      height: "33px",
                    }}
                  >
                    <Image
                      src={user?.image || "/assets/logo.png"}
                      alt="profile"
                      style={{
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      className="rounded-circle"
                      width="33"
                      height="33"
                    />
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu
                className="dropdown-menu dropdown-menu-end "
                align="end"
                aria-labelledby="dropdownUser"
              >
                <Dropdown.Item
                  as="div"
                  className="px-4 pb-0 pt-2"
                  bsPrefix=" "
                >
                  <div className="lh-1 ">
                    <h5 className="mb-2 ">
                      {user?.first_name + " " + user?.last_name}
                    </h5>
                    <p style={{color: "#ccc"}}> </p>
                    <Link
                      href={"mailto:" + user?.email}
                      className="text-inherit fs-6"
                    >
                      {user?.email}
                    </Link>
                  </div>
                  <div className=" dropdown-divider mt-3 mb-2"></div>
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => {
                    router.push("/userprofile");
                  }}
                >
                  <FaUser />
                  <i className="fe fe-user me-2"></i> Edit Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    onLogOut();
                  }}
                >
                  <CiLogout /> <i className="fe fe-power me-2"></i>Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
