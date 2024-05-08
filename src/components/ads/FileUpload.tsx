import Image from "next/image";
import React, {useEffect, useState} from "react";
import {MAX_FILE_SIZE_BYTES} from "../Utils/constants";
import ShowToast, {error} from "../Utils/ShowToast";
import path from "path";

interface MultiFileUploadType {
  selectedFile: any[];
  setSelectedFile: React.Dispatch<any>;
  setFiles: React.Dispatch<File[] | any>;
  Files: File[],
  setDeletedFile?: React.Dispatch<any>;
  setBanner: React.Dispatch<string | undefined>
  banner: string | undefined
}
export const fileSizes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const FileUpload: React.FC<MultiFileUploadType> = ({
  selectedFile = [],
  setSelectedFile,
  setFiles,
  Files,
  setDeletedFile,
  setBanner,
  banner
}) => {
  const isOverSize = (bytes: number) => {
    if (bytes < MAX_FILE_SIZE_BYTES) {
      return false;
    } else {
      ShowToast(error, "Image size should not exceed 1 MB.");
      return true;
    }
  };
  function generateId() {
    let firstPart: string = `${(Math.random() * 46656) | 0}`;
    let secondPart: string = `${Math.random() * 46656 || 0}`;
    firstPart = ("000" + firstPart.toString()).slice(-3);
    secondPart = ("000" + secondPart.toString()).slice(-3);
    return firstPart + secondPart;
  }
  const InputChange = (e: any) => {
    setFiles(Array.from(e.target.files));
    // --For Multiple File Input
    for (let i = 0; i < e.target.files.length; i++) {
      console.log(e.target.files[i]);

      let reader = new FileReader();
      let file = e.target.files[i];
      reader.onloadend = () => {
        setSelectedFile((preValue: any) => {
          return [
            {
              id: generateId(),
              filename: e.target.files[i].name,
              filetype: e.target.files[i].type,
              fileImage: reader.result,
              datetime:
                e.target.files[i].lastModifiedDate.toLocaleString("en-IN"),

              fileSize: fileSizes(e.target.files[i].size),
              overSize: isOverSize(e.target.files[i].size),
            },
            ...preValue,
          ];
        });
      };
      if (e.target.files[i]) {
        reader.readAsDataURL(file);
      }
    }
  };

  const DeleteSelectFile = (index: number) => {
    if (window.confirm("Are you sure you want to delete this Image?")) {
      if (setDeletedFile) {
        if (Files.length <= index) {
          setDeletedFile((file: any) => {
            const copyFiles = [...selectedFile];
            const deletedFile = copyFiles.splice(index, 1);
            var parsedUrl = new URL(deletedFile[0]);
            return [...file, path.join("public", parsedUrl?.pathname)]
          });
        }
      }

      setFiles((files: File[]) => {
        const copyFiles = [...files];
        if (copyFiles.length > index) {
          copyFiles.splice(index, 1);
        }
        return copyFiles;
      });

      setSelectedFile((file: any) => {
        const copyFiles = [...file];
        if (copyFiles.length > index) {
          copyFiles.splice(index, 1);
        }
        return copyFiles;
      });
    } else {
      // alert('No');
    }
  };

  return (
    <div className="fileupload-view">
      <div className="row justify-content-center m-0">
        <div className="col-md-12">
          <div className="card  w-100 mt-5">
            <div className="card-body">
              <div className="kb-data-box">
                <div className="kb-file-upload">
                  <div className="file-upload-box">
                    <input
                      type="file"
                      id="fileupload"
                      className="file-upload-input"
                      onChange={InputChange}
                      multiple
                      accept="image/*"
                    />
                    <span>
                      Drag and drop or{" "}
                      <span className="file-link">Choose Property Image</span>
                    </span>
                  </div>
                </div>
                <div className="kb-attach-box mb-3">
                  {selectedFile.map((data: any, index: number) => {
                    return (
                      <div
                        className={`file-atc-box ${data.overSize ? "alert lightDanger" : ""
                          }`}
                        id={data.overSize ? "removeImg" : ""}
                        key={data.id ? data.id : data.product_image_id}
                      >
                        {/* {filename.match(/.(jpg|jpeg|png|gif|svg)$/i) ? ( */}
                        <div className="file-image">
                          <Image
                            width={150}
                            height={120}
                            src={data.fileImage || data}
                            alt="product img"
                            className="object-fit-cover"
                          />
                        </div>
                        {/* ) : (
                          <div className="file-image">
                            <i className="far fa-file-alt"></i>
                          </div>
                        )} */}
                        <div className="file-detail">
                          <h6>{data.filename || data?.split('/').pop()}</h6>
                          <p></p>
                          <p>
                            {data.fileSize && (
                              <span>Size : {data.fileSize}</span>
                            )}
                            {data.datetime && (
                              <span className="ml-2">
                                {" "}
                                Modified Time : {data.datetime}
                              </span>
                            )}
                          </p>
                          <div className="file-actions">
                            <button
                              type="button"
                              className="file-action-btn"
                              onClick={() =>
                                DeleteSelectFile(
                                  index
                                )
                              }
                            >
                              Delete
                            </button>
                            {
                              <>
                              {
                                console.log(banner,"banner")
    
                              }</>
                            }
                            <input
                              type="radio"
                              name="banner"
                              defaultValue={banner}
                              value={data.filename || data?.split('/').pop()}
                              checked={banner == (data.filename || data?.split('/').pop())}
                              className="file-action-btn ms-3"
                              onChange={(e) => {setBanner(e?.target?.value || "")}}
                            />Banner
                          </div>
                          <span className="text-danger">
                            {data.overSize
                              ? "Image size should not exceed 1 MB."
                              : null}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
