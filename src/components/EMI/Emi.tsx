import Filter, {FILTER} from "../Utils/Filter";
import react, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import CustomTable, {ActionButtons, ActionSwitch} from "../Utils/CustomTable";
import {DDMMYYYY} from "../Utils/Formeter";
import Pagination from "../Utils/Pagination";
import {
  INIT_FILTER,
  PAGE_TYPE_ADD,
  PAGE_TYPE_EDIT,
  TAX_TYPE_DATA,
} from "../Utils/constants";
import TableHeader from "../Utils/CustomTable/TableHeader";
import ActionFeature from "@/Api/ActionFeature";
import ActionScreen from "./ActionScreen";

// init

const Emi = () => {
  // init
  const path = "emi";

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
  const [emiData, setTexData] = useState({
    list: [],
    pagination: {total: 0},
  });
  const [selected, setSelected] = useState<any>({});
  const [actionType, setActionType] = useState<string>("");


  // useEffects
  useEffect(() => {
    ActionFeature.get(currentPage, filter, setTexData);
    return () => { };
  }, [filter, token, dispatch, currentPage, recallApi]);


  const TableCustomize: CustomTable[] = [
    {
      value: "S.No",
      index: true,
    },
    {
      value: "Emi Type",
      component: ({data}) => {
        return (
          <>{TAX_TYPE_DATA[data.emi_type as keyof typeof TAX_TYPE_DATA]}</>
        );
      },
    },
    {
      key: "value",
      value: "Value",
    },
    {
      key: "created_at",
      value: "Created At",
      component: ({data}) => <>{DDMMYYYY(data.created_at)}</>,
    },
    {
      value: "Status",
      component: ({data}) => (
        <ActionSwitch is_active={data.is_active} id={data.emiID} />
      ),
    },
    {
      value: "Action",
      component: ({data}) => (
        <ActionButtons
          id={data.emiID}
          setEdit={setActionType}
          data={data}
          setSelected={setSelected}
        />
      ),
      className: "d-flex ",
    },
  ];


  return (
    <>
      {(actionType === PAGE_TYPE_ADD || actionType === PAGE_TYPE_EDIT) && (
        <ActionScreen
          id={selected.user_id || 0}
          isActive={
            actionType === PAGE_TYPE_ADD || actionType === PAGE_TYPE_EDIT
          }
          onClose={setActionType}
          data={{...selected, id: selected.emiID}}
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
              onExportClick={() => {ActionFeature.download()}}
            />
            <Filter filter={filter} disable={[FILTER]} setFilter={setFilter} />
            <CustomTable
              tableCustomize={TableCustomize}
              data={emiData && emiData?.list}
              StartIndex={+filter.limit * (+currentPage - 1) + 1 || 1}
            />
            <Pagination
              currentPage={currentPage || 0}
              limit={filter.limit}
              setCurrentPage={setCurrentPage}
              total={(emiData && emiData.pagination?.total) || 0}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Emi;
