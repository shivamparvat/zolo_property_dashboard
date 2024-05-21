import {FaCoins, FaGlobe, FaShoppingCart} from "react-icons/fa";
import {AiFillHdd} from "react-icons/ai";
import Chart from "./Chart/Chart";
import PieCharts from "./PieCharts/PieCharts";
import Link from "next/link";
import {BsFillPostcardHeartFill} from "react-icons/bs";
import ActionFeature from "@/Api/ActionFeature";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {useRouter} from "next/router";
import {INIT_FILTER} from "../Utils/constants";

const Dashboard = () => {


  const path = "dashboard";

  //   // configure
  ActionFeature.path = path;

  const dispatch = useDispatch();
  const router = useRouter()
  const token = useSelector((state: RootState) => state.login.userToken?.token);
  const {recallApi} = useSelector((state: RootState) => state.recallApi);

  // status
  const [filter, setFilter] = useState(INIT_FILTER);
  const [fetchData, setFetchData] = useState<any>({
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    ActionFeature.get(currentPage, filter, setFetchData);
  }, [filter, token, dispatch, currentPage, recallApi]);
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card bg-glass">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <Link href="/users" style={{color: "#000"}}>
                    <div className="numbers">
                      <p className="text-sm mb-0 text-uppercase font-weight-bold">
                        TOTAL User
                      </p>
                      <h5 className="font-weight-bolder">{fetchData?.totalUsers || 0}</h5>
                      <p className="mb-0">
                        <span className="text-success text-sm font-weight-bolder">
                          {fetchData?.totalUsersThisMonth || 0}
                        </span>
                        &nbsp;this month In
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                    <BsFillPostcardHeartFill
                      style={{
                        color: "white",
                        marginTop: "12px",
                        fontSize: "1.5rem",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card bg-glass">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      Total Property
                    </p>
                    <h5 className="font-weight-bolder">{fetchData?.totalProperties || 0}</h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                      {fetchData?.totalPropertiesThisMonth || 0} {' '}
                      </span>
                      this month In
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                    <FaGlobe
                      style={{
                        color: "white",
                        marginTop: "12px",
                        fontSize: "1.5rem",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card bg-glass">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      Interested
                    </p>
                    <h5 className="font-weight-bolder">{fetchData?.totalInterested || 0}</h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                      {fetchData?.totalInterestedPeopleThisMonth || 0} {' '}
                      </span>
                      this month In
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                    <AiFillHdd
                      style={{
                        color: "white",
                        marginTop: "12px",
                        fontSize: "1.5rem",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card bg-glass">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <div className="numbers">
                    <p className="text-sm mb-0 text-uppercase font-weight-bold">
                      total sold{" "}
                    </p>
                    <h5 className="font-weight-bolder">{fetchData?.soldProperties || 0}</h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                      {fetchData?.soldPropertiesThisMonth || 0}
                      </span>{" "}
                      than last month
                    </p>
                  </div>
                </div>
                <div className="col-4 text-end">
                  <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                    <FaShoppingCart
                      style={{
                        color: "white",
                        marginTop: "12px",
                        fontSize: "1.5rem",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <Chart data={fetchData?.dailyData}/>
        <PieCharts like={fetchData?.totalLikeThisMonth || 0} view={fetchData?.totalViewThisMonth || 0} leads={fetchData?.totalLeadThisMonth || 0} sold={fetchData?.soldProperties || 0}/>
      </div>
    </div>
  );
};

export default Dashboard;
