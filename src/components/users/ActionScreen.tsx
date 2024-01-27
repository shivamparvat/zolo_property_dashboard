import ApiFeature from "@/Api/ApiFeature";
import {setLoader} from "@/redux/reducer/loader";
import {RootState} from "@/redux/store";
import {ErrorMessage, Field, Formik, Form} from "formik";
import {Form as FormStrap} from "react-bootstrap";
import React, {ChangeEvent, useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Image from "next/image";
import * as Yup from "yup";
import ShowToast, {error, success} from "../Utils/ShowToast";
import base64Converter from "../Utils/Converter/base64Converter";
import {setRecallApi} from "@/redux/reducer/RecallApi";
// import { debounceFun } from "../Utils/Throttle";
import {
  MAX_FILE_SIZE_BYTES,
  PAGE_TYPE_ADD,
  PAGE_TYPE_EDIT,
  USER_ROLE_TYPE_DATA,
  USER_ROLE_TYPE_KEY,
} from "../Utils/constants";

const ActionScreen: React.FC<ActionModalType> = (props) => {
  // props
  const {id, onClose, isActive, data, type, urls, path} = props;

  // profile max size

  // user role

  // validation logic
  const validation = {
    first_name: Yup.string()
      .required("First Name is required")
      .min(2, "First Name must be at least 2 characters")
      .max(50, "First Name can be at most 50 characters"),
    last_name: Yup.string()
      .required("Last Name is required")
      .min(2, "Last Name must be at least 2 characters")
      .max(50, "Last Name can be at most 50 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .max(100, "Email can be at most 100 characters"),
    role: Yup.string().required("Role is required"),
    address: Yup.string()
      .required("Address is required")
      .min(8, "Address must be at least 8 characters"),
    phone_number: Yup.string()
      .required("Phone Number is required")
      .min(10, "Phone Number must be at least 10 digits")
      .max(10, "Phone Number can be at most 10 digits")
      .matches(/^[0-9]+$/, "Phone Number must contain only digits"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password can be at most 20 characters")
      .notRequired(),
  };

  // states

  const [base64File, setBase64File] = useState("");
  const [formDataImg, setFormDataImg] = useState<File | null>();
  const [useInitData] = useState<editUserType>({
    first_name: type == PAGE_TYPE_ADD ? "" : data.first_name,
    last_name: type == PAGE_TYPE_ADD ? "" : data.last_name,
    email: type == PAGE_TYPE_ADD ? "" : data.email,
    role: type == PAGE_TYPE_ADD ? "" : data.role,
    phone_number: type == PAGE_TYPE_ADD ? "" : data.phone_number,
    password: type == PAGE_TYPE_ADD ? "" : data.password,
    company_name: type == PAGE_TYPE_ADD ? "" : data.company_name,
    address: type == PAGE_TYPE_ADD ? "" : data.address,
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
    try {
      const formData = new FormData();
      if (formDataImg) {
        formData.append("image", formDataImg);
        if (type === PAGE_TYPE_EDIT) {
          formData.append("oldImage", data.image);
        }
      }
      formData.append("first_name", value.first_name.trim());
      formData.append("last_name", value.last_name.trim());
      formData.append("email", value.email.trim());
      formData.append("role", value.role.toString());
      formData.append("phone_number", value.phone_number);
      if (value.password) formData.append("password", value.password.trim());
      formData.append("company_name", value.company_name.trim());
      formData.append("address", value.address.trim());
      let res;
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
        onClose("");
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoader(false));
    } finally {
      dispatch(setLoader(false));
    }
  };

  return (
    <Modal
      show={isActive}
      onHide={() => onClose("")}
      dialogClassName="modal-lg bg-glass"
      style={{marginLeft: "23px"}}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3> {type == PAGE_TYPE_ADD ? "Add " : "Edit "} {path}</h3>
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
              <div className="d-flex gap-column justify-content-between ">
                {/* image */}
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
                          data.image ||
                          "/assets/img/profile.png"
                      }
                      alt="profile Image"
                      width={200}
                      height={200}
                      className="rounded-circle object-fit-cover"
                    />
                  </div>
                </div>
                {/* name */}
                <div className="w-50">
                  {/* first name */}
                  <div className="w-100">
                    <FormStrap.Label className="form-control-label">
                      <h6>First Name</h6>
                    </FormStrap.Label>
                    <Field
                      type="text"
                      id="first_name"
                      placeholder="First Name"
                      name="first_name"
                      className="form-control-alternative form-control w-100"
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="first_name"
                      component="div"
                    />
                  </div>
                  {/* last name */}
                  <div className="">
                    <FormStrap.Label className="form-control-label">
                      <h6>Last Name</h6>
                    </FormStrap.Label>
                    <Field
                      type="text"
                      placeholder="Last Name"
                      id="last_name"
                      name="last_name"
                      className="form-control-alternative form-control "
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="last_name"
                      component="div"
                    />
                  </div>
                  {/* email uneditable */}
                  <div className="">
                    <FormStrap.Label className="form-control-label">
                      <h6>Email</h6>
                    </FormStrap.Label>
                    <Field
                      type="email"
                      placeholder="Email"
                      name="email"
                      id="email"
                      disabled={type === PAGE_TYPE_ADD ? false : true}
                      className="form-control-alternative form-control "
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="email"
                      component="div"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex gap-column justify-content-between ">
                <div className="w-50">
                  <div>
                    <FormStrap.Label className="form-control-label">
                      <h6>Role</h6>
                    </FormStrap.Label>
                    <Field
                      as="select"
                      name="role"
                      id="role"
                      className="form-control-alternative form-control"
                    >
                      <option value="" selected disabled hidden>
                        select role
                      </option>
                      {USER_ROLE_TYPE_KEY.map(
                        (value: string, index: number) => {
                          return (
                            <option key={index} value={value}>
                              {
                                USER_ROLE_TYPE_DATA[
                                value as unknown as keyof typeof USER_ROLE_TYPE_DATA
                                ]
                              }
                            </option>
                          );
                        }
                      )}
                    </Field>
                    <ErrorMessage
                      className="text-danger"
                      name="role"
                      component="div"
                    />
                  </div>
                  {/* phone */}
                  <div className="">
                    <FormStrap.Label className="form-control-label">
                      <h6>Phone Number</h6>
                    </FormStrap.Label>
                    <Field
                      type="number"
                      placeholder="phone Number"
                      name="phone_number"
                      id="phone_number"
                      className="form-control-alternative form-control"
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="phone_number"
                      component="div"
                    />
                  </div>
                </div>
                <div className="w-50">
                  {/* password */}
                  <div className="">
                    <FormStrap.Label className="form-control-label">
                      <h6>Password</h6>
                    </FormStrap.Label>
                    <Field
                      type="password"
                      placeholder="Password"
                      id="password"
                      name="password"
                      className="form-control-alternative form-control "
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="password"
                      component="div"
                    />
                  </div>
                  <div className="">
                    <FormStrap.Label className="form-control-label">
                      <h6>Zip code</h6>
                    </FormStrap.Label>
                    <Field
                      type="text"
                      placeholder="Zip code"
                      id="company_name"
                      name="company_name"
                      className="form-control-alternative form-control "
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="company_name"
                      component="div"
                    />
                  </div>
                </div>
              </div>
              {/* address */}
              <div className="">
                <FormStrap.Label className="form-control-label">
                  <h6>Address</h6>
                </FormStrap.Label>
                <Field
                  as="textarea"
                  rows={4}
                  type="textarea"
                  placeholder="Address"
                  id="address"
                  name="address"
                  className="form-control-alternative form-control"
                />
                <ErrorMessage
                  className="text-danger"
                  name="address"
                  component="div"
                />
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
