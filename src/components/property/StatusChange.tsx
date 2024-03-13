import {useEffect, useState} from "react";
import {PROPERTY_STATUS_TYPE_DATA, PROPERTY_STATUS_TYPE_KEY} from "../Utils/constants";
import {RootState} from "@/redux/store";
import {useDispatch, useSelector} from "react-redux";
import {setLoader} from "@/redux/reducer/loader";
import ApiFeature from "@/Api/ApiFeature";
import {setRecallApi} from "@/redux/reducer/RecallApi";
import {removeToken} from "@/redux/reducer/login";
import {useRouter} from "next/router";



const StatusChange = ({data}: any) => {
    const dispatch = useDispatch();
    const router = useRouter()

    const InterestedConvert = async (statusData: string) => {
        try {

            const res = await ApiFeature.put("property/update", {...data, admin_status: statusData}, data._id, true);
            if (res.status == 200) {
                dispatch(setLoader(false));
                dispatch(setRecallApi(true));
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


    return <div className="dataTables_filter mb-1">

        <select
            className="form-select "
            onChange={(e) => {InterestedConvert(e.target.value)}
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
                        data?.admin_status ===
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

