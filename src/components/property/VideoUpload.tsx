import React, {useRef} from "react";

const VideoUpload: React.FC<VideoUpload> = ({video, setVideo}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    return (
        <>
            <div className="card  w-98 mx-3">
                <div className="card-body">
                    <div className="kb-file-upload">
                        <div className="file-upload-box">
                            <input
                                type="file"
                                id="fileupload"
                                className="file-upload-input"
                                name="videoFile"
                                onChange={(e) => {
                                    setVideo((e?.target?.files && e?.target?.files[0]) || null)
                                }}
                                accept="video/*" ref={fileInputRef} />
                            <span>
                                Drag and drop or{" "}
                                <span className="file-link">Choose your Property Video</span>
                            </span>
                        </div>
                    </div>
                    {video &&
                        <div className="row">
                            <div className="col-md-4">
                                <video width="300" controls>
                                    <source src={video && URL.createObjectURL(video) || ""} type={video && video?.type} />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="col-md-3 ms-1">
                                <p className="ml-2">{video && video?.name}</p>
                                <p className="file-action-btn" onClick={() => {
                                    setVideo(null)
                                    if (fileInputRef.current) {
                                        fileInputRef.current.value = '';
                                    }
                                }}>Delete</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default VideoUpload;