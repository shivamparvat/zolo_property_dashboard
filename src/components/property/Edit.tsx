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
import VideoUpload from "./VideoUpload";



import {ErrorMessage, Field, Formik, Form} from "formik";
import validationSchema from "./Form/Utils/validation";




const Edit = () => {
    const router = useRouter()
    const [selectedFile, setSelectedFile] = useState(
        []
    );
    const [Files, setFiles] = useState<File[]>([]);
    const [deletedFile, setDeletedFile] = useState<any[]>([]);
    const [video, setVideo] = useState<File | null>(null)

    const formInitData: any = {

    }

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
                <Formik
                    enableReinitialize={true}
                    onSubmit={(value) => {
                        console.log(value)
                    }}
                    initialValues={formInitData}
                    validationSchema={validationSchema}
                >
                    {({values, setValues, errors}) => (
                        <Form>
                            <>
                                <div className="px-5 py-5">

                                    <Page1 type={PAGE_TYPE_EDIT} setData={setValues} data={values} errors={errors} />
                                    <Page2 type={PAGE_TYPE_EDIT} setData={setValues} data={values} errors={errors} />
                                    {values?.property_type !== "Plot" && values?.property_type !== "Farm" && <Page3 type={PAGE_TYPE_EDIT} setData={setValues} data={values} errors={errors} />}
                                    {values?.property_type !== "Plot" && values?.property_type !== "Farm" && <Page4 type={PAGE_TYPE_EDIT} setData={setValues} data={values} errors={errors} />}
                                    {values?.property_type !== "Plot" && values?.property_type !== "Farm" && <Page5 type={PAGE_TYPE_EDIT} setData={setValues} data={values} errors={errors} />}
                                    {values?.property_type !== "Plot" && values?.property_type !== "Farm" && <Page6 type={PAGE_TYPE_EDIT} setData={setValues} data={values} errors={errors} />}

                                </div>
                                <VideoUpload video={video} setVideo={setVideo} />
                                <FileUpload
                                    selectedFile={selectedFile}
                                    setSelectedFile={setSelectedFile}
                                    setFiles={setFiles}
                                    setDeletedFile={setDeletedFile}
                                />
                                <div className="d-flex h-98 justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-5 d-block text-uppercase"
                                    >
                                        Update  {/* {type === PAGE_TYPE_ADD ? "Add" : "Update"} {path} */}
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <pre>
                                        {JSON.stringify(errors, null, 1)}
                                    </pre>
                                </div>
                            </>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    </div>
}

export default Edit;