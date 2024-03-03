import ApiFeature from "@/Api/ApiFeature";
import Filter from "../Utils/Filter";
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
} from "../Utils/constants";
import TableHeader, {FIRST_BUTTON, SECOND_BUTTON} from "../Utils/CustomTable/TableHeader";
import Image from "next/image";
import ActionScreen from "./ActionScreen";
import ImagePreview from "./ImageModule";
import ActionFeature from "@/Api/ActionFeature";
import StatusChange from "./StatusChange";
import {Router} from "next/router";
import {useRouter} from "next/navigation";
import {FaEdit, FaTrash} from "react-icons/fa";

// init

const Post = () => {
  // init
  const path = "property";

  // configure
  ActionFeature.path = path;
  // hook
  const dispatch = useDispatch();
  const router = useRouter()
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
      value: "user",
      key: "name",
    },
    // {
    //   value: "Post Image",
    //   component: ({data}) => {
    //     return (
    //       <div
    //         onClick={() => {
    //           setSelectedData(data);
    //           setImageModal(true);
    //         }}
    //       >
    //         {(data?.images || []).length > 0 ? (
    //           data.images.map((img: any, index: number) => {
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
      value: "Address",
      component: ({data}) => <>{`${data.city || ""} ${data.state || ""} ${data.zip_code || ""}`}</>,
    },
    {
      value: "property for",
      key: "property_for",
    },
    {
      value: "property type",
      key: "property_type",
    },
    {
      value: "user Type",
      key: "added_by_type",
    },
    {
      value: "status",
      component: StatusChange
      // key: "admin_status",
    },
    {
      key: "created_at",
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
        <>
          <>
            <button
              onClick={() => {
                router.push(`/property/edit?id=${data._id}`)
              }}
              className="btn btn-warning"
              data-tooltip="Edit"
            >
              <FaEdit size={16} />
            </button>
            &nbsp;
          </><ActionButtons
            data={data}
            setSelected={setSelected}
            setEdit={setActionType}
            id={data._id}
            disable={[EDIT]}
          />
        </>
      ),
      className: "d-flex justify-content-center",
    },
  ];

  
  const ORDER_BY = ['name','location']

  return (
    <>
      {(actionType === PAGE_TYPE_ADD || actionType === PAGE_TYPE_EDIT) && (
        <ActionScreen
          id={selected.post_id || 0}
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
      {imageModal && (
        <ImagePreview
          isActive={imageModal}
          onClose={setImageModal}
          selectedID={selectedData.post_id || 0}
          imageData={selectedData}
        />
      )}

      <div className="card bg-white">
        <div className="card-datatable">
          <div className="dataTables_wrapper dt-bootstrap5">
            <TableHeader
              title={`List of ${path}`}
              onAddClick={() => router.push("/property/edit?id=10")}
              onExportClick={() => {
                ActionFeature.download();

              }}
              disable={[FIRST_BUTTON, SECOND_BUTTON]}
            />
            <Filter filter={filter} disable={[]} setFilter={setFilter} orderBy={ORDER_BY}/>
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

export default Post;
