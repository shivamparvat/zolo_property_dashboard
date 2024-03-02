import {PAGE_TYPE_ADD, STATE_OPTION} from "@/components/Utils/constants";
import MapComponent, {Coordinates} from "@/components/Utils/map";
import {useState} from "react";
import {FormError, RadioButton} from "./Utils/Utils";
import {Form as FormStrap} from "react-bootstrap";
import Select from 'react-select';


const propertyForConfig = [
    {
        key: "sell",
        value: "Sell"
    },
    {
        key: "rent",
        value: "Rent"
    },

]
const propertyTypeConfig = [
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
        image: 'https://gpropertypay.com/public/assets/shop.png',
        key: "Shop",
        value: "Shop"
    },
    {
        image: 'https://gpropertypay.com/public/assets/office.png',
        key: "Office",
        value: "Office"
    },
    {
        image: 'https://gpropertypay.com/public/assets/villa.png',
        key: "Villa",
        value: "Villa"
    },
    {
        image: 'https://gpropertypay.com/public/assets/plot.png',
        key: "Plot",
        value: "Plot"
    },

]

const propertyTypeConfigRent = [
    {
        image: 'https://gpropertypay.com/public/assets/hostel.png',
        key: "Hostel",
        value: "Hostel"
    },
    {
        image: 'https://gpropertypay.com/public/assets/pg.png',
        key: "Pg",
        value: "Pg"
    }
]
const propertyTypeConfigSell = [
    {
        image: 'https://gpropertypay.com/public/assets/farm.png',
        key: "Farm",
        value: "Farm"
    }
]

const Page1: React.FC<page> = ({type, data, setData, errors}) => {

    return (
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
                    <FormError errors={errors} errorKey="property_for" />
                </div>
            </div>
            <FormStrap.Label className="form-control-label">
                <h6>Your property type</h6>
            </FormStrap.Label>
            <div>
                <div>
                    {propertyTypeConfig.map((type: any, index: number) => <RadioButton
                        text={type.value || ""}
                        key={index}
                        checked={data?.property_type == (type.key || "")}
                        image={type.image || ''}
                        onChange={() => {setData((pre: any) => ({...pre, property_type: (type.key || "")}))}} />)}
                    {data?.property_for == "rent" && propertyTypeConfigRent.map((type: any, index: number) => <RadioButton
                        text={type.value || ""}
                        key={index}
                        checked={data?.property_type == (type.key || "")}
                        image={type.image || ''}
                        onChange={() => {setData((pre: any) => ({...pre, property_type: (type.key || "")}))}} />)}
                    {data?.property_for !== "rent" && propertyTypeConfigSell.map((type: any, index: number) => <RadioButton
                        text={type.value || ""}
                        key={index}
                        checked={data?.property_type == (type.key || "")}
                        image={type.image || ''}
                        onChange={() => {setData((pre: any) => ({...pre, property_type: (type.key || "")}))}} />)}

                </div>
                <FormError errorKey="property_type" errors={errors} />

            </div>
            <div>
                <div>
                    <FormStrap.Label className="form-control-label">
                        <h6>Address</h6>
                    </FormStrap.Label>
                    <div className="row">
                        <div className="col-md-3">
                            <FormStrap.Label className="form-control-label">
                                <h6>City</h6>
                            </FormStrap.Label>
                            <div>
                                <input type="text" className="form-control" placeholder="City" value={data.city} onChange={(e) => {
                                    setData((pre: any) => ({
                                        ...pre, city: e.target.value
                                    }))
                                }} />
                                <FormError errorKey="city" errors={errors} />
                            </div>

                        </div>
                        <div className="col-md-3">
                            <FormStrap.Label className="form-control-label">
                                <h6>State</h6>
                            </FormStrap.Label>
                            <Select id="state" placeholder="State" name="state"
                                options={STATE_OPTION || {value: "", lable: ""}} className="form-control-alternative form-control stateSelect"
                                defaultValue={{value: data?.state, label: data?.state}}
                                onChange={(selectedOption) =>
                                    setData({...data, state: selectedOption ? selectedOption.value : ''})
                                }
                            />
                            <FormError errorKey="state" errors={errors} />
                        </div>
                        <div className="col-md-3">
                            <FormStrap.Label className="form-control-label">
                                <h6>Zip Code</h6>
                            </FormStrap.Label>
                            <div>
                                <input type="number" className="form-control" placeholder="Zip Code" value={data.zip_code} onChange={(e) => {
                                    setData((pre: any) => ({
                                        ...pre, zip_code: e.target.value
                                    }))
                                }} />
                                <FormError errorKey="zip_code" errors={errors} />
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <FormStrap.Label className="form-control-label">
                            <h6>Address</h6>
                        </FormStrap.Label>
                        <div>
                            <textarea className="form-control" name="location" rows={4} value={data.location}
                                onChange={(e) => {
                                    setData((pre: any) => ({...pre, location: e.target.value}))
                                }} placeholder="Address..." ></textarea>
                            <FormError errorKey="location" errors={errors} />
                        </div>
                    </div>

                </div>
            </div>
            <div className="mt-2">

                <MapComponent Coordinates={data?.coordinates} setCoordinates={({lat, lng}) => {
                    setData((pre: any) => ({
                        ...pre, coordinates: {lat: lat || 0, lng: lng || 0}
                    }))
                }} />
            </div>

        </div>
    );
}

export default Page1;