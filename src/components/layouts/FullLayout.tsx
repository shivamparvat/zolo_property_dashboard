import {Container} from "react-bootstrap";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const FullLayout = ({children}: childrenType) => {
  const {open} = useSelector((state: RootState) => state.sidebar);
  const loading = useSelector((state: RootState) => state.loader.loading);

  return (
    <div>
      <section className="background-radial-gradient" style={{
        overflowY: "scroll",
        overflowX: "hidden",
        minHeight: '100vh !important'
      }}>
        {loading ? (
          <div className="global__loader__Container">
            <div id="global__loader">
              <div className="whirly__loader"> </div>
            </div>
          </div>
        ) : null}
        {open && <Sidebar />}
        <main className="main-content position-relative border-radius-lg">
          <div className="position-relative">
            <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
            <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div> <Header />
            <div className="flex-grow-1">
              <Container className="pt-4 wrapper" fluid>
                <div >{children}</div>
              </Container>
            </div>
          </div>
          <footer className="footer pt-3  "></footer>
        </main>



      </section>
    </div>
  );
};

export default FullLayout;
