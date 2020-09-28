import React from 'react';
import DisplayUtils from '../../../../utils/DisplayUtils';
import { useTranslation } from 'react-i18next';
import './ModalError.css';

const ModalError = ({ hideErrorModal }) => {
  const { t } = useTranslation();
  const reload = () => window.location.reload();

  return (
    <div className="errorModal-box d-flex align-items-center">
      <div
        className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile'} modal fade`}
        id="errorModal"
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
                  onClick={() => hideErrorModal()}
                >
                  <img alt="closebtn" src="/misc/icons/add_black.png" />
                </div>
              )}
              <div className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile'} text-box black`}>
                <span className="d-flex justify-content-center title mb-4">{t('Errors.errorTitle')}</span>
                <span className="mt-4 description">{t('Errors.errorDescription')}</span>
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
                    }  bg-main-covid btn-modal btn-transparent d-flex justify-content-center align-items-center`}
                    onClick={reload}
                  >
                    <span className="white">{t('Errors.errorBtn')}</span>
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

export default ModalError;
