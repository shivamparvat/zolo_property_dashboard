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
import FileUpload, {fileSizes} from "../property/FileUpload";
import {MAX_FILE_SIZE_BYTES, PAGE_TYPE_ADD, PAGE_TYPE_EDIT} from "../Utils/constants";
import ShowToast, {error} from "../Utils/ShowToast";
import MapComponent, {Coordinates} from "../Utils/map";

const ActionScreen: React.FC<ActionModalType> = (props) => {
  // props
  const {id, onClose, isActive, data, type, urls, path} = props;
  const [coordinates, setCoordinates] = useState<Coordinates>(type == PAGE_TYPE_ADD ? {lat: 22, lng: 78} : {lat: (data?.coordinates || [])[0] || 22, lng: (data?.coordinates || [])[1] || 78})
  // validation logic
  const validation = {
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name can be at most 50 characters"),
    contact_number: Yup.string()
      .required("Phone Number is required")
      .min(10, "Phone Number must be at least 10 digits")
      .max(10, "Phone Number can be at most 10 digits")
      .matches(/^[0-9]+$/, "Phone Number must contain only digits"),
    city: Yup.string().required('City is required'),
    zip_code: Yup.number().required('Zip Code is required')
  };

  // states

  const [formInitData] = useState<any>({
    name: type == PAGE_TYPE_ADD ? "" : data.name,
    contact_number: type == PAGE_TYPE_ADD ? "" : data.contact_number,
    city: type == PAGE_TYPE_ADD ? "" : data.city,
    zip_code: type == PAGE_TYPE_ADD ? "" : data.zip_code,
    coordinates: type == PAGE_TYPE_ADD ? {lat: 22, lng: 78} : {lat: (data?.coordinates || [])[0] || 22, lng: (data?.coordinates || [])[1] || 78}
  });

  console.log(formInitData)

  const [brandData, setCategoryData] = useState<any>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [selectedFile, setSelectedFile] = useState(
    type === PAGE_TYPE_ADD ? [] : data.product_image
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
    // dispatch(setLoader(true));
    let res;
    try {
      const formData = new FormData();


      if (type === PAGE_TYPE_ADD) {
        res = await ApiFeature.post(urls, {...value, coordinates: Object.values(coordinates)}, 0, true);
      } else {
        res = await ApiFeature.put(urls, {...value, coordinates: Object.values(coordinates)}, id, true);
      }

      if (res.status == 200) {
        // dispatch(setLoader(false));
        // dispatch(setRecallApi(true));
        onClose("");
      }
    } catch (error) {
      // dispatch(setRecallApi(true));
      // dispatch(setLoader(false));
    } finally {
      // dispatch(setRecallApi(true));
      // dispatch(setLoader(false));
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
          <h3>{type === PAGE_TYPE_ADD ? "Add" : "Edit"} {path}</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          onSubmit={onsubmit}
          initialValues={formInitData}
          validationSchema={Yup.object().shape(validation)}
        >
          {({setFieldValue}) => (
            <Form>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="w-100">
                    <FormStrap.Label className="form-control-label">
                      <h6>Name</h6>
                    </FormStrap.Label>
                    <Field
                      type="text"
                      id="name"
                      placeholder="Name"
                      name="name"
                      className="form-control-alternative form-control w-100"
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="name"
                      component="div"
                    />
                  </div>
                  <div className="w-100">
                    <FormStrap.Label className="form-control-label">
                      <h6>Phone Number</h6>
                    </FormStrap.Label>
                    <Field
                      type="text"
                      id="contact_number"
                      placeholder="contact_number"
                      name="contact_number"
                      className="form-control-alternative form-control w-100"
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="contact_number"
                      component="div"
                    />
                  </div>
                </div>
                <div className="w-50">
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
                  <div className="w-100">
                    <FormStrap.Label className="form-control-label">
                      <h6>Zip number</h6>
                    </FormStrap.Label>
                    <Field
                      type="text"
                      id="zip_code"
                      placeholder="zip_code"
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
              </div>
              <MapComponent Coordinates={coordinates} setCoordinates={setCoordinates} />
              <div className="w-100 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary mt-5 d-block text-uppercase"
                >
                  {type === PAGE_TYPE_ADD ? "Add" : "Update"} {path}
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
