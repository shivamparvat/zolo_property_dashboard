import ApiFeature from "@/Api/ApiFeature";
import {setLoader} from "@/redux/reducer/loader";
import {ErrorMessage, Field, Formik, Form} from "formik";
import {Form as FormStrap} from "react-bootstrap";
import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import {useDispatch, } from "react-redux";
import * as Yup from "yup";
import {setRecallApi} from "@/redux/reducer/RecallApi";
import ShowToast, {error} from "../Utils/ShowToast";
import {useRouter} from "next/router";

const ActionScreen: React.FC<ActionModalType> = (props) => {
  // props
  const {id, onClose, isActive, data, type, urls, path} = props;

  // validation logic
  const validation = {
    note: Yup.string()
      .min(2, "Notes must be at least 2 characters"),
  };

  // states

  const [formInitData] = useState<any>({
    note: data.note,
  });

  //   Hooks
  const dispatch = useDispatch();
  const router = useRouter()



  //   from submit
  const onsubmit = async (value: any) => {
    dispatch(setLoader(true));
    let res;
    try {
      res = await ApiFeature.put(urls, {note: value.note}, id, true);
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
          <h3>Create Notes</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          enableReinitialize={true}
          onSubmit={onsubmit}
          initialValues={formInitData}
          validationSchema={Yup.object().shape(validation)}
        >
          {({values, setFieldValue}) => (
            <Form>
              <div className="row">
                <div className="col">
                  <div className="">
                    <FormStrap.Label className="form-control-label">
                      <h6>Note</h6>
                    </FormStrap.Label>
                    <Field
                      as="textarea"
                      rows={4}
                      type="textarea"
                      placeholder="Notes"
                      id="note"
                      name="note"
                      className="form-control-alternative form-control"
                    />
                    <ErrorMessage
                      className="text-danger"
                      name="note"
                      component="div"
                    />
                  </div>
                </div>
              </div>
              {/* submit */}
              <div className="w-100 d-flex justify-content-center">
                {values.note ? <button
                  type="submit"
                  className="btn btn-primary mt-5 d-block text-uppercase"
                >
                  create note
                </button> :
                  <div className="btn bg-warning mt-5 d-block text-uppercase" onClick={() => {
                    onClose("")
                  }}>
                    Go Back
                  </div>}
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default ActionScreen;
