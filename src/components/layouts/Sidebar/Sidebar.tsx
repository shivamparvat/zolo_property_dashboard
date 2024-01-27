import {useEffect} from "react";
import Image from "next/image";
import {BsSmartwatch} from "react-icons/bs";
import {CgScreen} from "react-icons/cg";
import {IoIosPaper} from "react-icons/io";
import {BsFillTagFill, BsChevronDown, BsChevronUp} from "react-icons/bs";
import {TbTruckDelivery, TbBrandPlanetscale} from "react-icons/tb";
import {BsBagCheckFill} from "react-icons/bs";
import {FaCartShopping, FaUserPlus} from "react-icons/fa6";
import {BiCategory} from "react-icons/bi";
import {IoCall, IoCallOutline, IoSettings} from "react-icons/io5";
import {HiOutlineReceiptTax} from "react-icons/hi";
import {ImCross} from "react-icons/im";
import {MdBikeScooter, MdCategory, MdHomeWork} from "react-icons/md";
import {BsFillPostcardHeartFill} from "react-icons/bs";
import {GiPayMoney} from "react-icons/gi";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {sidebarToggle} from "@/redux/reducer/sidebar";
import {COMPANY_NAME_SHOW, LOGO_SRC, company_name} from "@/components/Utils/constants";
import {CiLogout} from "react-icons/ci";
import {FaHeart, FaImage} from "react-icons/fa";

const navigation = [
  {
    id: 0,
    title: "Dashboard",
    href: "/dashboard",
    icon: <CgScreen style={{fontSize: "1.2rem", color: "#ABB6F0"}} />,
  },
  {
    id: 3,
    title: "Ads",
    href: "/post",
    icon: <BsFillPostcardHeartFill style={{fontSize: "1rem", color: "#11CDEF"}} />,
  },
  {
    id: 3,
    title: "Interested",
    href: "/interested",
    icon: <FaHeart style={{fontSize: "1rem", color: "#f5464e"}} />,
  },
  {
    id: 2,
    title: "Property",
    href: "/property",
    icon: <MdHomeWork style={{fontSize: "1rem", color: "#000100"}} />,
  },
  {
    id: 1,
    title: "Setting",
    href: "/setting/phone",
    icon: <IoSettings style={{fontSize: "1.1rem", color: "#FB6340"}} />,
    subMenu: [
      {
        ids: 1,
        title: "Phone Number",
        href: "/setting/phone",
        icon: <IoCall style={{fontSize: "1rem", color: "FF55BB"}} />,
      },
      {
        ids: 1,
        title: "Poster",
        href: "/setting/poster",
        icon: <FaImage style={{fontSize: "1rem", color: "5F0F40"}} />,
      },
      {
        ids: 1,
        title: "EMI",
        href: "/setting/emi",
        icon: <GiPayMoney style={{fontSize: "1rem", color: "#E48F45"}} />,
      },
    ],
  },
  {
    id: 7,
    title: "Users",
    href: "/users",
    icon: <FaUserPlus style={{fontSize: "1.1rem", color: "#106FFB"}} />,
  },
];

const Sidebar = () => {
  const path = usePathname();
  const dispatch = useDispatch();
  const {open} = useSelector(
    (state: RootState) => state.sidebar
  );

  const onNavToggle = (open: boolean) => {
    dispatch(sidebarToggle(!open));
  };

  const [CloseSideBar, setCloseSideBar] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 1200 ? setCloseSideBar(true) : setCloseSideBar(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <aside className="sidenav bg-glass navbar navbar-vertical navbar-expand-xs border-0 fixed-start overflow-hidden">
      <div className="sidenav-header">
        {CloseSideBar && (
          <ImCross
            className="cursor-pointer text-secondary opacity-5 position-absolute end-6 top-2"
            id="iconSidenav"
            onClick={() => onNavToggle(open)}
            size={10}
          />
        )}
        <a className="navbar-brand m-0" target="_blank">
          <Image
            src={LOGO_SRC}
            alt="github Logo"
            width={80}
            height={40}
            className="object-fit-contain"
          />
          {COMPANY_NAME_SHOW && <span className="ms-1 font-weight-bold text-uppercase">{company_name}</span>}
        </a>
      </div>
      <hr className="horizontal dark mt-0" />
      <ul className="navbar-nav overflow-auto side_Nav_container">
        {navigation.map((nav: any, index) => {
          if (nav.label)
            return (
              <li className="nav-item mt-3" key={index + "k"}>
                <h6 className="ps-4 ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
                  {nav.label}
                </h6>
              </li>
            );
          return (
            <div key={nav.id}>
              {nav.subMenu ? (
                <>
                  <Link
                    className={`nav-link ${path === nav.href ? "active" : ""}`}
                    href={nav.href}
                  >
                    <div className="icon icon-shape icon-md border-radius-md text-center me-2 d-flex align-items-center justify-content-center opacity-10">
                      {nav.icon}
                    </div>
                    <span
                      className="nav-link-text ms-3"
                      style={{fontSize: "0.9rem"}}
                    >
                      {nav.title}
                    </span>
                    {path.split("/")[1] === nav.href.split("/")[1] ? (
                      <BsChevronUp
                        className="bi bi-chevron-up ms-auto md-auto"
                        size={15}
                      />
                    ) : (
                      <BsChevronDown
                        className="bi bi-chevron-down ms-auto md-auto"
                        size={15}
                      />
                    )}
                  </Link>
                  {path.split("/")[1] === nav.href.split("/")[1] ? (
                    <>
                      {nav.subMenu.map(
                        (
                          subNavItem: any,
                          subIndex: React.Key | null | undefined
                        ) => (
                          <li className="sub_menu nav-item ms-2" key={subIndex}>
                            <Link
                              className={`nav-link ${path === subNavItem.href ? "active" : ""
                                }`}
                              href={subNavItem.href}
                            >
                              <div className="icon icon-shape icon-md border-radius-md text-center d-flex align-items-center justify-content-end opacity-10">
                                {subNavItem.icon}
                              </div>
                              <span
                                className="nav-link-text ms-4"
                                style={{fontSize: "0.9rem"}}
                              >
                                {subNavItem.title}
                              </span>
                            </Link>
                          </li>
                        )
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  {/* <Collapse isOpen={}> */}

                  {/* </Collapse> */}
                </>
              ) : (
                <li className="nav-item" key={nav.id}>
                  <Link href={nav.href}>
                    <div
                      className={`nav-link ${path === nav.href ? "active" : ""
                        }`}
                    //   onClick={() => setActiveItem(index)}
                    >
                      <div className="icon icon-shape icon-md border-radius-md text-center me-2 d-flex align-items-center justify-content-center opacity-10">
                        {nav.icon}
                      </div>
                      <span className="ms-3 d-inline-block">{nav.title}</span>
                    </div>
                  </Link>
                </li>
              )}
            </div>
          );
        })}
      </ul>
      <div className="sidenav-footer position-fixed w-100 fixed-bottom p-2" style={{backgroundColor: "#1c2a4221"}}>
        <div
          className="nav-link d-flex justify-content-start align-items-center"
        >
          <span><CiLogout size={25} style={{fontSize: "1rem", color: "#000100"}} /></span>
          <span
            className="nav-link-text ms-4 text-uppercase font-weight-bold active user-select-none"
            style={{fontSize: "0.9rem"}}
          >
            logOut
          </span>
        </div>

      </div>
    </aside>
  );
};

export default Sidebar;
