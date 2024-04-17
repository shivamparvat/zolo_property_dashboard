import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, Form, FormGroup, Modal} from "react-bootstrap";
import {Formik, Field, ErrorMessage, Form as FormikForm} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import Image from "next/image";
import {setLoader} from "@/redux/reducer/loader";
import {RootState} from "@/redux/store";
import ApiFeature from "@/Api/ApiFeature";
import {setRecallApi} from "@/redux/reducer/RecallApi";
import {setToken} from "@/redux/reducer/login";
import {Form as FormStrap} from "react-bootstrap";
import ShowToast, {error, success} from "../Utils/ShowToast";
import base64Converter from "../Utils/Converter/base64Converter";
import Select from 'react-select';
import TagsInput from 'react-tagsinput'
import {STATE_OPTION, USER_ROLE_TYPE_DATA, USER_ROLE_TYPE_KEY} from "../Utils/constants";
interface userType {
    user_id: number;
    email: string;
    image: string;
    oldImage: string;
    role: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    company_name: string;
    address: string;
    is_active: number;
    created_at: string;
}

const UserProfile = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [picture, setPicture] = useState("");
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const token = useSelector(
        (state: RootState) => state.login?.userToken?.token
    );
    const user = useSelector(
        (state: RootState) => state.login.userToken
    );
    const userID = useSelector(
        (state: RootState) => state.login?.userToken?.user_id
    );
    const userData: any = useSelector(
        (state: RootState) => state.login?.userToken
    );

    const imageOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e?.target.files && e?.target.files?.length > 0) {
            setLogoFile(e.target.files[0]);
            file2Base64(e.target.files[0]).then((img: string) => {
                setPicture(img);
            });
        }
    };
    const file2Base64 = (file: File): Promise<string> => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result?.toString() || "");
            reader.onerror = (error) => reject(error);
        });
    };

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
        contact_number: Yup.string()
            .required("Phone Number is required")
            .min(10, "Phone Number must be at least 10 digits")
            .max(10, "Phone Number can be at most 10 digits")
            .matches(/^[0-9]+$/, "Phone Number must contain only digits"),
        zip_code: Yup.number().required('Zip Code is required'),
        city: Yup.string().required('City is required'),
    };

    const [base64File, setBase64File] = useState("");
    const [formDataImg, setFormDataImg] = useState<File | null>();
    const [useInitData] = useState<editUserType>({
        first_name: user?.first_name,
        last_name: user?.last_name,
        email: user?.email,
        role: user?.role,
        contact_number: user?.contact_number,
        city: user?.city,
        state: user?.state,
        address: user?.address
    });
    const MAX_FILE_SIZE_BYTES = 1024 * 1024 * 1;

    const isScreenSizeXL = window.innerWidth >= 1200 && window.innerWidth < 1400;
    const tableResponsiveClass = isScreenSizeXL
        ? "table-responsive-xl"
        : "table-responsive-xxl";

    const backToCustomer = () => {
        router.back();
    };


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


    const onsubmit = async (value: any) => {
        dispatch(setLoader(true));
        try {
            const formData = new FormData();
            if (formDataImg) {
                formData.append("image", formDataImg);
                formData.append("oldImage", "");
            }
            formData.append("first_name", value.first_name.trim());
            formData.append("last_name", value.last_name.trim());
            formData.append("email", value.email.trim());
            formData.append("contact_number", value.contact_number);
            formData.append("zip_code", value.zip_code);
            formData.append("city", value.city.trim());

            const res = await ApiFeature.put(`user/update`, formData, user?.user_id, true);
            if (res.status == 200) {
                dispatch(setToken(res?.data))
                dispatch(setLoader(false));
                dispatch(setRecallApi(true));
                setFormDataImg(null);
                setBase64File("");
                router.back()
            }
        } catch (error) {
            console.log(error);

            dispatch(setLoader(false));
        } finally {
            dispatch(setLoader(false));
        }
    };
    return (
        <>
            <div className="card">
                <div className={`card-datatable ${tableResponsiveClass}`}>
                    <div className="dataTables_wrapper dt-bootstrap5">
                        <div className="card-header flex-column flex-md-row d-flex justify-content-between align-items-center mb-3">
                            <h4 className="col-md-6 mb-2 mb-md-0">User Profile</h4>
                            <div
                                className="btn-close p-2"
                                onClick={() => backToCustomer()}
                            ></div>
                        </div>
                        <div className="row w-100 m-auto">
                            <Formik
                                enableReinitialize={true}
                                onSubmit={onsubmit}
                                initialValues={useInitData}
                                validationSchema={Yup.object().shape(validation)}
                            >
                                {({values, setValues, errors, handleSubmit}) => (
                                    <Form onSubmit={handleSubmit}>
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
                                                            user?.image ||
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
                                                        disabled={true}
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
                                                {/* phone */}
                                                <div className="">
                                                    <FormStrap.Label className="form-control-label">
                                                        <h6>Phone Number</h6>
                                                    </FormStrap.Label>
                                                    <Field
                                                        type="number"
                                                        placeholder="phone Number"
                                                        name="contact_number"
                                                        id="contact_number"
                                                        className="form-control-alternative form-control"
                                                    />
                                                    <ErrorMessage
                                                        className="text-danger"
                                                        name="contact_number"
                                                        component="div"
                                                    />
                                                </div>
                                                {/* role */}
                                                <div>
                                                    <FormStrap.Label className="form-control-label">
                                                        <h6>Role</h6>
                                                    </FormStrap.Label>
                                                    <Field
                                                        as="select"
                                                        name="role"
                                                        id="role"
                                                        disabled={true}
                                                        className="form-control-alternative form-control"
                                                    >

                                                        {user?.role === 'admin' ? <>
                                                            <option value="" selected disabled hidden>
                                                                select role
                                                            </option>{USER_ROLE_TYPE_KEY.map(
                                                                (value: string, index: number) => {
                                                                    return (
                                                                        <option key={index} value={USER_ROLE_TYPE_DATA[
                                                                            value as unknown as keyof typeof USER_ROLE_TYPE_DATA
                                                                        ]}>
                                                                            {
                                                                                USER_ROLE_TYPE_DATA[
                                                                                    value as unknown as keyof typeof USER_ROLE_TYPE_DATA
                                                                                ].toUpperCase()
                                                                            }
                                                                        </option>
                                                                    );
                                                                }
                                                            )}</> : <option selected value="user">
                                                            USER
                                                        </option>}
                                                    </Field>
                                                    <ErrorMessage
                                                        className="text-danger"
                                                        name="role"
                                                        component="div"
                                                    />
                                                </div>{/* zip */}


                                            </div>
                                            <div className="w-50">
                                                {/* city */}
                                                <div className="">
                                                    <FormStrap.Label className="form-control-label">
                                                        <h6>City</h6>
                                                    </FormStrap.Label>
                                                    <Field
                                                        type="city"
                                                        placeholder="city"
                                                        id="city"
                                                        name="city"
                                                        className="form-control-alternative form-control "
                                                    />
                                                    <ErrorMessage
                                                        className="text-danger"
                                                        name="city"
                                                        component="div"
                                                    />
                                                </div>

                                                {/* zip code in edit */}
                                                <div className="">
                                                    <FormStrap.Label className="form-control-label">
                                                        <h6>zip codes</h6>
                                                    </FormStrap.Label>
                                                    <Field
                                                        type="text"
                                                        id="zip_code"
                                                        name="zip_code"
                                                        placeholder="Enter zip codes"
                                                        className="form-control-alternative form-control "
                                                    />
                                                    <ErrorMessage name="zip_code" component="div" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-100 d-flex justify-content-center">
                                            <button
                                                type="submit"
                                                className="btn btn-primary mt-5 d-block text-uppercase"
                                            >
                                                Update Profile
                                            </button>
                                            <pre>
                                                {JSON.stringify(errors, null, 1)}
                                            </pre>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default UserProfile;