import {useRouter} from "next/router";
import TableHeader, {FIRST_BUTTON, SECOND_BUTTON} from "../Utils/CustomTable/TableHeader";
import Page1 from "./Form/Page1";
import {useState} from "react";
import {PAGE_TYPE_EDIT} from "../Utils/constants";
import Page2 from "./Form/page2";

const Edit = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({})
    return <div className="card bg-white">
        <div className="card-datatable">
            <div className="dataTables_wrapper dt-bootstrap5">
                <TableHeader
                    title={`Edit Property`}
                    onAddClick={() => { }}
                    onExportClick={() => {
                        // ActionFeature.download();
                    }}
                    disable={[FIRST_BUTTON, SECOND_BUTTON]}
                />
                <Page1 type={PAGE_TYPE_EDIT} setData={setFormData} data={formData} />
                <Page2 type={PAGE_TYPE_EDIT} setData={setFormData} data={formData} />
            </div>
        </div>
    </div>
}

export default Edit;