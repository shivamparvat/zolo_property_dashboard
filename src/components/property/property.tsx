import Filter, {FILTER} from "../Utils/Filter";
import react, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import CustomTable, {ActionButtons, ActionSwitch} from "../Utils/CustomTable";
import {DDMMYYYY} from "../Utils/Formeter";
import Pagination from "../Utils/Pagination";
import {INIT_FILTER, PAGE_TYPE_ADD, PAGE_TYPE_EDIT} from "../Utils/constants";
import TableHeader from "../Utils/CustomTable/TableHeader";
import Image from "next/image";
import ActionFeature from "@/Api/ActionFeature";
import ActionScreen from "./ActionScreen";

// init

const Index = () => {
  // init
  const path = "property";

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
  const [brandData, setBrandData] = useState({
    list: [],
    pagination: {total: 0},
  });
  const [selected, setSelected] = useState<any>({});
  const [actionType, setActionType] = useState<string>("");

  // useEffects
  useEffect(() => {
    ActionFeature.get(currentPage, filter, setBrandData);
    return () => { };
  }, [filter, token, dispatch, currentPage, recallApi]);

  const TableCustomize: CustomTable[] = [
    {
      value: "S.No",
      index: true,
    },
    {
      value: "Brand Image",
      component: ({data}) => {
        return (
          <div>
            <Image
              src={data.url || "/img/profile.png"}
              alt="brand_image"
              width={36}
              height={36}
              className="avatar avatar-sm me-3"
            />
          </div>
        );
      },
    },
    {
      key: "brand",
      value: "Brand Name",
    },
    {
      key: "description",
      value: "Brand Description",
    },
    {
      key: "createdAt",
      value: "Created At",
      component: ({data}) => <>{DDMMYYYY(data.createdAt)}</>,
    },
    {
      value: "Status",
      component: ({data}) => (
        <ActionSwitch data={data} />
      ),
    },
    {
      value: "Action",
      component: ({data}) => (
        <ActionButtons
          id={data._id}
          data={data}
          setEdit={setActionType}
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
              data={brandData && brandData?.list}
              StartIndex={+filter.limit * (+currentPage - 1) + 1 || 1}
            />
            <Pagination
              currentPage={currentPage || 0}
              limit={filter.limit}
              setCurrentPage={setCurrentPage}
              total={(brandData && brandData.pagination?.total) || 0}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
