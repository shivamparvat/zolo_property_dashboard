import {useRouter} from "next/router";
import TableHeader, {FIRST_BUTTON, SECOND_BUTTON} from "../Utils/CustomTable/TableHeader";
import Page1 from "./Form/Page1";
import Page2 from "./Form/page2";
import Page3 from "./Form/page3";
import Page4 from "./Form/page4";
import Page5 from "./Form/page5";
import Page6 from "./Form/page6";
import {useEffect, useState} from "react";
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
    const property_id = router.query.id
    const [selectedFile, setSelectedFile] = useState(
        []
    );
    const [banner, setBanner] = useState<string | undefined>("")
    const [Files, setFiles] = useState<File[]>([]);
    const [deletedFile, setDeletedFile] = useState<any[]>([]);
    const [video, setVideo] = useState<File | null>(null)

    const [formInitData, setFormInitData] = useState<any>({})


    useEffect(() => {
        try {
            if (property_id) {


                const getOneProperty = async () => {
                    const res = await ApiFeature.get("property", property_id, true);
                    if (res?.status == 200) {
                        if (res?.data)
                            setFormInitData((res?.data?.property || [])[0])
                        setSelectedFile((res?.data?.property || [])[0]?.imageUrls || [])
                        setBanner((res?.data?.property || [])[0]?.banner?.split('/').pop() || "");
                        dispatch(setLoader(false));
                        dispatch(setRecallApi(true));
                    } else if (res?.data?.status === 401) {
                        dispatch(removeToken());
                        router?.push("/login");
                    }
                }
                getOneProperty()
            }
        } catch (error) {
            dispatch(setLoader(false));
        } finally {
            dispatch(setLoader(false));
        }
    }, [property_id])



    const submitHandler = async (value: any) => {
        dispatch(setLoader(true));

        try {
            const formData = new FormData();

            // delete value.coordinates

            delete value?.imageUrls;
            delete value?.bannerUrl;
            delete value?.images;
            (Object.keys(value) || []).map((item: any) => {
                if (typeof value[item] !== "object") {
                    if (value[item]) {
                        formData.append(item, value[item])
                    }
                }
                else {
                    if (typeof value[item] == "object" && value[item] != null) {
                        (Object.keys(value[item]) || []).map((arrValue: any) => {
                            console.log(value[item][arrValue])
                            if (typeof value[item][arrValue] === "object") {
                                (Object.keys(value[item][arrValue]) || []).map((arrayItem: any) => {
                                    if (value[item][arrValue][arrayItem]) {
                                        formData.append(`${item}[${arrayItem}][]`, value[item][arrValue][arrayItem])
                                    }
                                })
                            } else {
                                if (value[item][arrValue]) {
                                    formData.append(`${item}[]`, value[item][arrValue])
                                }
                            }
                        })
                    }
                }
            })
            formData.delete('coordinates[]')
            formData.delete('banner')
            if (value.coordinates.lat &&
                value.coordinates.lng) {
                formData.append('coordinates[]', value.coordinates?.lat)
                formData.append('coordinates[]', value.coordinates?.lng)
            }
            if (banner) formData.append('banner', banner)

            if (Files.length) {
                Object.values(Files || {}).map((file: File) => {
                    formData.append('images', file)
                })
            }
            if (selectedFile?.length) {
                selectedFile.map((img: string, index: number) => {
                    if (Files?.length <= index) {
                        formData.append('images[]', img)
                    }
                })
            } else {
                formData.append('images[]', "")
                formData.delete('banner')
                formData.append('banner', "")
            }
            if (Files && deletedFile) {
                deletedFile.map((img: string) => [
                    formData.append('oldImages[]', img)
                ])
            }
            if (video) {
                formData.append('video', video)
            }


            const res = await ApiFeature.put("property/update", formData, property_id, true);
            if (res?.status == 200) {
                dispatch(setLoader(false));
                dispatch(setRecallApi(true));
                setTimeout(() => {
                    router.back()
                }, 200);
            } else if (res?.data?.status === 401) {
                dispatch(removeToken());
                router?.push("/login");
            }
        } catch (error) {
            console.log(error)
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
                    onAddClick={() => {router.back()}}
                    AddButtonText="Back"
                    onExportClick={() => {

                        // ActionFeature.download();
                    }}
                    disable={[FIRST_BUTTON]}
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
                                <VideoUpload video={video} setVideo={setVideo} url={"http://localhost:5000/property/videos/video-1710266151537.mp4"} />
                                <FileUpload
                                    selectedFile={selectedFile}
                                    setSelectedFile={setSelectedFile}
                                    setFiles={setFiles}
                                    Files={Files}
                                    setDeletedFile={setDeletedFile}
                                    banner={banner}
                                    setBanner={setBanner}
                                />
                                <div className="mx-2 my-2">
                                    {Object.keys(errors || {})?.length > 0 &&
                                        <div className="p-3">
                                            <div className="p-3 mb-2 bg-danger text-white">Oops! It seems there's an error in the form submission. Please review the information</div>
                                        </div>}
                                </div>
                                <div className="d-flex h-98 justify-content-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-5 d-block text-uppercase"
                                    >
                                        Update
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