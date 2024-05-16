import ApiFeature from "@/Api/ApiFeature";
import {setLoader} from "@/redux/reducer/loader";
import {RootState} from "@/redux/store";
import {ErrorMessage, Field, Formik, Form} from "formik";
import {Form as FormStrap} from "react-bootstrap";
import React, {ChangeEvent, useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {setRecallApi} from "@/redux/reducer/RecallApi";
import FileUpload, {fileSizes} from "./FileUpload";
import {MAX_FILE_SIZE_BYTES, PAGE_TYPE_ADD, PAGE_TYPE_EDIT} from "../Utils/constants";
import ShowToast, {error} from "../Utils/ShowToast";
import MapComponent, {Coordinates} from "../Utils/map";
import Switch from "react-switch";
import path from "path";

const ActionScreen: React.FC<ActionModalType> = (props) => {
  // props
  const {id, onClose, isActive, data, type, urls, path: adsPath} = props;
  const [coordinates, setCoordinates] = useState<Coordinates>(type == PAGE_TYPE_ADD ? {lat: 22, lng: 78} : {lat: (data?.coordinates || [])[0] || 22, lng: (data?.coordinates || [])[1] || 78})

  const [banner, setBanner] = useState<string | undefined>(data?.banner)


  // validation logic
  const validation = {
    ads_name: Yup.string().required('Name is required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    // // banner: Yup.string().required('Ads main Image is required'),
    // // gallery: Yup.array().of(Yup.string().nullable()),
    show_number: Yup.boolean().default(true),
    show_map: Yup.boolean().default(true),
    number: Yup.string().required('Number is required'),
    city: Yup.string().required('City is required'),
    zip_code: Yup.number().required('Zip code is required'),
    expiry_date: Yup.date(),
  };

  // states

  const [formInitData] = useState<any>({
    ads_name: type == PAGE_TYPE_ADD ? "" : data.ads_name,
    title: type == PAGE_TYPE_ADD ? "" : data.title,
    description: type == PAGE_TYPE_ADD ? "" : data.description,
    show_number: type == PAGE_TYPE_ADD ? false : data.show_number,
    show_map: type == PAGE_TYPE_ADD ? false : data.show_map,
    number: type == PAGE_TYPE_ADD ? "" : data.number,
    city: type == PAGE_TYPE_ADD ? "" : data.city,
    zip_code: type == PAGE_TYPE_ADD ? "" : data.zip_code,
    expiry_date: type == PAGE_TYPE_ADD ? (() => {
      const currentDate = new Date();
      const next30Days = new Date(currentDate);
      next30Days.setDate(currentDate.getDate() + 30);
      return next30Days;
    })() : data.expiry_date ? (new Date(data.expiry_date)?.toISOString()?.split('T') || [])[0] : new Date()?.toISOString()?.split('T')[0],
    coordinates: type == PAGE_TYPE_ADD ? {lat: 22, lng: 78} : {lat: (data?.coordinates || [])[0] || 22, lng: (data?.coordinates || [])[1] || 78}

  });

  const [selectedFile, setSelectedFile] = useState(
    type === PAGE_TYPE_ADD ? [] : data.galleryUrls
  );
  const [Files, setFiles] = useState<File[]>([]);
  const [deletedFile, setDeletedFile] = useState<any[]>([]);
  //   Hooks
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.login.userToken?.token);
  const recallApi = useSelector(
    (state: RootState) => state.recallApi.recallApi
  );




  //   from submit
  const onsubmit = async (value: any) => {
    dispatch(setLoader(true));
    let res;
    try {
      const formData = new FormData();
      formData.append("ads_name", value.ads_name.trim());
      formData.append("title", value.title.trim());
      formData.append("description", value.description.trim());
      formData.append("number", value.number);
      formData.append("city", value.city);
      formData.append("zip_code", value.zip_code);
      formData.append("expiry_date", value.expiry_date);
      formData.append("show_number", value.show_number);
      formData.append("show_map", value.show_map);
      if (banner) formData.append('banner', banner)
      if (coordinates.lat && coordinates.lng) {
        Object.values(coordinates || {}).map((latlng: string) => {
          formData.append("coordinates[]", latlng);
        })
      } else {
        ShowToast(
          error,
          `coordinates is required`
        );
        throw new Error(
          `coordinates is required`
        );
      }

      if (Files.length) {
        Object.values(Files || {}).map((file: File) => {
          formData.append('images', file)
        })
      }
      if (selectedFile?.length) {
        selectedFile.map((img: string, index: number) => {
          if (Files?.length <= index) {
            formData.append('gallery[]', img)
          }
        })
      } else {
        formData.append('gallery[]', "")
        formData.delete('banner')
        formData.append('banner', "")
      }

      if (Files && deletedFile) {
        deletedFile.map((img: string) => [
          formData.append('oldImages[]', img)
        ])
      }

      if (type === PAGE_TYPE_ADD) {
        res = await ApiFeature.post(urls, formData, 0, true);
      } else {
        res = await ApiFeature.put(urls, formData, id, true);
      }

      if (res.status == 200) {
        dispatch(setLoader(false));
        dispatch(setRecallApi(true));
        onClose("");
      }
    } catch (error) {
      dispatch(setLoader(false));
    } finally {
      dispatch(setLoader(false));
    }
  };



  return (
    <Modal
      show={isActive}
      onHide={() => onClose("")}
      dialogClassName="modal-lg"
      style={{marginLeft: "23px"}}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>{type === PAGE_TYPE_ADD ? "Add" : "Edit"} {adsPath}</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          onSubmit={onsubmit}
          initialValues={formInitData}
          validationSchema={Yup.object().shape(validation)}
        >
          {({values, setValues}) => (
            <Form>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="w-100">
                    <FormStrap.Label className="form-control-label">
                      <h6>Ad name</h6>
                    </FormStrap.Label>
                    <Field
                      type="text"
                      id="ads_name"
                      placeholder="Ad Name"
                      name="ads_name"
                      className="form-control-alternative form-control w-100"
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="ads_name"
                      component="div"
                    />
                  </div>
                  <div className="w-100">
                    <div className="w-100">
                      <FormStrap.Label className="form-control-label">
                        <h6>number</h6>
                      </FormStrap.Label>
                      <Field
                        type="text"
                        id="number"
                        placeholder="number"
                        name="number"
                        className="form-control-alternative form-control w-100"
                      />
                      <ErrorMessage
                        className="text-danger"
                        name="number"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="w-100">
                      <FormStrap.Label className="form-control-label">
                        <h6>Zip code</h6>
                      </FormStrap.Label>
                      <Field
                        type="text"
                        id="zip_code"
                        placeholder="zip code"
                        name="zip_code"
                        className="form-control-alternative form-control w-100"
                      />
                      <ErrorMessage
                        className="text-danger"
                        name="zip_code"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="d-flex mt-3">
                    <div className="mt-2 me-5">
                      <FormStrap.Label className="form-control-label">
                        <h6>show number in Ad</h6>
                      </FormStrap.Label>
                      <div>
                        <Switch
                          name="show_number"
                          onChange={() => setValues({...values, show_number: !values?.show_number})}
                          checked={values?.show_number || false}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          onColor="#009EFB"
                          offColor="#dcdcdc"
                          className="status-switch"
                        /></div>
                      <ErrorMessage
                        className="text-danger"
                        name="show_number"
                        component="div"
                      />
                    </div>

                    <div className="mt-2">
                      <FormStrap.Label className="form-control-label">
                        <h6>show map in Ad</h6>
                      </FormStrap.Label>
                      <div>
                        <Switch
                          onChange={() => setValues({...values, show_map: !values?.show_map})}
                          checked={values?.show_map || false}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          onColor="#009EFB"
                          offColor="#dcdcdc"
                          className="status-switch"
                        /></div>
                      <ErrorMessage
                        className="text-danger"
                        name="show_map"
                        component="div"
                      />
                    </div>

                  </div>
                </div>
                <div className="w-50">
                  <div className="w-100">
                    <FormStrap.Label className="form-control-label">
                      <h6>title</h6>
                    </FormStrap.Label>
                    <Field
                      type="text"
                      id="title"
                      placeholder="Title"
                      name="title"
                      className="form-control-alternative form-control w-100"
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="title"
                      component="div"
                    />
                  </div>
                  <div className="">
                    <FormStrap.Label className="form-control-label">
                      <h6>Description</h6>
                    </FormStrap.Label>
                    <Field
                      as="textarea"
                      rows={4}
                      type="textarea"
                      placeholder="Description"
                      id="description"
                      name="description"
                      className="form-control-alternative form-control"
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="description"
                      component="div"
                    />
                  </div>
                  <div className="w-100">
                    <div className="w-100">
                      <FormStrap.Label className="form-control-label">
                        <h6>city</h6>
                      </FormStrap.Label>
                      <Field
                        type="text"
                        id="city"
                        placeholder="city"
                        name="city"
                        className="form-control-alternative form-control w-100"
                      />
                      <ErrorMessage
                        className="text-danger"
                        name="city"
                        component="div"
                      />
                    </div>
                  </div>
                  <div className="w-100">
                    <div className="w-100">
                      <FormStrap.Label className="form-control-label">
                        <h6>expiry date</h6>
                      </FormStrap.Label>
                      <Field
                        type="date"
                        id="expiry_date"
                        placeholder="expiry date"
                        name="expiry_date"
                        className="form-control-alternative form-control w-100"
                      />
                      <ErrorMessage
                        className="text-danger"
                        name="expiry_date"
                        component="div"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <MapComponent Coordinates={coordinates} setCoordinates={setCoordinates} />
              <FileUpload
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                setFiles={setFiles}
                Files={Files}
                setDeletedFile={setDeletedFile}
                banner={banner}
                setBanner={setBanner}
              />
              {/* submit */}
              <div className="w-100 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary mt-5 d-block text-uppercase"
                >
                  {type === PAGE_TYPE_ADD ? "Add" : "Update"} {adsPath}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ActionScreen;
