import {PAGE_TYPE_ADD} from "@/components/Utils/constants";
import {Coordinates} from "@/components/Utils/map";
import {useState} from "react";
import {MultipleSection, RadioButton} from "./Utils/Utils";
import {Form as FormStrap} from "react-bootstrap";
import {Formik, Form} from "formik";


export const saleable_area_size_in = ["Feet", "Meters", "Yards", "Bigha", "Acres", "Hectares"]
export const carpet_area_size_in = ["Feet", "Meters", "Yards"]


export const additional_room = [
    {
        key: "Prayer Room",
        value: "Prayer Room",
        image: "https://gpropertypay.com/public/assets/prayer_room.png"
    },
    {
        key: "Study Room",
        value: "Study Room"
        , image: "https://gpropertypay.com/public/assets/study_room.png"
    },
    {
        key: "Store Room",
        value: "Store Room"
        , image: "https://gpropertypay.com/public/assets/store_room.png"
    },
    {
        key: "servant Room",
        value: "servant Room"
        , image: "https://gpropertypay.com/public/assets/servent_room.png"
    },
]
export const additional_facility = [
    {
        key: "PLc",
        value: "PLc",
        image: "https://gpropertypay.com/public/assets/plc.png"
    },
    {
        key: "Car Parking",
        value: "Car Parking"
        , image: "https://gpropertypay.com/public/assets/car_parking.png"
    },
    {
        key: "Club Membership",
        value: "Club Membership"
        , image: "https://gpropertypay.com/public/assets/club_membership.png"
    },
    {
        key: "registration",
        value: "registration"
        , image: "https://gpropertypay.com/public/assets/registration.png"
    },
]

const propertyStatus = [
    {
        key: "Ready_to_shift",
        value: "Ready To Shift"
    },
    {
        key: "Underconstruction",
        value: "Under Construction"
    },
]


