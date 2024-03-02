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
import ApiFeature from "@/Api/ApiFeature";
import {setLoader} from "@/redux/reducer/loader";
import {setRecallApi} from "@/redux/reducer/RecallApi";
import {useDispatch} from "react-redux";
import {removeToken} from "@/redux/reducer/login";




const Edit = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const user_id = router.query.id
    const user_name = router.query.name
    const [selectedFile, setSelectedFile] = useState(
        []
    );
    const [Files, setFiles] = useState<File[]>([]);
    const [deletedFile, setDeletedFile] = useState<any[]>([]);
    const [video, setVideo] = useState<File | null>(null)

    const formInitData: any = {

    }


    const submitHandler = async (value: any) => {
        dispatch(setLoader(true));
        try {
            const formData = new FormData();

            // delete value.coordinates

            (Object.keys(value) || []).map((item: any) => {
                if (typeof value[item] !== "object") {
                    formData.append(item, value[item])
                } else {
                    (Object.keys(value[item]) || []).map((arrValue: any) => {
                        console.log(value[item][arrValue])
                        if (typeof value[item][arrValue] === "object") {
                            (Object.keys(value[item][arrValue]) || []).map((arrayItem: any) => {
                                formData.append(`${item}[${arrayItem}][]`, value[item][arrValue][arrayItem])
                            })
                        } else {
                            formData.append(`${item}[]`, value[item][arrValue])
                        }
                    })
                }
            })
            formData.delete('coordinates')
            if (value.coordinates.lat &&
                value.coordinates.lng) {
                formData.append('coordinates[]', value.coordinates.lat)
                formData.append('coordinates[]', value.coordinates.lng)
            }
            if (typeof user_id == 'string')
                formData.append('user', user_id)
            if (typeof user_name == 'string')
                formData.append('name', user_name)

            if (video) {
                formData.append('video', video)
            }
            if (Files) {
                Object.values(Files || {}).map((file: File) => {
                    formData.append('images', file)
                })
            }


            const res = await ApiFeature.post("property/add", formData, 0, true, true);
            if (res.status == 200) {
                dispatch(setLoader(false));
                dispatch(setRecallApi(true));
                setTimeout(() => {
                    router.back()
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
                    onSubmit={submitHandler}
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
                                        {JSON.stringify(values, null, 1)}
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