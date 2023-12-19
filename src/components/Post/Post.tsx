import ApiFeature from "@/Api/ApiFeature";
import Filter, { FILTER } from "../Utils/Filter";
import { setLoader } from "@/redux/reducer/loader";
import react, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CustomTable, { ActionButtons, ActionSwitch } from "../Utils/CustomTable";
import { DDMMYYYY } from "../Utils/Formeter";
import Pagination from "../Utils/Pagination";
import { setRecallApi } from "@/redux/reducer/RecallApi";
import {
  INIT_FILTER,
  PAGE_TYPE_ADD,
  PAGE_TYPE_EDIT,
  TAX_TYPE_DATA,
} from "../Utils/constants";
import TableHeader from "../Utils/CustomTable/TableHeader";
import Image from "next/image";
import ActionScreen from "./ActionScreen";
import ImagePreview from "./ImageModule";
import ActionFeature from "@/Api/ActionFeature";

// init

const Post = () => {
  // init
  const path = "post";

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
  const [postData, setPostData] = useState({
    list: [],
    pagination: { total: 0 },
  });
  const [selected, setSelected] = useState<any>({});
  const [actionType, setActionType] = useState<string>("");
  const [imageModal, setImageModal] = useState(false);
  const [selectedData, setSelectedData] = useState({ post_id: 0 });

  // useEffects
  useEffect(() => {
    ActionFeature.get(currentPage, filter, setPostData);
    return () => {};
  }, [filter, token, dispatch, currentPage, recallApi]);

  // active or deactivate

  const TableCustomize: CustomTable[] = [
    {
      value: "S.No",
      index: true,
    },

    {
      value: "Post Image",
      component: ({ data }) => {
        return (
          <div
            onClick={() => {
              setSelectedData(data);
              setImageModal(true);
            }}
          >
            {data.post_image.length > 0 ? (
              data.post_image.map((img: any, index: number) => {
                if (index < 3) {
                  return (
                    <Image
                      key={index}
                      src={img.url || "/img/profile.png"}
                      alt="category_image"
                      width={36}
                      height={36}
                      className="avatar avatar-sm"
                    />
                  );
                } else if (index === 4) {
                  return <span key={index}>...</span>;
                }
              })
            ) : (
              <Image
                src={"/img/profile.png"}
                alt="category_image"
                width={36}
                height={36}
                className="avatar avatar-sm"
              />
            )}
          </div>
        );
      },
    },
    {
      key: "post_name",
      value: "Post Name",
    },
    {
      key: "post_description",
      value: "Post Description",
    },
    {
      key: "price",
      value: "price",
    },
    {
      key: "created_at",
      value: "Created At",
      component: ({ data }) => <>{DDMMYYYY(data.created_at)}</>,
    },
    {
      value: "Status",
      component: ({ data }) => (
        <ActionSwitch id={data.post_id} is_active={data.is_active} />
      ),
    },
    {
      value: "Action",
      component: ({ data }) => (
        <ActionButtons
          data={data}
          setSelected={setSelected}
          setEdit={setActionType}
          id={data.post_id}
        />
      ),
      className: "d-flex ",
    },
  ];

  return (
    <>
      {(actionType === PAGE_TYPE_ADD || actionType === PAGE_TYPE_EDIT) && (
        <ActionScreen
          id={selected.post_id || 0}
          isActive={
            actionType === PAGE_TYPE_ADD || actionType === PAGE_TYPE_EDIT
          }
          onClose={setActionType}
          data={{ ...selected, id: selected.post_id }}
          type={actionType == PAGE_TYPE_ADD ? PAGE_TYPE_ADD : PAGE_TYPE_EDIT}
          urls={actionType == PAGE_TYPE_ADD ? "post/add" : "post/update"}
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
              onAddClick={() => setActionType(PAGE_TYPE_ADD)}
              onExportClick={() => {
                ActionFeature.download();
              }}
            />
            <Filter filter={filter} disable={[FILTER]} setFilter={setFilter} />
            <CustomTable
              tableCustomize={TableCustomize}
              data={postData && postData?.list}
              StartIndex={+filter.limit * (+currentPage - 1) + 1 || 1}
            />
            <Pagination
              currentPage={currentPage || 0}
              limit={filter.limit}
              setCurrentPage={setCurrentPage}
              total={(postData && postData.pagination?.total) || 0}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
