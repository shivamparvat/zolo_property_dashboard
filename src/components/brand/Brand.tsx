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
  const path = "brand";

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
  const [categoryData, setCategoryData] = useState({
    list: [],
    pagination: {total: 0},
  });
  const [selected, setSelected] = useState<any>({});
  const [actionType, setActionType] = useState<string>("");

  // useEffects
  useEffect(() => {
    ActionFeature.get(currentPage, filter, setCategoryData);
    return () => { };
  }, [filter, token, dispatch, currentPage, recallApi]);

  const TableCustomize: CustomTable[] = [
    {
      value: "S.No",
      index: true,
    },
    {
      value: "Category Image",
      component: ({data}) => {
        return (
          <div>
            <Image
              src={data.category_image || "/img/profile.png"}
              alt="category_image"
              width={36}
              height={36}
              className="avatar avatar-sm me-3"
            />
          </div>
        );
      },
    },
    {
      key: "category_name",
      value: "Category Name",
    },
    {
      key: "category_description",
      value: "Category Description",
    },
    {
      key: "created_at",
      value: "Created At",
      component: ({data}) => <>{DDMMYYYY(data.created_at)}</>,
    },
    {
      value: "Status",
      component: ({data}) => (
        <ActionSwitch is_active={data.is_active} id={data.category_id} />
      ),
    },
    {
      value: "Action",
      component: ({data}) => (
        <ActionButtons
          id={data.category_id}
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
          id={selected.user_id || 0}
          isActive={
            actionType === PAGE_TYPE_ADD || actionType === PAGE_TYPE_EDIT
          }
          onClose={setActionType}
          data={{...selected, id: selected.category_id}}
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
              data={categoryData && categoryData?.list}
              StartIndex={+filter.limit * (+currentPage - 1) + 1 || 1}
            />
            <Pagination
              currentPage={currentPage || 0}
              limit={filter.limit}
              setCurrentPage={setCurrentPage}
              total={(categoryData && categoryData.pagination?.total) || 0}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
