
import {FormError, MultipleSection, RadioButton} from "./Utils/Utils";
import {Accordion, Form as FormStrap} from "react-bootstrap";


const FacingSide = [
    "North",
    "South",
    "West",
    "East",
    "Northeast",
    "Northwest",
    "Southwest",
    "Southeast",
]

const facing_road_width_in = ["Feet", "Meters"]

const page4: React.FC<page> = ({type, data, setData, errors}) => {
    return (
        <Accordion defaultActiveKey="1" className="mt-3">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Property Details</Accordion.Header>
                <Accordion.Body>
                    <div>
                        <div className="row">
                            <div className="col-md-3">
                                <FormStrap.Label className="form-control-label">
                                    <h6>Floor</h6>
                                </FormStrap.Label>
                                <div className="">
                                    <div>
                                        <select name="" className="form-control" id="" value={data.floor} onChange={(e) => {
                                            setData((pre: any) => ({...pre, floor: e.target.value}))
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
                                        <FormError errorKey="floor" errors={errors} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <FormStrap.Label className="form-control-label">
                                    <h6>Total Floor</h6>
                                </FormStrap.Label>
                                <div>
                                    <div>
                                        <select className="form-control" name="" id="" value={data.total_floor} onChange={(e) => {
                                            setData((pre: any) => ({...pre, total_floor: e.target.value}))
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
                                        <FormError errorKey="total_floor" errors={errors} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <FormStrap.Label className="form-control-label">
                                    <h6>Open Side</h6>
                                </FormStrap.Label>
                                <div className="">
                                    <div>
                                        <select className="form-control" name="" id="" value={data.open_side} onChange={(e) => {
                                            setData((pre: any) => ({...pre, open_side: e.target.value}))
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
                                        <FormError errorKey="open_side" errors={errors} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <FormStrap.Label className="form-control-label">
                                    <h6>Facing Side</h6>
                                </FormStrap.Label>
                                <div>
                                    <div>
                                        <select className="form-control" name="" id="" value={data.open_side} onChange={(e) => {
                                            setData((pre: any) => ({...pre, open_side: e.target.value}))
                                        }}>
                                            <option value="" selected disabled hidden>
                                                select
                                            </option>

                                            {FacingSide.map(
                                                (value: string, index: number) => {
                                                    return (
                                                        <option key={index} value={value}>
                                                            {value}
                                                        </option>
                                                    );
                                                }
                                            )}

                                        </select>
                                        <FormError errorKey="open_side" errors={errors} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <FormStrap.Label className="form-control-label">
                                    <h6>Facing width size</h6>
                                </FormStrap.Label>
                                <div className="">
                                    <div>
                                        <div>
                                            <input className="form-control" type="number" placeholder="facing width" value={data.facing_road_width} onChange={(e) => {
                                                setData((pre: any) => ({
                                                    ...pre, facing_road_width: e.target.value
                                                }))
                                            }} />
                                            <FormError errorKey="facing_road_width" errors={errors} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <FormStrap.Label className="form-control-label">
                                    <h6>Size in</h6>
                                </FormStrap.Label>
                                <div>
                                    <div>
                                        <select name="" className="form-control" id="" value={data.facing_road_width_in} onChange={(e) => {
                                            setData((pre: any) => ({...pre, facing_road_width_in: e.target.value}))
                                        }}>
                                            <option value="" selected disabled hidden>
                                                select
                                            </option>

                                            {facing_road_width_in.map(
                                                (value: string, index: number) => {
                                                    return (
                                                        <option key={index} value={value}>
                                                            {value}
                                                        </option>
                                                    );
                                                }
                                            )}

                                        </select>
                                        <FormError errorKey="facing_road_width_in" errors={errors} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item></Accordion>
    );
}

export default page4;