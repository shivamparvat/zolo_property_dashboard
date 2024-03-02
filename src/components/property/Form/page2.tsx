import {PAGE_TYPE_ADD} from "@/components/Utils/constants";
import {Coordinates} from "@/components/Utils/map";
import {useState} from "react";
import {FormError, MultipleSection, RadioButton} from "./Utils/Utils";
import {Accordion, Form as FormStrap} from "react-bootstrap";


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


const RoomDetails = [
    {
        key: "Single Bed",
        value: "Single Bed"
    },
    {
        key: "Double Sharing",
        value: "Double Sharing"
    },
    {
        key: "Triple Sharing",
        value: "Triple Sharing"
    },
    {
        key: "Multiple Sharing",
        value: "Multiple Sharing"
    },
]

const Page2: React.FC<page> = ({type, data, setData, errors}) => {
    const [coordinates, setCoordinates] = useState<Coordinates>(type == PAGE_TYPE_ADD ? {lat: 22, lng: 78} : {lat: (data?.coordinates || [])[0] || 22, lng: (data?.coordinates || [])[1] || 78})
    return (
        <>
            <Accordion defaultActiveKey="1" className="mt-3">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Details</Accordion.Header>
                    <Accordion.Body>
                        <div>
                            <div>
                                <div>
                                    {data?.property_type !== "Plot" && data?.property_type !== "Farm" && <div>
                                        <div className="pt-2">
                                            <FormStrap.Label className="form-control-label">
                                                <h6>Select Bedrooms</h6>
                                            </FormStrap.Label>
                                        </div>
                                        {[...Array(15)].map((type: any, index: number) => <RadioButton
                                            text={`${index + 1}` || ""}
                                            key={index + 1}
                                            checked={data?.bedrooms == (`${index + 1}` || "")}
                                            onChange={() => {setData((pre: any) => ({...pre, bedrooms: (`${index + 1}` || "")}))}} />)}
                                        <RadioButton
                                            text={`1RK` || ""}
                                            checked={data?.bedrooms == (`1RK` || "")}
                                            onChange={() => {setData((pre: any) => ({...pre, bedrooms: (`1RK` || "")}))}} />
                                        <FormError errorKey="bedrooms" errors={errors} />
                                    </div>}
                                </div>

                                {data?.property_for !== "rent" && <div>
                                    <FormStrap.Label className="form-control-label mt-3">
                                        <h6>Tell us your property area</h6>
                                    </FormStrap.Label>
                                    <div>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <FormStrap.Label className="form-control-label">
                                                    <h6>Saleable area</h6>
                                                </FormStrap.Label>
                                                <div>
                                                    <input className="form-control" placeholder="Saleable area" value={data.saleable_area} type="number" onChange={(e) => {
                                                        setData((pre: any) => ({...pre, saleable_area: e.target.value}))
                                                    }} />
                                                    <FormError errorKey="saleable_area" errors={errors} />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div>
                                                    <FormStrap.Label className="form-control-label">
                                                        <h6>Saleable area</h6>
                                                    </FormStrap.Label>
                                                    <div>
                                                        <select name="" id="" className="form-control" value={data.saleable_area_size_in} onChange={(e) => {
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
                                                        <FormError errorKey="saleable_area_size_in" errors={errors} />
                                                    </div>
                                                </div>
                                            </div>
                                            {data?.property_type !== "Plot" && data?.property_type !== "Farm" && <div className="col-md-3">
                                                <FormStrap.Label className="form-control-label">
                                                    <h6>Carpet area</h6>
                                                </FormStrap.Label>
                                                <div>
                                                    <input className="form-control" placeholder="Saleable area" value={data.carpet_area} type="number" onChange={(e) => {
                                                        setData((pre: any) => ({...pre, carpet_area: e.target.value}))
                                                    }} />
                                                    <FormError errorKey="carpet_area" errors={errors} />
                                                </div>
                                            </div>}
                                            {data?.property_type !== "Plot" && data?.property_type !== "Farm" && <div className="col-md-3">
                                                <div>
                                                    <FormStrap.Label className="form-control-label">
                                                        <h6>Saleable area</h6>
                                                    </FormStrap.Label>
                                                </div>
                                                <div>
                                                    <select name="" id="" className="form-control" value={data.carpet_area_size_in} onChange={(e) => {
                                                        setData((pre: any) => ({...pre, carpet_area_size_in: e.target.value}))
                                                    }}>
                                                        <option value="" selected disabled hidden>
                                                            Area size
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
                                                    <FormError errorKey="carpet_area_size_in" errors={errors} />
                                                </div>
                                            </div>}
                                        </div>
                                    </div>
                                </div>}
                                {data?.property_type !== "Plot" && data?.property_type !== "Farm" &&
                                    <>
                                        <FormStrap.Label className="form-control-label pt-3">
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

                                                            <select name="" className="form-control" id="" value={data.saleable_area_size_in} onChange={(e) => {
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
                                                            <FormError errorKey="saleable_area_size_in" errors={errors} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <FormStrap.Label className="form-control-label">
                                                        <h6>Balconies</h6>
                                                    </FormStrap.Label>
                                                    <div>
                                                        <div>
                                                            <select name="" id="" className="form-control" value={data.balconies} onChange={(e) => {
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
                                                            <FormError errorKey="balconies" errors={errors} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>}
                            </div>
                            {data?.property_type !== "Plot" && data?.property_type !== "Farm" && <div className="pt-4">
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
                                <FormError errorKey="additional_room" errors={errors} />
                            </div>}
                            <div className="pt-3">
                                <FormStrap.Label className="form-control-label">
                                    <h6>What is the expected price</h6>
                                </FormStrap.Label>
                                {data?.property_for !== "rent" && <div className="row">
                                    <div className="col-md-3">
                                        <FormStrap.Label className="form-control-label">
                                            <h6>Price(per sq feet)</h6>
                                        </FormStrap.Label>
                                        <div>
                                            <input type="number" className="form-control" placeholder="Price(per sq feet)" value={data.expected_price_in_sqft} onChange={(e) => {
                                                setData((pre: any) => ({
                                                    ...pre, expected_price_in_sqft: e.target.value
                                                }))
                                            }} />
                                            <FormError errorKey="expected_price_in_sqft" errors={errors} />
                                        </div>

                                    </div>
                                    <div className="col-md-3">
                                        <FormStrap.Label className="form-control-label">
                                            <h6>Total Price</h6>
                                        </FormStrap.Label>
                                        <div>
                                            <input type="number" className="form-control" placeholder="expected_price" value={data.expected_price} onChange={(e) => {
                                                setData((pre: any) => ({
                                                    ...pre, expected_price: e.target.value
                                                }))
                                            }} />
                                            <FormError errorKey="expected_price" errors={errors} />
                                        </div>

                                    </div>
                                </div>}
                                {data?.property_for !== "rent" && <div>
                                    <div className="row pt-2">
                                        <FormStrap.Label className="form-control-label">
                                            <h6>Booking Amount</h6>
                                        </FormStrap.Label>
                                        <div className="col-md-3">
                                            <input type="number" className="form-control" placeholder="Booking Amount" value={data.booking_price} onChange={(e) => {
                                                setData((pre: any) => ({
                                                    ...pre, booking_price: e.target.value
                                                }))
                                            }} />
                                            <FormError errorKey="booking_price" errors={errors} />
                                        </div>
                                    </div>

                                </div>}
                            </div>


                            {data?.property_for == "rent" && <div className="row">
                                <div className="col-md-3">
                                    <FormStrap.Label className="form-control-label">
                                        <h6>monthly Rent</h6>
                                    </FormStrap.Label>
                                    <div>
                                        <input type="number" className="form-control" placeholder="monthly rent" value={data.monthly_rent} onChange={(e) => {
                                            setData((pre: any) => ({
                                                ...pre, monthly_rent: e.target.value
                                            }))
                                        }} />
                                        <FormError errorKey="monthly_rent" errors={errors} />
                                    </div>

                                </div>
                                <div className="col-md-3">
                                    <FormStrap.Label className="form-control-label">
                                        <h6>security deposit</h6>
                                    </FormStrap.Label>
                                    <div>
                                        <input type="number" className="form-control" placeholder="security deposit" value={data.security_deposit} onChange={(e) => {
                                            setData((pre: any) => ({
                                                ...pre, security_deposit: e.target.value
                                            }))
                                        }} />
                                        <FormError errorKey="security_deposit" errors={errors} />
                                    </div>

                                </div>
                            </div>}

                            {data?.property_for == "rent" && <div className="row">
                                <div className="col-md-3">
                                    <FormStrap.Label className="form-control-label">
                                        <h6>maintance charge</h6>
                                    </FormStrap.Label>
                                    <div>
                                        <input type="number" className="form-control" placeholder="security deposit" value={data.maintance_charge} onChange={(e) => {
                                            setData((pre: any) => ({
                                                ...pre, maintance_charge: e.target.value
                                            }))
                                        }} />
                                        <FormError errorKey="maintance_charge" errors={errors} />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <FormStrap.Label className="form-control-label">
                                        <h6>available Date </h6>
                                    </FormStrap.Label>
                                    <div>
                                        <input type="date" className="form-control" placeholder="security deposit" value={data.available_from} onChange={(e) => {
                                            setData((pre: any) => ({
                                                ...pre, available_from: e.target.value
                                            }))
                                        }} />
                                    </div>
                                    <FormError errorKey="available_from" errors={errors} />
                                </div>
                            </div>}


                            <div className="col-md-3 ps-2 mt-3">
                                <input type="checkbox" name="negotiable" id="negotiable" checked={data.negotiable} onChange={e => {
                                    setData((pre: any) => ({
                                        ...pre,
                                        negotiable: !data.negotiable
                                    }))
                                }} />
                                <label htmlFor="negotiable ps-1 d-inline-block">negotiable</label>

                                <FormError errorKey="negotiable" errors={errors} />
                            </div>

                            {data?.property_type === "Pg" || data?.property_type === "Hostel" && <div className="row">
                                <div className="col-md-12">
                                    <FormStrap.Label className="form-control-label">
                                        <h6>room Details</h6>
                                    </FormStrap.Label>
                                    <table className="table">
                                        <thead>
                                            <tr><th>Room Type</th>
                                                <th>Number Of Rooms</th>
                                                <th>Price for Rooms</th>
                                                <th>Action</th>
                                            </tr></thead>
                                        <tbody id="items_rows_body">
                                            {(data?.room_data || [{}]).map((item: any, index: number) => <tr key={index} id="primary_row_items">
                                                <td>
                                                    <select className="form-control" value={item.room_type}
                                                        onChange={(e) => {
                                                            setData((pre: object | any) => {
                                                                const arr = pre?.room_data || [{}]
                                                                if (arr[index] != undefined) {
                                                                    arr[index] = {...arr[index], room_type: e.target.value}
                                                                }
                                                                return {
                                                                    ...pre,
                                                                    room_data: arr
                                                                }
                                                            })
                                                        }}>
                                                        <option value="" hidden disabled >Select</option>
                                                        {RoomDetails.map((roomType: any, index: number) => <option key={index} value={roomType?.key}>{roomType?.value}</option>)}
                                                    </select>
                                                </td>
                                                <td><input type="number" value={item?.no_of_rooms} className="form-control "

                                                    onChange={(e) => {
                                                        setData((pre: object | any) => {
                                                            const arr = pre?.room_data || [{}]
                                                            if (arr[index] != undefined) {
                                                                arr[index] = {...arr[index], no_of_rooms: e.target.value}
                                                            }
                                                            return {
                                                                ...pre,
                                                                room_data: arr
                                                            }
                                                        })
                                                    }} /></td>
                                                <td><input type="number" value={item?.price} className="form-control"
                                                    onChange={(e) => {
                                                        setData((pre: object | any) => {
                                                            const arr = pre?.room_data || [{}]
                                                            if (arr[index] != undefined) {
                                                                arr[index] = {...arr[index], price: e.target.value}
                                                            }
                                                            return {
                                                                ...pre,
                                                                room_data: arr
                                                            }
                                                        })
                                                    }} /></td>
                                                {index === 0 ? <td><a className="btn btn-outline btn-success" id="item_plus_btn" onClick={() => {
                                                    setData((pre: any) => ({
                                                        ...pre,
                                                        room_data: [...(pre?.room_data || []), {}]
                                                    }))
                                                }}>
                                                    <i className="fa fa-plus"></i></a></td> :
                                                    <td><a className="btn btn-outline btn-danger" id="item_plus_btn"
                                                        onClick={() => {
                                                            setData((pre: any) => {
                                                                const arr = pre?.room_data || []
                                                                arr.splice(index, 1)
                                                                return {
                                                                    ...pre,
                                                                    room_data: arr
                                                                }
                                                            })
                                                        }}
                                                    >
                                                        <i className="fa fa-minus"></i>
                                                    </a></td>}
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>}
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <Accordion defaultActiveKey="1" className="mt-3">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Include</Accordion.Header>
                    <Accordion.Body>
                        {data?.property_type !== "Plot" && data?.property_type !== "Farm" && <div>
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
                                <FormError errorKey="additional_facility" errors={errors} />
                            </div>
                        </div>}

                        {data?.property_type !== "Plot" && data?.property_type !== "Farm" && <div>
                            <FormStrap.Label className="form-control-label mt-2">
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
                            <FormError errorKey="property_status" errors={errors} />
                        </div>}

                        {data?.property_type !== "Plot" && data?.property_type !== "Farm" && <div className="row">
                            <div className="col-md-3">
                                <FormStrap.Label className="form-control-label">
                                    <h6>Property Age</h6>
                                </FormStrap.Label>
                                <div>
                                    <div>
                                        <select className="form-control" name="" id="" value={data.saleable_area_size_in} onChange={(e) => {
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
                                        <FormError errorKey="saleable_area_size_in" errors={errors} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <FormStrap.Label className="form-control-label">
                                    <h6>Possession Date</h6>
                                </FormStrap.Label>
                                <div>
                                    <div>
                                        <input className="form-control" type="date" name="possession_date" id="possession_date" value={data.possession_date}
                                            onChange={(e) => {
                                                setData((pre: any) => ({...pre, possession_date: e.target.value}))
                                            }} />
                                        <FormError errorKey="possession_date" errors={errors} />
                                    </div>
                                </div>
                            </div>
                        </div>}

                        <div>
                            <FormStrap.Label className="form-control-label">
                                <h6>Description</h6>
                            </FormStrap.Label>
                            <div>
                                <textarea className="form-control" name="description" rows={4} value={data.description}
                                    onChange={(e) => {
                                        setData((pre: any) => ({...pre, description: e.target.value}))
                                    }} placeholder="tell us more about the property..." ></textarea>
                                <FormError errorKey="description" errors={errors} />
                            </div>
                        </div>


                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    );
}

export default Page2;