const Page2: React.FC<page> = ({type, data, setData}) => {
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
                        <div>
                            <div>
                                <div>
                                    <FormStrap.Label className="form-control-label">
                                        <h6>Select Bedrooms</h6>
                                    </FormStrap.Label>

                                    {[...Array(15)].map((type: any, index: number) => <RadioButton
                                        text={`${index + 1}` || ""}
                                        key={index + 1}
                                        checked={data?.bedrooms == (`${index + 1}` || "")}
                                        onChange={() => {setData((pre: any) => ({...pre, bedrooms: (`${index + 1}` || "")}))}} />)}
                                    <RadioButton
                                        text={`1RK` || ""}
                                        checked={data?.bedrooms == (`1RK` || "")}
                                        onChange={() => {setData((pre: any) => ({...pre, bedrooms: (`1RK` || "")}))}} />
                                </div>
                            </div>
                            <FormStrap.Label className="form-control-label">
                                <h6>Tell us your property area</h6>
                            </FormStrap.Label>
                            <div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <FormStrap.Label className="form-control-label">
                                            <h6>Saleable area</h6>
                                        </FormStrap.Label>
                                        <div>
                                            <input placeholder="Saleable area" value={data.saleable_area} type="number" onChange={(e) => {
                                                setData((pre: any) => ({...pre, saleable_area: e.target.value}))
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div>
                                            <FormStrap.Label className="form-control-label">
                                                <h6>Saleable area</h6>
                                            </FormStrap.Label>
                                            <div>
                                                <select name="" id="" value={data.saleable_area_size_in} onChange={(e) => {
                                                    setData((pre: any) => ({...pre, saleable_area_size_in: e.target.value}))
                                                }}>
                                                    <option value="" selected disabled hidden>
                                                        area_size
                                                    </option>

                                                    {saleable_area_size_in.map(
                                                        (value: string, index: number) => {
                                                            return (
                                                                <option key={value} value={value}>
                                                                    {value}
                                                                </option>
                                                            );
                                                        }
                                                    )}

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <FormStrap.Label className="form-control-label">
                                            <h6>Carpet area</h6>
                                        </FormStrap.Label>
                                        <div>
                                            <input placeholder="Saleable area" value={data.carpet_area} type="number" onChange={(e) => {
                                                setData((pre: any) => ({...pre, carpet_area: e.target.value}))
                                            }} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <FormStrap.Label className="form-control-label">
                                            <h6>Saleable area</h6>
                                        </FormStrap.Label>
                                        <div>
                                            <select name="" id="" value={data.carpet_area_size_in} onChange={(e) => {
                                                setData((pre: any) => ({...pre, carpet_area_size_in: e.target.value}))
                                            }}>
                                                <option value="" selected disabled hidden>
                                                    area_size
                                                </option>

                                                {carpet_area_size_in.map(
                                                    (value: string, index: number) => {
                                                        return (
                                                            <option key={value} value={value}>
                                                                {value}
                                                            </option>
                                                        );
                                                    }
                                                )}

                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <FormStrap.Label className="form-control-label">
                                <h6>Tell us more about the configuration</h6>
                            </FormStrap.Label>
                            <div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <FormStrap.Label className="form-control-label">
                                            <h6>Bathrooms</h6>
                                        </FormStrap.Label>
                                        <div>
                                            <div>

                                                <select name="" id="" value={data.saleable_area_size_in} onChange={(e) => {
                                                    setData((pre: any) => ({...pre, saleable_area_size_in: e.target.value}))
                                                }}>
                                                    <option value="" selected disabled hidden>
                                                        Bathrooms
                                                    </option>

                                                    {[...Array(15)].map(
                                                        (value: string, index: number) => {
                                                            return (
                                                                <option key={index} value={`${index + 1}`}>
                                                                    {`${index + 1}`}
                                                                </option>
                                                            );
                                                        }
                                                    )}

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <FormStrap.Label className="form-control-label">
                                            <h6>Balconies</h6>
                                        </FormStrap.Label>
                                        <div>
                                            <div>
                                                <select name="" id="" value={data.balconies} onChange={(e) => {
                                                    setData((pre: any) => ({...pre, balconies: e.target.value}))
                                                }}>
                                                    <option value="" selected disabled hidden>
                                                        Balconies
                                                    </option>

                                                    {[...Array(15)].map(
                                                        (value: string, index: number) => {
                                                            return (
                                                                <option key={index} value={`${index + 1}`}>
                                                                    {`${index + 1}`}
                                                                </option>
                                                            );
                                                        }
                                                    )}

                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {additional_room.map((type: any, index: number) => {
                                return <MultipleSection
                                    text={type.value || ""}
                                    key={index}
                                    checked={(data?.additional_room || []).includes(type.value)}
                                    image={type.image || ''}
                                    onChange={() => {
                                        setData((pre: any) => {
                                            const additionalRoomArray = pre.additional_room || [];

                                            if (!Array.isArray(additionalRoomArray)) {
                                                return pre;
                                            }

                                            const updatedAdditionalRoom = additionalRoomArray.includes(type.value)
                                                ? additionalRoomArray.filter((value: any) => value !== type.value)
                                                : [...additionalRoomArray, type.value];

                                            return {
                                                ...pre,
                                                additional_room: updatedAdditionalRoom
                                            };
                                        });
                                    }} />
                            })}
                        </div>
                        <div >
                            <FormStrap.Label className="form-control-label">
                                <h6>What is the expected price</h6>
                            </FormStrap.Label>
                            <div className="row">
                                <div className="col-md-3">
                                    <FormStrap.Label className="form-control-label">
                                        <h6>Price(per sq feet)</h6>
                                    </FormStrap.Label>
                                    <div>
                                        <input type="number" placeholder="Price(per sq feet)" value={data.expected_price_in_sqft} onChange={(e) => {
                                            setData((pre: any) => ({
                                                ...pre, expected_price_in_sqft: e.target.value
                                            }))
                                        }} />
                                    </div>

                                </div>
                                <div className="col-md-3">
                                    <FormStrap.Label className="form-control-label">
                                        <h6>Total Price</h6>
                                    </FormStrap.Label>
                                    <div>
                                        <input type="number" placeholder="expected_price" value={data.expected_price} onChange={(e) => {
                                            setData((pre: any) => ({
                                                ...pre, expected_price: e.target.value
                                            }))
                                        }} />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div>
                            <input type="checkbox" name="negotiable" id="negotiable" checked={data.negotiable} onChange={e => {
                                setData((pre: any) => ({
                                    ...pre,
                                    negotiable: !data.negotiable
                                }))
                            }} />
                            <label htmlFor="negotiable">negotiable</label>
                        </div>

                        <div>
                            <FormStrap.Label className="form-control-label">
                                <h6>Include</h6>
                            </FormStrap.Label>
                            <div>
                                {additional_facility.map((type: any, index: number) => {
                                    return <MultipleSection
                                        text={type.value || ""}
                                        key={index}
                                        checked={(data?.additional_facility || []).includes(type.value)}
                                        image={type.image || ''}
                                        onChange={() => {
                                            setData((pre: any) => {
                                                const additionalRoomArray = pre.additional_facility || [];

                                                if (!Array.isArray(additionalRoomArray)) {
                                                    return pre;
                                                }

                                                const updatedAdditionalRoom = additionalRoomArray.includes(type.value)
                                                    ? additionalRoomArray.filter((value: any) => value !== type.value)
                                                    : [...additionalRoomArray, type.value];

                                                return {
                                                    ...pre,
                                                    additional_facility: updatedAdditionalRoom
                                                };
                                            });
                                        }} />
                                })}
                            </div>
                        </div>

                        {/* rent */}
                        {/* <div>
                            <FormStrap.Label className="form-control-label">
                                <h6>Booking Amount</h6>
                            </FormStrap.Label>
                            <div>
                                <input type="number" placeholder="Booking Amount" value={data.expected_price_in_sqft} onChange={(e) => {
                                    setData((pre: any) => ({
                                        ...pre, booking_price: e.target.value
                                    }))
                                }} />
                            </div>
                        </div> */}

                        <div>
                            <FormStrap.Label className="form-control-label">
                                <h6>Property Status</h6>
                            </FormStrap.Label>
                            <div>
                                {propertyStatus.map((type: any, index: number) => <RadioButton
                                    text={type.value || ""}
                                    key={index}
                                    checked={data?.property_status == (type.key || "")}
                                    image={type.image}
                                    onChange={() => {setData((pre: any) => ({...pre, property_status: (type.key || "")}))}} />)}

                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <FormStrap.Label className="form-control-label">
                                <h6>Property Age</h6>
                            </FormStrap.Label>
                            <div>
                                <div>
                                    <select name="" id="" value={data.saleable_area_size_in} onChange={(e) => {
                                        setData((pre: any) => ({...pre, saleable_area_size_in: e.target.value}))
                                    }}>
                                        <option value="" selected disabled hidden>
                                            Property Age
                                        </option>

                                        {new Array(30).fill(0).map(
                                            (value: string, index: number) => {
                                                return (
                                                    <option key={index} value={index + 1}>
                                                        {index + 1} Year
                                                    </option>
                                                );
                                            }
                                        )}

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <FormStrap.Label className="form-control-label">
                                <h6>Possession Date</h6>
                            </FormStrap.Label>
                            <div>
                                <div>
                                    <input type="date" name="possession_date" id="possession_date" value={data.possession_date}
                                        onChange={(e) => {
                                            setData((pre: any) => ({...pre, possession_date: e.target.value}))
                                        }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <FormStrap.Label className="form-control-label">
                            <h6>Description</h6>
                        </FormStrap.Label>
                        <div>
                            <textarea className="form-control" name="description" rows={4} value={data.description}
                                onChange={(e) => {
                                    setData((pre: any) => ({...pre, description: e.target.value}))
                                }} placeholder="tell us more about the property..." ></textarea>
                        </div>
                    </div>
                </Form>)}
        </Formik>
    );
}

export default Page2;