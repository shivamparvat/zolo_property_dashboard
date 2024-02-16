import Image from "next/image"

type RadioButton = {text?: string, image?: string, checked: boolean, onChange: () => void}
export const RadioButton: React.FC<RadioButton> = ({checked, onChange, text, image}) => {

    return <>
        <div onClick={onChange} className={`radio col-auto mr-sm-2 mx-1 card-block py-1 text-center radio ${checked ? "selected" : ""}`}>
            <div className="flex-row align-items-center">
                <div className="col">
                    {image && (
                        <div className="pic">
                            <Image
                                src={image}
                                alt="user1"
                                width={40}
                                height={40}
                                className="avatar avatar-sm me-3"
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
            <div className="flex-row align-items-center">
                <div className="col">
                    {image && (
                        <div className="pic">
                            <Image
                                src={image}
                                alt="user1"
                                width={40}
                                height={40}
                                className="avatar avatar-sm me-3"
                            />
                        </div>
                    )}
                </div>
                <div className="">{text && text}</div>
            </div>
        </div></>
}