import react, {useEffect, useState} from "react";
import {RootState} from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import Filter from "../Utils/Filter";
import {DDMMYYYY} from "../Utils/Formeter";
import CustomTable, {ActionButtons, ActionSwitch} from "../Utils/CustomTable";
import Image from "next/image";
import Pagination from "../Utils/Pagination";
import React from "react";
import {
  USER_ROLE_TYPE_DATA,
  INIT_FILTER,
  PAGE_TYPE_ADD,
  PAGE_TYPE_EDIT,
} from "../Utils/constants";
import TableHeader from "../Utils/CustomTable/TableHeader";
import ActionFeature from "@/Api/ActionFeature";
import {IoCallOutline} from "react-icons/io5";


export const UserName: React.FC<any> = ({data}) => (
  <div className="d-flex px-2 py-1">
    <div>
      <Image
        src={data.image || "/img/profile.png"}
        alt="user1"
        width={36}
        height={36}
        className="avatar avatar-sm me-3"
      />
    </div>
    <div className="d-flex flex-column justify-content-center">
      <h6>{`${data.first_name} ${data.last_name}`}</h6>
      <p className="text-xs text-secondary mb-0">{`${data.email}`}</p>
    </div>
  </div>
);

const Interested = () => {
  // init
  const path = "intersted";

  // configure
  ActionFeature.path = path;

  // hooks
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.login.userToken?.token);
  const {recallApi} = useSelector((state: RootState) => state.recallApi);

  // status
  const [filter, setFilter] = useState(INIT_FILTER);
  const [interstedData, setUserData] = useState({
    list: [],
    pagination: {total: 0},
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState({});
  const [actionType, setActionType] = useState<string>("");

  // useEffects
  useEffect(() => {
    ActionFeature.get(currentPage, filter, setUserData);
  }, [filter, token, dispatch, currentPage, recallApi]);

  // custom table components

  const TableCustomize: CustomTable[] = [
    {
      value: "S.No",
      index: true,
    },
    {
      value: "Intersted",
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
          id={data.intersted_id}
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

  return (
    <div className="card bg-glass">
      <div className="card-datatable ">
        <div className="dataTables_wrapper dt-bootstrap5">
          <TableHeader
            title={`List of ${path}`}
            onAddClick={() => setActionType(PAGE_TYPE_ADD)}
            onExportClick={() => {
              ActionFeature.download();
            }}
          />
          <Filter filter={filter} setFilter={setFilter} />

          <CustomTable
            tableCustomize={TableCustomize}
            data={(interstedData && interstedData.list) || []}
            StartIndex={+filter.limit * (+currentPage - 1) + 1 || 1}
          />

          <Pagination
            currentPage={currentPage}
            limit={filter.limit}
            setCurrentPage={setCurrentPage}
            total={interstedData.pagination?.total || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Interested;
