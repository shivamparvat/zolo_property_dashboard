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
    category_name: Yup.string()
      .required("Category  Name is required")
      .min(2, "Category  Name must be at least 2 characters")
      .max(50, "Category  Name can be at most 50 characters"),
    category_description: Yup.string()
      .required("Category Description is required")
      .min(8, "Category Description must be at least 8 characters"),
  };

  // states

  const [base64File, setBase64File] = useState("");
  const [formDataImg, setFormDataImg] = useState<File | null>();
  const [useInitData] = useState<any>({
    category_name: type == PAGE_TYPE_ADD ? "" : data.category_name,
    category_description:
      type == PAGE_TYPE_ADD ? "" : data.category_description,
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
      if (formDataImg) {
        formData.append("category_image", formDataImg);
        if (type === PAGE_TYPE_EDIT) {
          formData.append("oldImage", data.category_image);
        }
      }

      formData.append("category_name", value.category_name.trim());
      formData.append(
        "category_description",
        value.category_description.trim()
      );
      if (type === PAGE_TYPE_ADD) {
        res = await ApiFeature.post(urls, formData, 0, true);
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
          validationSchema={Yup.object().shape(validation)}
        >
          {() => (
            <Form>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  {/* category_image */}
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
                            data.category_image ||
                            "/assets/img/profile.png"
                        }
                        alt="profile Image"
                        width={200}
                        height={200}
                        className="rounded-circle object-fit-cover"
                      />
                    </div>
                  </div>
                </div>
                {/* name */}
                <div className="w-50">
                  {/* first name */}
                  <div className="w-100">
                    <FormStrap.Label className="form-control-label">
                      <h6>Category Name</h6>
                    </FormStrap.Label>
                    <Field
                      type="text"
                      id="category_name"
                      placeholder="Category  Name"
                      name="category_name"
                      className="form-control-alternative form-control w-100"
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="category_name"
                      component="div"
                    />
                  </div>
                  <div className="">
                    <FormStrap.Label className="form-control-label">
                      <h6>Category Description</h6>
                    </FormStrap.Label>
                    <Field
                      as="textarea"
                      rows={4}
                      type="textarea"
                      placeholder="Category Description"
                      id="category_description"
                      name="category_description"
                      className="form-control-alternative form-control"
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="category_description"
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