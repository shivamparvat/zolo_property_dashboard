
import {MultipleSection, RadioButton} from "./Utils/Utils";
import {Form as FormStrap} from "react-bootstrap";


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

const page4: React.FC<page> = ({type, data, setData}) => {
    return (
        <div>
            <div className="row">
                <div className="col-md-3">
                    <FormStrap.Label className="form-control-label">
                        <h6>Floor</h6>
                    </FormStrap.Label>
                    <div className="">
                        <div>
                            <select name="" id="" value={data.floor} onChange={(e) => {
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
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <FormStrap.Label className="form-control-label">
                        <h6>Total Floor</h6>
                    </FormStrap.Label>
                    <div>
                        <div>
                            <select name="" id="" value={data.total_floor} onChange={(e) => {
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
                            <select name="" id="" value={data.open_side} onChange={(e) => {
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
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <FormStrap.Label className="form-control-label">
                        <h6>Facing Side</h6>
                    </FormStrap.Label>
                    <div>
                        <div>
                            <select name="" id="" value={data.open_side} onChange={(e) => {
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
                                <input type="number" placeholder="facing width" value={data.facing_road_width} onChange={(e) => {
                                    setData((pre: any) => ({
                                        ...pre, facing_road_width: e.target.value
                                    }))
                                }} />
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
                            <select name="" id="" value={data.facing_road_width_in} onChange={(e) => {
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page4;