import CustomTable, {ActionSwitch} from "@/components/Utils/CustomTable";
import {DDMMYYYY} from "@/components/Utils/Formeter";
import {UserName} from "@/components/users/Users";
import {IoCallOutline} from "react-icons/io5";


const TableCustomizer: CustomTable[] = [
  {
    value: "S.No",
    index: true,
  },
  {
    value: "User",
    component: UserName,
  },
  {
    key: "phone_number",
    value: "Phone Number",
  },
  {
    value: "called",
    component: ({data}) => (
      <ActionSwitch
        id={data.user_id}
        is_active={data.is_active}
        url="called"
      />
    ),
  },
  {
    value: "Action",
    component: ({data}) => (
      <>
        <button
          onClick={() => {
            const link = document.createElement("a");
            link.href = "tel:+916261282518";
            document.body.appendChild(link);
            link.click();
            link.remove();
          }}
          className="btn btn-primary"
          data-tooltip="Call"
        >
          <IoCallOutline size={22} />
        </button>
      </>
    ),
  },

]

const Chart = () => {
  return (
    <div className="col-lg-7 mb-lg-0 mb-4">
      <div className="card z-index-2 h-100 bg-glass">
        <div className="card-header pb-0 pt-3 bg-transparent">
          <h6 className="text-capitalize">Interested people</h6>
          <p className="text-sm mb-0">
            <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
            <span className="font-weight-bold">5 people Interested </span> {DDMMYYYY(new Date().toDateString())}
          </p>
        </div>
        <div className="card-body p-3">
          <div className="chart" style={{height: "300px"}}>
            <CustomTable tableCustomize={TableCustomizer} data={[{},{},{}]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
