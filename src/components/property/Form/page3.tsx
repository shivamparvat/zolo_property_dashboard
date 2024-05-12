
import {FormError, MultipleSection, RadioButton} from "./Utils/Utils";
import {Accordion, Form as FormStrap} from "react-bootstrap";


const furnishingStatus = [
    {
        key: "Unfurnished",
        value: "Unfurnished"
    },
    {
        key: "Semi_furnished",
        value: "Semi furnished"
    },
    {
        key: "Fully_furnished",
        value: "Fully furnished"
    },

]
const additional_furnishing = [
    {
        image: '/assets/sofa.png',
        key: "Sofa",
        value: "Sofa"
    },
    {
        image: '/assets/refrigerator.png',
        key: "Refrigerator",
        value: "Refrigerator"
    },
    {
        image: '/assets/dining_table.png',
        key: "Dining Table",
        value: "Dining Table"
    },
    {
        image: '/assets/gas_connection.png',
        key: "Gas Connection",
        value: "Gas Connection"
    },
    {
        image: '/assets/water_connection.png',
        key: "Water Connection",
        value: "Water Connection"

    },
    {
        image: '/assets/washing_machine.png',
        key: "Washing Machine",
        value: "Washing Machine"
    },
    {
        image: '/assets/wifi_connection.png',
        key: "Wifi Connection",
        value: "Wifi Connection"
    },
    {
        image: '/assets/microwave.png',
        key: "Microwave",
        value: "Microwave"
    }
]




const page3: React.FC<page> = ({type, data, setData, errors}) => {
    return (
        <Accordion defaultActiveKey="1" className="mt-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Choose Furnishing Status</Accordion.Header>
                <Accordion.Body>
                    <div>
                        <div>
                            <div>
                                <FormStrap.Label className="form-control-label">
                                    <h6>Choose furnishing status</h6>
                                </FormStrap.Label>
                                <div>
                                    {furnishingStatus.map((type: any, index: number) => <RadioButton
                                        text={type.value || ""}
                                        key={index}
                                        checked={data?.furnishing_status == (type.key || "")}
                                        image={type.image}
                                        onChange={() => {setData((pre: any) => ({...pre, furnishing_status: (type.key || "")}))}} />)}
                                    <FormError errorKey="furnishing_status" errors={errors} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <FormStrap.Label className="form-control-label">
                                    <h6>Wardrobe</h6>
                                </FormStrap.Label>
                                <div className="">
                                    <div>
                                        <select className="form-control" name="" id="" value={data.wardrobe} onChange={(e) => {
                                            setData((pre: any) => ({...pre, wardrobe: e.target.value}))
                                        }}>
                                            <option value="" selected disabled hidden>
                                                select
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

                                        </select>
                                        <FormError errorKey="wardrobe" errors={errors} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <FormStrap.Label className="form-control-label">
                                    <h6>Beds</h6>
                                </FormStrap.Label>
                                <div>
                                    <div>
                                        <select className="form-control" name="" id="" value={data.beds} onChange={(e) => {
                                            setData((pre: any) => ({...pre, beds: e.target.value}))
                                        }}>
                                            <option value="" selected disabled hidden>
                                                select
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

                                        </select>
                                        <FormError errorKey="beds" errors={errors} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <FormStrap.Label className="form-control-label">
                                    <h6>Ac</h6>
                                </FormStrap.Label>
                                <div className="">
                                    <div>
                                        <select className="form-control" name="" id="" value={data.ac} onChange={(e) => {
                                            setData((pre: any) => ({...pre, ac: e.target.value}))
                                        }}>
                                            <option value="" selected disabled hidden>
                                                select
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

                                        </select>
                                        <FormError errorKey="ac" errors={errors} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <FormStrap.Label className="form-control-label">
                                    <h6>tv</h6>
                                </FormStrap.Label>
                                <div>
                                    <div>
                                        <select className="form-control" name="" id="" value={data.tv} onChange={(e) => {
                                            setData((pre: any) => ({...pre, tv: e.target.value}))
                                        }}>
                                            <option value="" selected disabled hidden>
                                                select
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

                                        </select>
                                        <FormError errorKey="tv" errors={errors} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <FormStrap.Label className="form-control-label">
                                <h6>Additional Furnishing</h6>
                            </FormStrap.Label>
                            <div>
                                {additional_furnishing.map((type: any, index: number) => {
                                    return <MultipleSection
                                        text={type.value || ""}
                                        key={index}
                                        checked={(data?.additional_furnishing || []).includes(type.value)}
                                        image={type.image || ''}
                                        onChange={() => {
                                            setData((pre: any) => {
                                                const additionalRoomArray = pre.additional_furnishing || [];

                                                if (!Array.isArray(additionalRoomArray)) {
                                                    return pre;
                                                }

                                                const updatedAdditionalRoom = additionalRoomArray.includes(type.value)
                                                    ? additionalRoomArray.filter((value: any) => value !== type.value)
                                                    : [...additionalRoomArray, type.value];

                                                return {
                                                    ...pre,
                                                    additional_furnishing: updatedAdditionalRoom
                                                };
                                            });
                                        }} />
                                })}
                                <FormError errorKey="additional_furnishing" errors={errors} />
                            </div>
                        </div>
                        <div >
                            <div >
                                <FormStrap.Label className="form-control-label">
                                    <h6>Car Parking</h6>
                                </FormStrap.Label>
                                <div className="row">
                                    <div className="col-md-3">
                                        <FormStrap.Label className="form-control-label">
                                            <h6>Open</h6>
                                        </FormStrap.Label>
                                        <div>
                                            <select className="form-control" name="" id="" value={data.car_parking_open} onChange={(e) => {
                                                setData((pre: any) => ({...pre, car_parking_open: e.target.value}))
                                            }}>
                                                <option value="" selected disabled hidden>
                                                    select
                                                </option>

                                                {new Array(15).fill(0).map(
                                                    (value: string, index: number) => {
                                                        return (
                                                            <option key={index} value={index + 1}>
                                                                {index + 1} space
                                                            </option>
                                                        );
                                                    }
                                                )}

                                            </select>
                                            <FormError errorKey="car_parking_open" errors={errors} />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <FormStrap.Label className="form-control-label">
                                            <h6>Close</h6>
                                        </FormStrap.Label>
                                        <div>
                                            <select className="form-control" name="" id="" value={data.car_parking_close} onChange={(e) => {
                                                setData((pre: any) => ({...pre, car_parking_close: e.target.value}))
                                            }}>
                                                <option value="" selected disabled hidden>
                                                    select
                                                </option>

                                                {new Array(15).fill(0).map(
                                                    (value: string, index: number) => {
                                                        return (
                                                            <option key={index} value={index + 1}>
                                                                {index + 1} space
                                                            </option>
                                                        );
                                                    }
                                                )}

                                            </select>
                                            <FormError errorKey="car_parking_close" errors={errors} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item></Accordion>
    );
}



export default page3;


