import ApiFeature from "@/Api/ApiFeature";
import Filter, {FILTER} from "../Utils/Filter";
import {setLoader} from "@/redux/reducer/loader";
import react, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import CustomTable, {ActionButtons, ActionSwitch} from "../Utils/CustomTable";
import {DDMMYYYY} from "../Utils/Formeter";
import Pagination from "../Utils/Pagination";
import {setRecallApi} from "@/redux/reducer/RecallApi";
import {
  INIT_FILTER,
  PAGE_TYPE_ADD,
  PAGE_TYPE_EDIT,
  TAX_TYPE_DATA,
} from "../Utils/constants";
import TableHeader from "../Utils/CustomTable/TableHeader";
import Image from "next/image";
import ActionScreen from "./ActionScreen";
import ActionFeature from "@/Api/ActionFeature";

// init

const Phone = () => {
  // init
  const path = "phone";

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
    // {
    //   value: "Image",
    //   component: ({data}) => {
    //     return (
    //       <div
    //         onClick={() => {
    //           setSelectedData(data);
    //           setImageModal(true);
    //         }}
    //       >
    //         {data?.post_image?.length > 0 ? (
    //           data.post_image.map((img: any, index: number) => {
    //             if (index < 3) {
    //               return (
    //                 <Image
    //                   key={index}
    //                   src={img.url || "/img/profile.png"}
    //                   alt="category_image"
    //                   width={36}
    //                   height={36}
    //                   className="avatar avatar-sm"
    //                 />
    //               );
    //             } else if (index === 4) {
    //               return <span key={index}>...</span>;
    //             }
    //           })
    //         ) : (
    //           <Image
    //             src={"/img/profile.png"}
    //             alt="category_image"
    //             width={36}
    //             height={36}
    //             className="avatar avatar-sm"
    //           />
    //         )}
    //       </div>
    //     );
    //   },
    // },
    {
      key: "contact_number",
      value: "Number",
    },
    {
      key: "city",
      value: "city",
    },
    {
      key: "zip_code",
      value: "Zip",
    },
    {
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
          data={data}
          setSelected={setSelected}
          setEdit={setActionType}
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
            />
            <Filter filter={filter} disable={[FILTER]} setFilter={setFilter} />
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

export default Phone;
