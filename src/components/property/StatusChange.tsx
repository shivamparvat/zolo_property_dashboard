import {useEffect, useState} from "react";
import {PROPERTY_STATUS_TYPE_DATA, PROPERTY_STATUS_TYPE_KEY} from "../Utils/constants";
import {RootState} from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import {setLoader} from "@/redux/reducer/loader";
import ApiFeature from "@/Api/ApiFeature";
import {setRecallApi} from "@/redux/reducer/RecallApi";



const StatusChange = ({data}: any) => {
    const dispatch = useDispatch();

    const [admin_status, setAdmin_status] = useState(data?.admin_status || "")
    const recallApi = useSelector(
        (state: RootState) => state.recallApi.recallApi
    );

    useEffect(() => {
        dispatch(setLoader(true));
        async function getCategoryData() {
            if (admin_status != data?.admin_status) {

                const res = await ApiFeature.put("property/update", {...data, admin_status}, data._id, true);
            }
        }
        try {
            getCategoryData();
        } catch (error) {
            dispatch(setRecallApi(false));
            dispatch(setLoader(false));
        } finally {
            dispatch(setRecallApi(false));
            dispatch(setLoader(false));
        }
        return () => { };
    }, [admin_status]);


    return <div className="dataTables_filter mb-1">

        <select
            className="form-select "
            onChange={(e) => {setAdmin_status(e.target.value)}
            }
            aria-label="Default select example"
        >
            {PROPERTY_STATUS_TYPE_KEY.map((value: string, index) => (
                <option
                    value={
                        PROPERTY_STATUS_TYPE_DATA[
                        value as unknown as keyof typeof PROPERTY_STATUS_TYPE_DATA
                        ]
                    }
                    selected={
                        admin_status ===
                        PROPERTY_STATUS_TYPE_DATA[
                        value as keyof typeof PROPERTY_STATUS_TYPE_DATA
                        ]
                    }
                    key={index}
                >
                    {value}
                </option>
            ))}
        </select>
    </div>
}


export default StatusChange;



// import {useEffect, useState} from "react";
// import {RootState} from "@/redux/store";
// import {useDispatch, useSelector} from "react-redux";
// import {setLoader} from "@/redux/reducer/loader";
// import ApiFeature from "@/Api/ApiFeature";
// import {setRecallApi} from "@/redux/reducer/RecallApi";



// const StatusChange = (data: any, options: any, key = "", path = "") => {
//     const dispatch = useDispatch();

//     const [status, setStatus] = useState(data[key] || "")
//     const recallApi = useSelector(
//         (state: RootState) => state.recallApi.recallApi
//     );

//     useEffect(() => {
//         dispatch(setLoader(true));
//         async function getCategoryData() {
//             if (data[key] !== status) {
//                 const res = await ApiFeature.put(`${path}/update`, {...data, [key]: status}, data._id, true);
//             }
//         }
//         try {
//             getCategoryData();
//         } catch (error) {
//             dispatch(setRecallApi(false));
//             dispatch(setLoader(false));
//         } finally {
//             dispatch(setRecallApi(false));
//             dispatch(setLoader(false));
//         }
//         return () => { };
//     }, [status]);

//     console.log(options)


//     return <div className="dataTables_filter mb-1">

//         <select
//             className="form-select "
//             onChange={(e) => {setStatus(e.target.value)}
//             }
//             aria-label="Default select example"
//         >
//             {(Object.keys(options) || []).map((value: string, index) => (
//                 <option
//                     value={
//                         options[
//                         value as unknown as keyof typeof options
//                         ]
//                     }
//                     selected={
//                         status ===
//                         options[
//                         value as keyof typeof options
//                         ]
//                     }
//                     key={index}
//                 >
//                     {value}
//                 </option>
//             ))}

//         </select>
//     </div>
// }


// export default StatusChange;