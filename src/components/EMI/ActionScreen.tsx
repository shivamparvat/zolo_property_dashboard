import ApiFeature from "@/Api/ApiFeature";
import {setLoader} from "@/redux/reducer/loader";
import {RootState} from "@/redux/store";
import {ErrorMessage, Field, Formik, Form} from "formik";
import {Form as FormStrap} from "react-bootstrap";
import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {setRecallApi} from "@/redux/reducer/RecallApi";
// import { debounceFun } from "../Utils/Throttle";
import {PAGE_TYPE_ADD, TAX_TYPE_DATA, TAX_TYPE_KEY} from "../Utils/constants";

const ActionScreen: React.FC<ActionModalType> = (props) => {
  // props
  const {onClose, isActive, data, type, urls, path} = props;

  // user tax_type

  // validation logic
  const validation = {
    tax_type: Yup.string().required("tax_type is required"),
    value: Yup.string()
      .required("Value is required")
      .min(1, "Value must be at least 2 characters")
      .max(100, "Value can be at most 100 characters"),
  };

  // states
  const [taxInitData] = useState<any>({
    value: type == PAGE_TYPE_ADD ? "" : data.value,
    tax_type: type == PAGE_TYPE_ADD ? "" : data.tax_type,
  });

  //   Hooks
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.login.userToken?.token);

  //   from submit
  const onsubmit = async (value: any) => {
    dispatch(setLoader(true));
    try {
      let res;
      if (type === PAGE_TYPE_ADD) {
        res = await ApiFeature.post(urls, value, 0, true);
      } else {
        res = await ApiFeature.put(urls, value, data.id, true);
      }
      if (res.status == 200) {
        dispatch(setLoader(false));
        dispatch(setRecallApi(true));
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
      dialogClassName="modal-md"
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
          initialValues={taxInitData}
          validationSchema={Yup.object().shape(validation)}
        >
          {() => (
            <Form>
              <div className="d-flex gap-column justify-content-between ">
                {/* tax type */}
                <div className="w-100">
                  {/* tax type */}
                  <div>
                    <FormStrap.Label className="form-control-label">
                      <h6>Tax Type</h6>
                    </FormStrap.Label>
                    <Field
                      as="select"
                      name="tax_type"
                      id="tax_type"
                      className="form-control-alternative form-control"
                    >
                      <option value="" selected disabled hidden>
                        select TAX type
                      </option>
                      {TAX_TYPE_KEY.map((value: string, index: number) => {
                        return (
                          <option key={index} value={value}>
                            {
                              TAX_TYPE_DATA[
                              value as unknown as keyof typeof TAX_TYPE_DATA
                              ]
                            }
                          </option>
                        );
                      })}
                    </Field>
                    <ErrorMessage
                      name="tax_type"
                      className="text-danger"
                      component="div"
                    />
                  </div>
                  {/* Tax value */}
                  <div className="">
                    <FormStrap.Label className="form-control-label">
                      <h6>Value</h6>
                    </FormStrap.Label>
                    <Field
                      type="number"
                      placeholder="Value"
                      id="value"
                      name="value"
                      className="form-control-alternative form-control "
                    />
                    <ErrorMessage
                      name="value"
                      className="text-danger"
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
                  {type == PAGE_TYPE_ADD ? "Add " : "Update "} {path}
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
