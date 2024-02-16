import {PAGE_TYPE_ADD} from "@/components/Utils/constants";
import MapComponent, {Coordinates} from "@/components/Utils/map";
import {useState} from "react";
import {RadioButton} from "./Utils/Utils";
import {Form as FormStrap} from "react-bootstrap";
import {ErrorMessage, Field, Formik, Form} from "formik";


const propertyForConfig = [
    {
        key: "sell",
        value: "sell"
    },
    {
        key: "rent",
        value: "rent"
    },

]
const propertyTypeConfig = [
    {
        image: 'https://gpropertypay.com/public/assets/shop.png',
        key: "Shop",
        value: "Shop"
    },
    {
        image: 'https://gpropertypay.com/public/assets/plot.png',
        key: "Plot",
        value: "Plot"
    },
    {
        image: 'https://gpropertypay.com/public/assets/office.png',
        key: "Office",
        value: "Office"
    },
    {
        image: 'https://gpropertypay.com/public/assets/apartments.png',
        key: "Apartments",
        value: "Apartments"
    },
    {
        image: 'https://gpropertypay.com/public/assets/house.png',
        key: "House",
        value: "House"
    },
    {
        image: 'https://gpropertypay.com/public/assets/villa.png',
        key: "Villa",
        value: "Villa"
    },
    {
        image: 'https://gpropertypay.com/public/assets/hostel.png',
        key: "Hostel",
        value: "Hostel"
    },
    {
        image: 'https://gpropertypay.com/public/assets/pg.png',
        key: "Pg",
        value: "Pg"
    },
    {
        image: 'https://gpropertypay.com/public/assets/farm.png',
        key: "Farm",
        value: "Farm"
    },
]



const Page1: React.FC<page> = ({type, data, setData}) => {
    const [coordinates, setCoordinates] = useState<Coordinates>(type == PAGE_TYPE_ADD ? {lat: 22, lng: 78} : {lat: (data?.coordinates || [])[0] || 22, lng: (data?.coordinates || [])[1] || 78})
    return (
        <Formik
            enableReinitialize={true}
            onSubmit={() => { }}
            initialValues={{}}
        // validationSchema={Yup.object().shape(validation)}
        >
            {({values, setValues}) => (
                <Form>
                    <div>
                        <FormStrap.Label className="form-control-label">
                            <h6>I want to</h6>
                        </FormStrap.Label>
                        <div>
                            <div>
                                {propertyForConfig.map((type: any, index: number) => <RadioButton
                                    text={type.value || ""}
                                    key={index}
                                    checked={data?.property_for == (type.key || "")}
                                    image={type.image}
                                    onChange={() => {setData((pre: any) => ({...pre, property_for: (type.key || "")}))}} />)}
                            </div>
                        </div>
                        <FormStrap.Label className="form-control-label">
                            <h6>I want to</h6>
                        </FormStrap.Label>
                        <div>
                            <div>
                                {propertyTypeConfig.map((type: any, index: number) => <RadioButton
                                    text={type.value || ""}
                                    key={index}
                                    checked={data?.property_type == (type.key || "")}
                                    image={type.image || ''}
                                    onChange={() => {setData((pre: any) => ({...pre, property_type: (type.key || "")}))}} />)}

                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <FormStrap.Label className="form-control-label">
                                        <h6>Select Bedrooms</h6>
                                    </FormStrap.Label>
                                    <Field
                                        as="select"
                                        name="role"
                                        id="role"
                                        className="form-control-alternative form-control"
                                    >
                                        <option value="" selected disabled hidden>
                                            Select Bedrooms
                                        </option>

                                        {new Array(15).fill(0).map(
                                            (value: string, index: number) => {
                                                return (
                                                    <option key={index} value={index + 1}>
                                                        {index + 1}
                                                    </option>
                                                );
                                            }
                                        )}
                                        <option value="1RK">1RK</option>
                                    </Field>
                                    <ErrorMessage
                                        className="text-danger"
                                        name="bedrooms"
                                        component="bedrooms"
                                    />
                                </div>

                            </div>
                        </div>
                        <div className="mt-2">

                            <MapComponent Coordinates={coordinates} setCoordinates={setCoordinates} />
                        </div>

                    </div>
                </Form>)}
        </Formik>
    );
}

export default Page1;