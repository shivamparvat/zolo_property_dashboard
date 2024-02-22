
import {MultipleSection, RadioButton} from "./Utils/Utils";
import {Form as FormStrap} from "react-bootstrap";


const overlooking = [
    {
        image: 'https://gpropertypay.com/public/assets/garden.png',
        key: "Garden/park",
        value: "Garden/park"
    },
    {
        image: 'https://gpropertypay.com/public/assets/swiming_pool.png',
        key: "Pool",
        value: "Pool"
    },
    {
        image: 'https://gpropertypay.com/public/assets/road.png',
        key: "Road",
        value: "Road"
    },
    {
        image: 'https://gpropertypay.com/public/assets/cornor_property.png',
        key: "Cornor Property",
        value: "Cornor Property"
    },

]

const ownership_type = [
    {
        key: "Freehold",
        value: "Freehold"
    },
    {
        key: "Power_of_attorney",
        value: "Power_of Attorney"
    },
    {
        key: "leasehold",
        value: "Leasehold"
    },
    {
        key: "Co_Operative_Society",
        value: "Co-Operative Society"
    },

]

const page4: React.FC<page> = ({type, data, setData}) => {
    return (
        <div>
            <div className="row">
                <div>
                    <FormStrap.Label className="form-control-label">
                        <h6>Overlooking</h6>
                    </FormStrap.Label>
                    <div className="">
                        <div>
                            {overlooking.map((type: any, index: number) => {
                                return <MultipleSection
                                    text={type.value || ""}
                                    key={index}
                                    checked={(data?.overlooking || []).includes(type.value)}
                                    image={type.image || ''}
                                    onChange={() => {
                                        setData((pre: any) => {
                                            const additionalRoomArray = pre.overlooking || [];

                                            if (!Array.isArray(additionalRoomArray)) {
                                                return pre;
                                            }

                                            const updatedAdditionalRoom = additionalRoomArray.includes(type.value)
                                                ? additionalRoomArray.filter((value: any) => value !== type.value)
                                                : [...additionalRoomArray, type.value];

                                            return {
                                                ...pre,
                                                overlooking: updatedAdditionalRoom
                                            };
                                        });
                                    }} />
                            })}
                        </div>
                    </div>
                </div>

            </div>
            <div className="row">
                <div>
                    <FormStrap.Label className="form-control-label">
                        <h6>Ownership Type</h6>
                    </FormStrap.Label>
                    <div className="">
                        <div>
                            {ownership_type.map((type: any, index: number) => <RadioButton
                                text={type.value || ""}
                                key={index}
                                checked={data?.ownership_type == (type.key || "")}
                                image={type.image}
                                onChange={() => {setData((pre: any) => ({...pre, ownership_type: (type.key || "")}))}} />)}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default page4;