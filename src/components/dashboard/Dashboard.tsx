import {FaCoins, FaGlobe, FaShoppingCart} from "react-icons/fa";
import {AiFillHdd} from "react-icons/ai";
import Chart from "./Chart/Chart";
import PieCharts from "./PieCharts/PieCharts";
import Link from "next/link";
import {BsFillPostcardHeartFill} from "react-icons/bs";

const Dashboard = () => {
  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card bg-glass">
            <div className="card-body p-3">
              <div className="row">
                <div className="col-8">
                  <Link href="/post" style={{color: "#000"}}>
                    <div className="numbers">
                      <p className="text-sm mb-0 text-uppercase font-weight-bold">
                        TOTAL User
                      </p>
                      <h5 className="font-weight-bolder">16</h5>
                      <p className="mb-0">
                        <span className="text-success text-sm font-weight-bolder">
                          16
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
                    <h5 className="font-weight-bolder">3</h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        3 {' '}
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
                    <h5 className="font-weight-bolder">60</h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        60 {' '}
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
                      total leads{" "}
                    </p>
                    <h5 className="font-weight-bolder">10</h5>
                    <p className="mb-0">
                      <span className="text-success text-sm font-weight-bolder">
                        10 
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
        <Chart />
        <PieCharts init={50} progress={10} Completed={20} />
      </div>
    </div>
  );
};

export default Dashboard;
