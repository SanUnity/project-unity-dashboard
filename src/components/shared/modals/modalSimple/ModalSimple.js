import React from 'react';
import DisplayUtils from '../../../../utils/DisplayUtils';
import './ModalSimple.css';

const ModalSimple = ({ title, description, mainBtnText, mainAction, closeModal }) => {
  return (
    <div className="simpleModal-box d-flex align-items-center">
      <div
        className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile'} modal fade`}
        id="simpleModal"
        role="dialog"
        aria-labelledby="myModalLabel"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile m-0'} simple-modal-dialog `} role="document">
          <div className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile'} simple-modal-content bg-light-b2b`}>
            <div className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile'} simple-modal-body bg-light-b2b black`}>
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
                <span className="mt-4 description">{description}</span>
              </div>
              <div className="row m-0 p-2">
                <div
                  className={`${
                    !DisplayUtils.isMobile() ? 'desktop' : 'mobile'
                  } col-12 d-flex p-0 justify-content-center`}
                >
                  <button
                    className={`${
                      DisplayUtils.isMobile() ? 'mobile' : 'desktop'
                    } btn-modal bg-main-covid btn-transparent d-flex justify-content-center align-items-center`}
                    onClick={() => mainAction()}
                  >
                    <span className="white">{mainBtnText}</span>
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

export default ModalSimple;
