import Image from "next/image"
import React from "react"

type RadioButton = {text?: string, image?: string, checked: boolean, onChange: () => void}
export const RadioButton: React.FC<RadioButton> = ({checked, onChange, text, image}) => {

    return <>
        <div onClick={onChange} id={text || ""} className={`radio col-auto mr-sm-2 mx-1 card-block text-center radio ${checked ? "selected" : ""}`}>
            <div className="flex-row align-items-center px-3 py-1">
                <div className="col">
                    {image && (
                        <div className="pic">
                            <Image
                                src={image}
                                alt="user1"
                                width={40}
                                height={40}
                                className="avatar-sm me-3"
                            />
                        </div>
                    )}
                    <div className="">{text && text}</div>
                </div>
            </div>
        </div>
    </>
}


type MultipleSection = {text?: string, image?: string, checked: boolean, onChange: () => void}
export const MultipleSection: React.FC<MultipleSection> = ({text, image, checked, onChange}) => {
    return <>

        <div onClick={onChange} className={`radio col-auto mr-sm-2 mx-1 card-block py-1 text-center radio ${checked ? "selected" : ""}`}>
            <div className="flex-row align-items-center px-3 py-1">
                <div className="col">
                    {image && (
                        <div className="pic">
                            <Image
                                src={image}
                                alt="user1"
                                width={50}
                                height={50}
                                className="avatar-sm "
                            />
                        </div>
                    )}
                </div>
                <div className="">{text && text}</div>
            </div>
        </div></>
}



export const FormError: React.FC<ErrorForm> = ({errors, errorKey, className, text}) => {
    if (errors[errorKey]) {
        return <div className={`text-danger ${className || ""}`}>{text || errors[errorKey] || "something went wrong"}</div>
    }
}