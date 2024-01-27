import ApiFeature from "@/Api/ApiFeature";
import {setLoader} from "@/redux/reducer/loader";
import {ErrorMessage, Field, Formik, Form} from "formik";
import {Form as FormStrap} from "react-bootstrap";
import React, {ChangeEvent, useState} from "react";
import {Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import Image from "next/image";
import * as Yup from "yup";
import ShowToast, {error} from "../Utils/ShowToast";
import base64Converter from "../Utils/Converter/base64Converter";
import {setRecallApi} from "@/redux/reducer/RecallApi";
import {MAX_FILE_SIZE_BYTES, PAGE_TYPE_ADD, PAGE_TYPE_EDIT} from "../Utils/constants";

const ActionScreen: React.FC<ActionModalType> = (props) => {
  // props
  const {id, onClose, isActive, data, type, urls, path} = props;

  // validation logic
  const validation = {
    brand: Yup.string()
      .required("Brand  Name is required")
      .min(2, "Brand  Name must be at least 2 characters")
      .max(50, "Brand  Name can be at most 50 characters"),
    description: Yup.string()
      .required("Brand Description is required")
      .min(8, "Brand Description must be at least 8 characters"),
  };

  // states

  const [base64File, setBase64File] = useState("");
  const [formDataImg, setFormDataImg] = useState<File | null>();
  const [useInitData] = useState<any>({
    brand: type == PAGE_TYPE_ADD ? "" : data.brand,
    description:
      type == PAGE_TYPE_ADD ? "" : data.description,
  });

  //   Hooks
  const dispatch = useDispatch();

  // Image convert in base 64 format
  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files?.length) {
      if (event.target.files[0].size > MAX_FILE_SIZE_BYTES) {
        event.target.value = "";
        ShowToast(error, "Image size should not exceed 1 MB.");
      } else {
        const File = event.target.files[0];
        setFormDataImg(File);
        base64Converter(File).then((file) => setBase64File(file));
      }
    }
  };

  //   from submit
  const onsubmit = async (value: any) => {
    dispatch(setLoader(true));
    let res;
    try {
      const formData = new FormData();

      formData.append("brand", value.brand.trim());
      formData.append(
        "description",
        value.description.trim()
      );
      if (formDataImg) {
        formData.append("image", formDataImg);
        if (type === PAGE_TYPE_EDIT) {
          formData.append("oldImage", data.image);
        }
      }
      if (type === PAGE_TYPE_ADD) {
        res = await ApiFeature.post(urls, formData, data.id, true);
      } else {
        res = await ApiFeature.put(urls, formData, data.id, true);
      }
      if (res.status == 200) {
      dispatch(setLoader(false));
      dispatch(setRecallApi(true));
      setFormDataImg(null);
      setBase64File("");
      onClose(false);
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
      onHide={() => onClose(false)}
      dialogClassName="modal-lg"
      style={{marginLeft: "23px"}}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>{type == PAGE_TYPE_ADD ? "Add " : "Edit "}{path}</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          onSubmit={onsubmit}
          initialValues={useInitData}
        // validationSchema={Yup.object().shape(validation)}

        >
          {() => (
            <Form>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  {/* brand_image */}
                  <label className="d-flex flex-column align-items-center">
                    <h5 style={{marginBottom: "10px", fontWeight: "bold"}}>
                      Upload image
                    </h5>
                    <small style={{color: "gray"}}>
                      Supported formats: JPG, PNG, JPEG / Max file size is 1MB
                    </small>
                  </label>
                  <div className="avatar-upload mb-3 ">
                    <div className="avatar-edit">
                      <input
                        type="file"
                        id="imageUpload"
                        accept=".png, .jpg, .jpeg"
                        onChange={onImageChange}
                      />
                      <label htmlFor="imageUpload"></label>
                    </div>
                    <div className="position-relative avatar-preview">
                      <Image
                        src={
                          type == PAGE_TYPE_ADD
                            ? base64File || "/assets/img/profile.png"
                            : base64File ||
                            data.url ||
                            "/assets/img/profile.png"
                        }
                        alt="profile Image"
                        width={200}
                        height={200}
                        className=" object-fit-cover"
                      />
                    </div>
                  </div>
                </div>
                {/* name */}
                <div className="w-50">
                  {/* first name */}
                  <div className="w-100">
                    <FormStrap.Label className="form-control-label">
                      <h6>Brand Name</h6>
                    </FormStrap.Label>
                    <Field
                      type="text"
                      id="brand"
                      placeholder="Brand  Name"
                      name="brand"
                      className="form-control-alternative form-control w-100"
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="brand"
                      component="div"
                    />
                  </div>
                  <div className="">
                    <FormStrap.Label className="form-control-label">
                      <h6>Brand Description</h6>
                    </FormStrap.Label>
                    <Field
                      as="textarea"
                      rows={4}
                      type="textarea"
                      placeholder="Brand Description"
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
                </div>
              </div>

              {/* submit */}
              <div className="w-100 d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary mt-5 d-block text-uppercase"
                >
                  {type == PAGE_TYPE_ADD ? "Add " : "Update "}{path}
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