import {useRouter} from "next/router";
import TableHeader, {FIRST_BUTTON, SECOND_BUTTON} from "../Utils/CustomTable/TableHeader";
import Page1 from "./Form/Page1";
import Page2 from "./Form/page2";
import Page3 from "./Form/page3";
import Page4 from "./Form/page4";
import Page5 from "./Form/page5";
import Page6 from "./Form/page6";
import {useState} from "react";
import {PAGE_TYPE_EDIT} from "../Utils/constants";
import FileUpload from "./FileUpload";

const Edit = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({})
    const [selectedFile, setSelectedFile] = useState(
        []
    );
    const [Files, setFiles] = useState<File[]>([]);
    const [deletedFile, setDeletedFile] = useState<any[]>([]);



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
                <Page3 type={PAGE_TYPE_EDIT} setData={setFormData} data={formData} />
                <Page4 type={PAGE_TYPE_EDIT} setData={setFormData} data={formData} />
                <Page5 type={PAGE_TYPE_EDIT} setData={setFormData} data={formData} />
                <Page6 type={PAGE_TYPE_EDIT} setData={setFormData} data={formData} />
                <FileUpload
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                    setFiles={setFiles}
                    setDeletedFile={setDeletedFile}
                />
                <div className="mt-5">
                    <pre>
                        {JSON.stringify({...formData, images: selectedFile}, null, 1)}
                    </pre>
                </div>
            </div>
        </div>
    </div>
}

export default Edit;