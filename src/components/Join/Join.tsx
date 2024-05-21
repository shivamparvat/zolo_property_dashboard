import ApiFeature from "@/Api/ApiFeature";
import Filter, {FILTER, PROPERTY_FOR, PROPERTY_TYPE} from "../Utils/Filter";
import {setLoader} from "@/redux/reducer/loader";
import react, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import CustomTable, {ActionButtons, ActionSwitch, EDIT} from "../Utils/CustomTable";
import {DDMMYYYY} from "../Utils/Formeter";
import Pagination from "../Utils/Pagination";
import {setRecallApi} from "@/redux/reducer/RecallApi";
import {
  INIT_FILTER,
  PAGE_TYPE_ADD,
  PAGE_TYPE_EDIT,
  TAX_TYPE_DATA,
} from "../Utils/constants";
import TableHeader, {FIRST_BUTTON, SECOND_BUTTON} from "../Utils/CustomTable/TableHeader";
import Image from "next/image";
import ActionScreen from "./ActionScreen";
import ActionFeature from "@/Api/ActionFeature";
import StatusChange from "./StatusChange";

// init

const order_by_option = ["name", "contact_number", "city", "zip_code"]

const Join = () => {
  // init
  const path = "contact";

  // configure
  ActionFeature.path = path;
  // hook
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.login.userToken?.token);
  const recallApi = useSelector(
    (state: RootState) => state.recallApi.recallApi
  );

  // status
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState(INIT_FILTER);
  const [fetchData, setFetchData] = useState({
    list: [],
    pagination: {total: 0},
  });
  const [selected, setSelected] = useState<any>({});
  const [actionType, setActionType] = useState<string>("");
  const [imageModal, setImageModal] = useState(false);
  const [selectedData, setSelectedData] = useState({post_id: 0});

  // useEffects
  useEffect(() => {
    ActionFeature.get(currentPage, filter, setFetchData);
    return () => { };
  }, [filter, token, dispatch, currentPage, recallApi]);

  // active or deactivate

  const TableCustomize: CustomTable[] = [
    {
      value: "S.No",
      index: true,
    },
    {
      key: "name",
      value: "name",
    },
    {
      key: "contact_number",
      value: "Number",
    },
    {
      key: "address",
      value: "address",
    },
    {
      value: "Created At",
      component: ({data}) => <>{DDMMYYYY(data.createdAt)}</>,
    },
    {
      value: "status",
      component: ({data}) => <StatusChange data={data} />
    },
    // {
    //   value: "Status",
    //   component: ({data}) => (
    //     <ActionSwitch data={data} />
    //   ),
    // },
    {
      value: "Action",
      component: ({data}) => (
        <ActionButtons
          data={data}
          setSelected={setSelected}
          setEdit={setActionType}
          disable={[EDIT]}
          id={data._id}
        />
      ),
      className: "d-flex ",
    },
  ];

  return (
    <>
      {(actionType === PAGE_TYPE_ADD || actionType === PAGE_TYPE_EDIT) && (
        <ActionScreen
          id={selected._id || 0}
          isActive={
            actionType === PAGE_TYPE_ADD || actionType === PAGE_TYPE_EDIT
          }
          onClose={setActionType}
          data={{...selected, id: selected.post_id}}
          type={actionType == PAGE_TYPE_ADD ? PAGE_TYPE_ADD : PAGE_TYPE_EDIT}
          urls={actionType == PAGE_TYPE_ADD ? `${path}/add` : `${path}/update`}
          path={path}
        />
      )}
      <div className="card bg-white">
        <div className="card-datatable">
          <div className="dataTables_wrapper dt-bootstrap5">
            <TableHeader
              title={`List of ${path}`}
              onAddClick={() => setActionType(PAGE_TYPE_ADD)}
              onExportClick={() => {
                ActionFeature.download();
              }}
              disable={[FIRST_BUTTON,SECOND_BUTTON]}
            />
            <Filter filter={filter} disable={[PROPERTY_FOR, PROPERTY_TYPE]} setFilter={setFilter} orderBy={order_by_option} />
            <CustomTable
              tableCustomize={TableCustomize}
              data={fetchData && fetchData?.list}
              StartIndex={+filter.limit * (+currentPage - 1) + 1 || 1}
            />
            <Pagination
              currentPage={currentPage || 0}
              limit={filter.limit}
              setCurrentPage={setCurrentPage}
              total={(fetchData && fetchData.pagination?.total) || 0}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Join;
 