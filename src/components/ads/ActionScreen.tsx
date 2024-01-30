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
import Switch from "react-switch";

const ActionScreen: React.FC<ActionModalType> = (props) => {
  // props
  const {id, onClose, isActive, data, type, urls, path} = props;
  const [coordinates, setCoordinates] = useState<Coordinates>(type == PAGE_TYPE_ADD ? {lat: 22, lng: 78} : {lat: (data?.coordinates || [])[0] || 22, lng: (data?.coordinates || [])[1] || 78})
  const [show_map, setShow_map] = useState(true)
  const [show_number, setShow_number] = useState(true)
  // validation logic
  const validation = {
    product_name: Yup.string()
      .required("Name is required")
      .min(2, "Product Name must be at least 2 characters")
      .max(50, "Product Name can be at most 50 characters"),
    product_description: Yup.string()
      .required("Product Description is required")
      .min(8, "Product Description must be at least 8 characters"),
    price: Yup.string().required("Price is required"),
    brand: Yup.string().required("Category is required"),
    Modal: Yup.string().required("sub Category is required"),
  };

  // states

  const [formInitData] = useState<any>({
    product_name: type == PAGE_TYPE_ADD ? "" : data.product_name,
    product_description: type == PAGE_TYPE_ADD ? "" : data.product_description,
    price: type == PAGE_TYPE_ADD ? "" : data.price,
    brand: type == PAGE_TYPE_ADD ? "" : data.brand,
    modal: type == PAGE_TYPE_ADD ? "" : data.modal,
    coordinates: type == PAGE_TYPE_ADD ? {lat: 22, lng: 78} : {lat: (data?.coordinates || [])[0] || 22, lng: (data?.coordinates || [])[1] || 78}

  });

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

  useEffect(() => {
    dispatch(setLoader(true));
    async function getCategoryData() {
      const data: any = await ApiFeature.get("brand/getCategoryWithSubCat");
      if (data && data.status == 200) {
        setCategoryData(data.data);
        dispatch(setLoader(false));
        dispatch(setRecallApi(false));
      }
    }
    try {
      getCategoryData();
    } catch (error) {
      dispatch(setLoader(false));
    } finally {
      dispatch(setLoader(false));
    }
    return () => { };
  }, [token, dispatch, recallApi]);

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubCategory(
      brandData.find(
        (brand: categoryDataType) => brand.category_id == +e.target.value
      )?.modal || []
    );
  };

  //   from submit
  const onsubmit = async (value: any) => {
    dispatch(setLoader(true));
    let res;
    try {
      const formData = new FormData();
      formData.append("product_name", value.product_name.trim());
      formData.append("product_description", value.product_description.trim());
      formData.append("price", value.price);
      formData.append("category_id", value.category_id);
      formData.append("sub_category_id", value.sub_category_id);
      Files.forEach((image: any) => {
        if (image.size > MAX_FILE_SIZE_BYTES) {
          ShowToast(
            error,
            `${image.name} is ${fileSizes(
              image.size
            )} Image size should not exceed 1 MB.`
          );
          throw new Error(
            "please make sure Image size should not exceed 1 MB."
          );
        }
        formData.append("product_image", image);
      });
      deletedFile.forEach((image: any) => {
        if (type === PAGE_TYPE_EDIT) {
          formData.append("oldImage", image.image);
        }
      });

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

  useEffect(() => {
    setSelectedSubCategory(
      brandData.find(
        (category: categoryDataType) =>
          category.category_id == +data.category_id
      )?.modal || []
    );
  }, [brandData, data]);

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
                      <h6>Ad name</h6>
                    </FormStrap.Label>
                    <Field
                      type="text"
                      id="ads_name"
                      placeholder="Product Name"
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
                  <div className="w-100">
                    <div className="w-100">
                      <FormStrap.Label className="form-control-label">
                        <h6>number</h6>
                      </FormStrap.Label>
                      <Field
                        type="text"
                        id="number"
                        placeholder="Number"
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
                </div>
                <div className="w-50">
                  <div className="">
                    <FormStrap.Label className="form-control-label">
                      <h6>Description</h6>
                    </FormStrap.Label>
                    <Field
                      as="textarea"
                      rows={4}
                      type="textarea"
                      placeholder="Description"
                      id="product_description"
                      name="product_description"
                      className="form-control-alternative form-control"
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="product_description"
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
              <div className="d-flex mt-3">
                <div className="mt-2 me-5">
                  <FormStrap.Label className="form-control-label">
                    <h6>show number in Ad</h6>
                  </FormStrap.Label>
                  <div>
                    <Switch
                      onChange={() => setShow_number((pre: boolean) => !pre)}
                      checked={show_number}
                      // uncheckedIcon={false}
                      checkedIcon={false}
                      onColor="#009EFB"
                      offColor="#dcdcdc"
                      className="status-switch"
                    /></div>
                </div>

                <div className="mt-2">
                  <FormStrap.Label className="form-control-label">
                    <h6>show map in Ad</h6>
                  </FormStrap.Label>
                  <div>
                    <Switch
                      onChange={() => setShow_map((pre: boolean) => !pre)}
                      checked={show_map}
                      // uncheckedIcon={false}
                      checkedIcon={false}
                      onColor="#009EFB"
                      offColor="#dcdcdc"
                      className="status-switch"
                    /></div>
                </div>

              </div>
              <hr />
              <MapComponent Coordinates={coordinates} setCoordinates={setCoordinates} />
              <FileUpload
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                setFiles={setFiles}
                setDeletedFile={setDeletedFile}
              />
              {/* submit */}
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
