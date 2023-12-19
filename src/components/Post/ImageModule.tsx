import Image from "next/image";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";

interface Image {
  src: string;
  alt: string;
}

interface imagePreviewType {
  isActive: boolean;
  onClose: React.Dispatch<boolean>;
  selectedID: number;
  imageData: any;
  backdrop?: string;
}

const ImagePreview = (props: imagePreviewType) => {
  const { imageData, isActive, onClose } = props;
  const [lightBoxImage, setLightBoxImage] = useState("");
  const [lightBoxAltImage, setLightBoxAltImage] = useState("");
  const [lightBoxIndex, setLightBoxIndex] = useState(0);

  const openLightBox = (src: string, alt: string, index: number) => {
    setLightBoxImage(src);
    setLightBoxAltImage(alt);
    setLightBoxIndex(index);
  };

  const closeLightBox = (event: any) => {
    if (event.target.classList.contains("lightbox__close-button")) {
      setLightBoxImage("");
      setLightBoxAltImage("");
    }
  };

  const goToNextImage = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    const newIndex = (lightBoxIndex + 1) % imageData?.product_image.length;
    openLightBox(
      imageData?.product_image[newIndex].url,
      imageData?.product_image[newIndex].alt,
      newIndex
    );
  };

  const goToPreviousImage = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const newIndex =
      (lightBoxIndex - 1 + imageData?.product_image.length) %
      imageData?.product_image.length;
    openLightBox(
      imageData?.product_image[newIndex].url,
      imageData?.product_image[newIndex].alt,
      newIndex
    );
  };

  return (
    <Modal
      show={isActive}
      onHide={() => onClose(false)}
      dialogClassName="modal-lg"
      style={{ marginLeft: "23px" }}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>Image Preview</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="gallery">
            {imageData &&
              imageData.product_image.map((image: any, index: number) => (
                <button
                  type="button"
                  className="gallery__item"
                  key={index}
                  onClick={() =>
                    openLightBox(image.url, image.product_name, index)
                  }
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  <Image
                    width={400}
                    height={400}
                    className="gallery__image"
                    src={image.url}
                    alt={image.image}
                  />
                  <div>{image.product_name}</div>
                </button>
              ))}
          </div>
          {lightBoxImage && (
            <div className="lightbox">
              <span
                className="lightbox__close-button"
                onClick={(event) => closeLightBox(event)}
              >
                &times;
              </span>
              <i
                className="fa-solid fa-angles-left fa-2x previous"
                onClick={(event) => goToPreviousImage(event)}
              ></i>
              <Image
                width={600}
                height={600}
                className="lightbox__image object-fit-contain"
                src={lightBoxImage}
                alt={lightBoxAltImage}
              />
              <i
                className="fa-solid fa-angles-right fa-2x next"
                onClick={(event) => goToNextImage(event)}
              ></i>
              <button
                type="button"
                className="lightbox__bg"
                onClick={closeLightBox}
              />
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ImagePreview;
