import React from 'react';
import DisplayUtils from '../../../../utils/DisplayUtils';
import './ModalDouble.css';

const ModalDouble = ({
  title,
  description,
  mainBtnText,
  secondaryBtnText,
  mainAction,
  secondaryAction,
  closeModal,
}) => {
  return (
    <div className="doubleModal-box">
      <div
        className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile'} modal fade`}
        id="doubleModal"
        role="dialog"
        aria-labelledby="myModalLabel"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile m-0'} double-modal-dialog `} role="document">
          <div className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile'} double-modal-content bg-light-b2b`}>
            <div className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile'} double-modal-body bg-light-b2b black`}>
              {!DisplayUtils.isMobile() && (
                <div
                  className={`${
                    DisplayUtils.isMobile() ? 'mobile' : 'desktop'
                  } btn-close d-flex justify-content-center align-items-center`}
                  onClick={() => closeModal()}
                >
                  <img alt="closebtn" src="/misc/icons/add_black.png" />
                </div>
              )}
              <div className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile'} text-box black`}>
                <span className="d-flex justify-content-center title mb-4">{title}</span>
                <span className="mt-4 description light-text">{description}</span>
              </div>
              <div className="row m-0 p-2">
                <div
                  className={`${
                    !DisplayUtils.isMobile() ? ' desktop' : ' mobile'
                  } d-flex justify-content-center col-6  p-2`}
                >
                  <button
                    onClick={() => mainAction()}
                    className={`${
                      !DisplayUtils.isMobile() ? 'desktop' : 'mobile'
                    } bg-main-covid btn-modal d-flex justify-content-center align-items-center`}
                  >
                    <span className="white">{mainBtnText}</span>
                  </button>
                </div>
                <div
                  className={`${
                    !DisplayUtils.isMobile() ? 'desktop' : 'mobile'
                  } col-6 d-flex justify-content-center p-2`}
                >
                  <button
                    className={`${
                      !DisplayUtils.isMobile() ? 'desktop' : 'mobile'
                    } bg-main-covid btn-modal d-flex justify-content-center align-items-center`}
                    onClick={() => secondaryAction()}
                  >
                    <span className="white">{secondaryBtnText}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDouble;
