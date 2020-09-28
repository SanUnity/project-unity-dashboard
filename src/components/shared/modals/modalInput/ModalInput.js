import React, { useReducer } from 'react';
import DisplayUtils from '../../../../utils/DisplayUtils';
import { useTranslation } from 'react-i18next';
import constants from '../../../../utils/constants';
import './ModalInput.css';

const initialState = {
  email: '',
  errors: {},
};

const reducer = (state, action) => {
  state.errors[action.type] = !action.payload;
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payload };
    default:
      return initialState;
  }
};

const ModalInput = ({ title, description, mainBtnText, mainAction, closeModal }) => {
  const { t } = useTranslation();

  const [state, dispatch] = useReducer(reducer, initialState);

  const empty = t('Errors.empty');
  const format = t('Errors.notValid');

  const isValid = () => {
    return Object.values(state).some((item) => item === '') || !constants.EMAIL_PATTERN.test(state.email);
  };

  return (
    <div className="inputModal-box">
      <div
        className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile'} modal fade`}
        id="inputModal"
        role="dialog"
        aria-labelledby="myModalLabel"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile m-0'} input-modal-dialog `} role="document">
          <div className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile'} input-modal-content bg-light-b2b`}>
            <div className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile'} input-modal-body bg-light-b2b black`}>
              <div
                className={`${
                  DisplayUtils.isMobile() ? 'mobile bg-light-b2b' : 'desktop'
                } btn-close d-flex justify-content-center align-items-center `}
                onClick={() => closeModal()}
              >
                <img alt="closebtn" src="/misc/icons/add_black.png" />
              </div>
              <div className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile'} text-box black`}>
                <span className="d-flex justify-content-center title mb-4">{title}</span>
                <span className="mt-4 description">{description}</span>
                <input
                  name="email"
                  value={state.email}
                  type="text"
                  placeholder={t('Login.email')}
                  className={`mt-4 ${state.errors.email && 'is-invalid'} ${state.email &&
                    !constants.EMAIL_PATTERN.test(state.email) &&
                    'is-invalid'} form-control w-100`}
                  onBlur={e => dispatch({ type: e.target.name, payload: e.target.value })}
                  onChange={e => dispatch({ type: e.target.name, payload: e.target.value })}
                />
                {state.errors.email ? (
                  <span className="red mb-2 error d-flex justify-content-start">{empty}</span>
                ) : (
                  state.email &&
                  !constants.EMAIL_PATTERN.test(state.email) && (
                    <span className="red mb-2 error d-flex justify-content-start">{format}</span>
                  )
                )}
              </div>
              <div className="row m-0 p-2">
                <div
                  className={`${
                    !DisplayUtils.isMobile() ? 'desktop justify-content-center' : 'mobile justify-content-center'
                  } col-12 d-flex p-0`}
                >
                  <button
                    className={`${
                      !DisplayUtils.isMobile() ? 'desktop' : 'mobile'
                    } btn-modal bg-main-covid btn-input btn-transparent d-flex justify-content-center align-items-center`}
                    onClick={() => mainAction(state.email)}
                    disabled={isValid()}
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

export default ModalInput;
