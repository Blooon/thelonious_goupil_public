import React, { useState } from 'react';
import { Redirect } from 'react-router';
import FlipPage from 'react-flip-page';
import Modal from 'react-bootstrap/Modal';

const Thesis = ({ images }) => {
  const [redirect, setRedirect] = useState(false);
  const [cursor, setCursor] = useState('next');
  const [portrait, setPortrait] = useState(false);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setRedirect(true);
  }

	const leftRightImage = (e) => {
		let currentTargetRect = e.currentTarget.getBoundingClientRect();
		if (e.clientY >= currentTargetRect.top && e.clientY <= currentTargetRect.top + currentTargetRect.height) {
			if (e.clientX >= currentTargetRect.left && e.clientX <= currentTargetRect.left + currentTargetRect.width/2) {
				setCursor('prev')
			}
			else if (e.clientX >= currentTargetRect.left && e.clientX <= currentTargetRect.left + currentTargetRect.width) {
				setCursor('next')
			}
		}
  }

  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  if (height > width && !portrait) setPortrait(true);
  if (height < width && portrait) setPortrait(false);
  
  return (
    <>
      {redirect && <Redirect push to="/about" />}
      <Modal
        className="pointer"
        backdropClassName="thesis-backdrop-modal"
        dialogClassName={"thesis-modal" + (portrait ? " vertical" : "")}
        show={true}
        onHide={handleClose}
        animation={false}
        size="l"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className={"flippage-container " + cursor} onMouseMove={e => leftRightImage(e)}>
            <FlipPage
              orientation="horizontal"
              responsive={true}
              flipOnTouch={true}
              flipOnTouchZone={50}
              animationDuration={250}
              pageBackground="transparent"
            >
              {images && images.map(image => (
                <picture key={image.file}>
                  <source
                    media="(max-width: 767px)"
                    sizes="(max-width: 1440px) 90vw, 1296px"
                    srcSet={`
                    ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_200/' + image.file}.jpg 200w,
                    ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + image.file}.jpg 1296w`}
                  />
                  <source
                    media="(min-width: 768px) and (max-width: 991px)"
                    sizes="(max-width: 1440px) 90vw, 1296px"
                    srcSet={`
                    ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_692/' + image.file}.jpg 692w,
                    ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + image.file}.jpg 1296w`}
                  />
                  <source
                    media="(min-width: 992px) and (max-width: 1199px)"
                    sizes="(max-width: 2400px) 40vw, 960px"
                    srcSet={`
                    ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_397/' + image.file}.jpg 397w,
                    ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_960/' + image.file}.jpg 960w`}
                  />
                  <img
                    sizes="(max-width: 2592px) 50vw, 1296px"
                    srcSet={`
                    ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_600/' + image.file}.jpg 600w,
                    ${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + image.file}.jpg 1296w`}
                    src={`${process.env.REACT_APP_S3_BUCKET_BASE_URL + 'w_1296/' + image.file}.jpg`}
                    className="thesis-image"
                    alt={image.file}
                  />
                </picture>
              ))}
            </FlipPage>
          </div>          
        </Modal.Body>
        {portrait && open && <div className="alert w3-bottom">
          <div className="alert-inner">
            <p className="primary-font w3-show-inline-block">
              For a full experience read it on your PC!
            </p>
            <button
              className="alert-button w3-show-inline-block w3-bar-item"
              onClick={() => setOpen(false)}
            >
            </button>
          </div>
        </div>}
      </Modal>
    </>
  )
};

export default Thesis;