
import {MultipleSection, RadioButton} from "./Utils/Utils";
import {Accordion, Form as FormStrap} from "react-bootstrap";

const page6: React.FC<page> = ({type, data, setData}) => {
    return (
        <Accordion defaultActiveKey="1" className="mt-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Tenant Preferences</Accordion.Header>
                <Accordion.Body>
                    <div>
                        <div>
                            <FormStrap.Label className="form-control-label">
                                <h6>Preferred Tenants</h6>
                            </FormStrap.Label>
                            <div className="row">
                                <div className="col-md-2">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="preferred_tenants" checked={("family" == data.preferred_tenants)} onChange={(e) => setData((pre: any) => ({...pre, preferred_tenants: "family"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> Family</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                                <div className="col-md-2">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="preferred_tenants" checked={("bachelors" == data.preferred_tenants)} onChange={(e) => setData((pre: any) => ({...pre, preferred_tenants: "bachelors"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> Bachelors</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                                <div className="col-md-2">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="preferred_tenants" checked={("all" == data.preferred_tenants)} onChange={(e) => setData((pre: any) => ({...pre, preferred_tenants: "all"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> All</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <FormStrap.Label className="form-control-label">
                                <h6>Gender Preference</h6>
                            </FormStrap.Label>
                            <div className="row">
                                <div className="col-md-2">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="gender_preference" checked={("Only Men" == data.gender_preference)} onChange={(e) => setData((pre: any) => ({...pre, gender_preference: "Only Men"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> Only Men</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                                <div className="col-md-2">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="gender_preference" checked={("Only Women" == data.gender_preference)} onChange={(e) => setData((pre: any) => ({...pre, gender_preference: "Only Women"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> Only Women</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                                <div className="col-md-2">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="gender_preference" checked={("All" == data.gender_preference)} onChange={(e) => setData((pre: any) => ({...pre, gender_preference: "All"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> All</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <FormStrap.Label className="form-control-label">
                                <h6>Maximum Tentants Allowed</h6>
                            </FormStrap.Label>
                            <div className="row">
                                <div className="col-md-2">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="maximum_tentants_allowed" checked={("1-2" == data.maximum_tentants_allowed)} onChange={(e) => setData((pre: any) => ({...pre, maximum_tentants_allowed: "1-2"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> 1-2</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                                <div className="col-md-2">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="maximum_tentants_allowed" checked={("3-4" == data.maximum_tentants_allowed)} onChange={(e) => setData((pre: any) => ({...pre, maximum_tentants_allowed: "3-4"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> 3-4</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                                <div className="col-md-2">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="maximum_tentants_allowed" checked={("More Than 4" == data.maximum_tentants_allowed)} onChange={(e) => setData((pre: any) => ({...pre, maximum_tentants_allowed: "More Than 4"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> More Than 4</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <FormStrap.Label className="form-control-label">
                                <h6>Work Preference</h6>
                            </FormStrap.Label>
                            <div className="row">
                                <div className="col-md-2">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="work_preference" checked={("Salaried" == data.work_preference)} onChange={(e) => setData((pre: any) => ({...pre, work_preference: "Salaried"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> Salaried</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                                <div className="col-md-2">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="work_preference" checked={("Student" == data.work_preference)} onChange={(e) => setData((pre: any) => ({...pre, work_preference: "Student"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> Student</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                                <div className="col-md-2">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="work_preference" checked={("Businessmen" == data.work_preference)} onChange={(e) => setData((pre: any) => ({...pre, work_preference: "Businessmen"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> Businessmen</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                                <div className="col-md-2">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="work_preference" checked={("All" == data.work_preference)} onChange={(e) => setData((pre: any) => ({...pre, work_preference: "All"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> All</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <FormStrap.Label className="form-control-label">
                                <h6>Dietary/Food Preference</h6>
                            </FormStrap.Label>
                            <div className="row">
                                <div className="col-md-3">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="food_preference" checked={("Only Vegetarians" == data.food_preference)} onChange={(e) => setData((pre: any) => ({...pre, food_preference: "Only Vegetarians"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6>  Only Vegetarians</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                                <div className="col-md-3">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="food_preference" checked={("Non-Veg Allowed" == data.food_preference)} onChange={(e) => setData((pre: any) => ({...pre, food_preference: "Non-Veg Allowed"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> Non-Veg Allowed</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                                <div className="col-md-3">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="food_preference" checked={("No Preference" == data.food_preference)} onChange={(e) => setData((pre: any) => ({...pre, food_preference: "No Preference"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> No Preference</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <FormStrap.Label className="form-control-label">
                                <h6>Expected Duration Of Stay</h6>
                            </FormStrap.Label>
                            <div className="row">
                                <div className="col-md-3">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="expected_duration_of_stay" checked={("Atleast 6 Months" == data.expected_duration_of_stay)} onChange={(e) => setData((pre: any) => ({...pre, expected_duration_of_stay: "Atleast 6 Months"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6>  Atleast 6 Months</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                                <div className="col-md-3">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="expected_duration_of_stay" checked={("Atleast 1 Year" == data.expected_duration_of_stay)} onChange={(e) => setData((pre: any) => ({...pre, expected_duration_of_stay: "Atleast 1 Year"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> Atleast 1 Year</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                                <div className="col-md-3">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="expected_duration_of_stay" checked={("Atleast 2 Year" == data.expected_duration_of_stay)} onChange={(e) => setData((pre: any) => ({...pre, expected_duration_of_stay: "Atleast 2 Year"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6> Atleast 2 Year</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                                <div className="col-md-3">
                                    <label className="radio-button">
                                        <input type="radio" className="radio-button__input" id="family" name="expected_duration_of_stay" checked={("No Preference" == data.expected_duration_of_stay)} onChange={(e) => setData((pre: any) => ({...pre, expected_duration_of_stay: "No Preference"}))} />
                                        <FormStrap.Label className="form-control-label">
                                            <h6>  No Preference</h6>
                                        </FormStrap.Label>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <FormStrap.Label className="form-control-label">
                                <h6>Any special requirements</h6>
                            </FormStrap.Label>
                            <div>
                                <textarea className="form-control" name="description" rows={4} value={data.special_requirement}
                                    onChange={(e) => {
                                        setData((pre: any) => ({...pre, special_requirement: e.target.value}))
                                    }} placeholder="tell us more about the property..." ></textarea>
                            </div>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item></Accordion>
    );
}

export default page6;