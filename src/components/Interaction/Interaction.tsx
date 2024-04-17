import react, {useEffect, useState} from "react";
import {RootState} from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import Filter, {PROPERTY_FOR, PROPERTY_TYPE} from "../Utils/Filter";
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
import TableHeader, {SECOND_BUTTON} from "../Utils/CustomTable/TableHeader";
import ActionFeature from "@/Api/ActionFeature";
import {IoCallOutline, IoHeartDislikeOutline} from "react-icons/io5";
import {MdPublishedWithChanges} from "react-icons/md";
import {Accordion} from "react-bootstrap";
import {FcDislike, FcLike, FcViewDetails} from "react-icons/fc";
import {FaEye} from "react-icons/fa"
import {useRouter} from "next/navigation";
import {MdCall} from "react-icons/md";
import ApiFeature from "@/Api/ApiFeature";
import {setLoader} from "@/redux/reducer/loader";
import {setRecallApi} from "@/redux/reducer/RecallApi";
import {removeToken} from "@/redux/reducer/login";
// // import StatusChange from "./StatusChange";


const order_by_option = ["name", "city", "number", "zip_code", "is_converted", "property", "ads"]


const Interaction = () => {
  //   // init
  const path = "interaction";

  //   // configure
  ActionFeature.path = path;

  //   // hooks
  const dispatch = useDispatch();
  const router = useRouter()
  const token = useSelector((state: RootState) => state.login.userToken?.token);
  const {recallApi} = useSelector((state: RootState) => state.recallApi);

  // status
  const [filter, setFilter] = useState(INIT_FILTER);
  const [fetchData, setFetchData] = useState({
    list: [],
    pagination: {total: 0},
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [actionType, setActionType] = useState<string>("");

  //   // useEffects
  useEffect(() => {


    ActionFeature.get(currentPage, filter, setFetchData);
  }, [filter, token, dispatch, currentPage, recallApi]);

  //   // custom table components


  const InterestedConvert = async (data: any) => {
    try {
      const interested = {
        user: data.user,
        name: data.name,
        number: data.number,
        property: data.property,
        coordinates: data.coordinates,
        ads: data.ads,
        city: data.city,
        zip_code: data.zip_code,
        status: "interested"
      }

      const InterestedtType = data.property ? "property" : "ads"
      const res = await ApiFeature.post("interested/add", {...interested, type: InterestedtType}, 0, true, true);
      await ApiFeature.put("interaction/update", {is_converted: true, user: data.user, zip_code: data.zip_code, }, data?.id);
      if (res.status == 200) {
        dispatch(setLoader(false));
        dispatch(setRecallApi(true));
        setTimeout(() => {
          router.push('/interested')
        }, 200);
      } else if (res.data.status === 401) {
        dispatch(removeToken());
        router?.push("/login");
      }
    } catch (error) {
      dispatch(setLoader(false));
    } finally {
      dispatch(setLoader(false));
    }

  }


  const TableCustomize: CustomTable[] = [
    {
      value: "S.No",
      index: true,
    },
    {
      value: "Id",
      component: ({data}) => <div >
        {(data?.unique_id || "").slice(-6).toUpperCase()}
      </div>
    },
    {
      value: "interaction",
      component: ({data}) => <div >
        <div className="btn bg-primary bg-opacity-10 pe-none pe-auto" onClick={() => {
          data?.property ? router.push(`/property/edit?id=${data.property}`) : router.push(`/ads/edit?id=${data.ads}`)
        }}>
          <FcViewDetails size={25} /><span className="ms-1">
            {
              data?.property ? "PROPERTY" : "AD"
            }
          </span></div>
      </div>
    },
    {
      key: "type",
      value: "type",
      component: ({data}) => <>
        <div className="d-inline-block px-2 py-2 rounded-2 pe-none">
          {data?.type == "like" ? <FcLike size={23} /> : <FaEye size={23} style={{color: "#FB6340"}} />}
          <span className="ms-1">
            {
              data?.type == "like" ? "LIKE" : "VIEW"
            }
          </span></div>
      </>
    },
    {
      value: "Action",
      component: ({data}) => (
        <>
          <button
            onClick={() => {
              if (!data?.is_converted) {
                InterestedConvert(data)
              }
            }}
            className={`btn ${!data?.is_converted ? "btn-warning" : ""}`}
            data-tooltip="Interested"
          >
            <MdPublishedWithChanges size={16} />
          </button>
          &nbsp;
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
            disable={[SECOND_BUTTON]}
          />
          <Filter filter={filter} setFilter={setFilter} orderBy={order_by_option} disable={[PROPERTY_FOR, PROPERTY_TYPE]} />



          {((fetchData && fetchData.list) || []).map((item: any, index: number) => {
            let AccordionData = [...(item.interaction || [])].map((dataItem: any) => {
              return {
                ...dataItem,
                name: item?.name,
                city: item?.city,
                number: item?.number
              }
            })
            return <>
              <Accordion defaultActiveKey="1" className="mt-3 mx-3 my-2">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div className="row w-100">
                      <div className="col" style={{maxWidth: "70px"}}>{index + 1}.</div>
                      {/* <div className="col"><b>{("65d9bd1987809612aca4dda5".slice(-6) || "").toUpperCase()}</b></div> */}
                      <div className="col text-capitalize"><b>{item?.name || ""}</b></div>
                      <div className="col text-capitalize">{item?.city || ""}</div>
                      <div className="col text-capitalize"><a href={`tel:+91${item?.number}`}><MdCall size={20} /><span className="ms-1">{item?.number || ""}</span></a></div>
                      <div className="col text-capitalize">{item?.is_converted ? <FcLike size={20} /> : <FcDislike size={20} />}</div>
                    </div></Accordion.Header>
                  <Accordion.Body>
                    <CustomTable
                      tableCustomize={TableCustomize}
                      data={AccordionData}
                      StartIndex={+filter.limit * (+currentPage - 1) + 1 || 1}
                    />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </>
          })}


          <Pagination
            currentPage={currentPage}
            limit={filter.limit}
            setCurrentPage={setCurrentPage}
            total={fetchData.pagination?.total || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Interaction;


// const Interaction = () => {
//     return (
//         <div>
//             Enter
//         </div>
//     );
// }

// export default Interaction;