import react, {useEffect, useState} from "react";
import {RootState} from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import Filter, {PROPERTY_FOR, PROPERTY_TYPE} from "../Utils/Filter";
import CustomTable, {ActionButtons, ActionSwitch, EDIT} from "../Utils/CustomTable";
import Image from "next/image";
import Pagination from "../Utils/Pagination";
import React from "react";
import {
  INIT_FILTER,
  PAGE_TYPE_ADD,
  PAGE_TYPE_EDIT,
} from "../Utils/constants";
import TableHeader, {SECOND_BUTTON} from "../Utils/CustomTable/TableHeader";
import ActionFeature from "@/Api/ActionFeature";
import StatusChange from "./StatusChange";
import {TfiWrite} from "react-icons/tfi";
import ActionScreen from "./ActionScreen";

const order_by_option = ["name", "city", "number", "zip_code", "call", "leads", "is_fake", "email_sent", "type", "status"]


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
  const path = "interested";

  // configure
  ActionFeature.path = path;

  // hooks
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.login.userToken?.token);
  const {recallApi} = useSelector((state: RootState) => state.recallApi);

  // status
  const [filter, setFilter] = useState(INIT_FILTER);
  const [fetchData, setFetchData] = useState({
    list: [],
    pagination: {total: 0},
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState<any>({});
  const [actionType, setActionType] = useState<string>("");

  // useEffects
  useEffect(() => {
    ActionFeature.get(currentPage, filter, setFetchData);
  }, [filter, token, dispatch, currentPage, recallApi]);

  // custom table components

  const TableCustomize: CustomTable[] = [
    {
      value: "S.No",
      index: true,
    },
    {
      key: "Id",
      value: "Id",
      component: ({data}) => <>{data?._id?.slice(-6)?.toUpperCase()}</>
    },
    {
      key: "name",
      value: "name",
    },
    {
      key: "number",
      value: "number",
    },
    {
      key: "city",
      value: "city",
    },
    {
      key: "type",
      value: "type",
    },
    {
      value: "call",
      component: ({data}) => (
        <ActionSwitch
          data={data}
          url="update"
          keyData="call"
        />
      ),
    },
    {
      value: "Leads",
      component: ({data}) => (
        <ActionSwitch
          data={data}
          url="update"
          keyData="leads"
        />
      ),
    },
    {
      value: "Is fake",
      component: ({data}) => (
        <ActionSwitch
          data={data}
          url="update"
          keyData="is_fake"
        />
      ),
    },
    {
      value: "Email Sent",
      component: ({data}) => (
        <ActionSwitch
          data={data}
          url="update"
          keyData="email_sent"
        />
      ),
    },
    {
      value: "status",
      component: ({data}) => <StatusChange data={data} />
    },
    {
      value: "Status",
      combine: ["is_active"],
      component: ({data}) => (
        <ActionSwitch
          data={data}
        />
      ),
    },
    {
      value: "Action",
      component: ({data}) => (
        <>
          <button
            onClick={() => {
              setSelected(data)
              setActionType(PAGE_TYPE_EDIT)
            }}
            className="btn btn-success"
            data-tooltip="Edit"
          >
            <TfiWrite size={20} />
          </button>
          &nbsp;
          <ActionButtons
            data={data}
            setSelected={setSelected}
            setEdit={setActionType}
            id={data._id}
            disable={[EDIT]}
          />
        </>
      ),
    },

  ]

  return (
    <>
      {(actionType === PAGE_TYPE_ADD || actionType === PAGE_TYPE_EDIT) && (
        <ActionScreen
          id={selected._id || 0}
          isActive={
            actionType === PAGE_TYPE_ADD || actionType === PAGE_TYPE_EDIT
          }
          onClose={setActionType}
          data={{...selected, id: selected._id}}
          type={actionType == PAGE_TYPE_ADD ? PAGE_TYPE_ADD : PAGE_TYPE_EDIT}
          urls={actionType == PAGE_TYPE_ADD ? `${path}/add` : `${path}/update`}
          path={path}
        />
      )}
      <div className="card bg-glass">
        <div className="card-datatable ">
          <div className="dataTables_wrapper dt-bootstrap5">
            <TableHeader
              title={`List of ${path}`}
              onAddClick={() => setActionType(PAGE_TYPE_ADD)}
              onExportClick={() => {
                ActionFeature.download();
              }}
              disable={[SECOND_BUTTON]}
            />
            <Filter filter={filter} setFilter={setFilter} orderBy={order_by_option} disable={[PROPERTY_FOR, PROPERTY_TYPE]} />

            <CustomTable
              tableCustomize={TableCustomize}
              data={(fetchData && fetchData.list) || []}
              StartIndex={+filter.limit * (+currentPage - 1) + 1 || 1}
            />

            <Pagination
              currentPage={currentPage}
              limit={filter.limit}
              setCurrentPage={setCurrentPage}
              total={fetchData.pagination?.total || 0}
            />
          </div>
        </div>
      </div></>
  );
};

export default Interested;
