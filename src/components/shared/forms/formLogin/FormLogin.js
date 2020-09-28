import React from 'react'
import './FormLogin.css'
import DisplayUtils from '../../../../utils/DisplayUtils';
import constants from '../../../../utils/constants';
import { useTranslation } from 'react-i18next';


const FormLogin = ({ state, dispatch, errorResponse,handleSubmit,showRecoverPassModal, isValid }) => {
  const { t } = useTranslation();

  return (
    <div className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} justify-content-center row m-0 box-inputs select-component`}>
      <div className="col-12 p-0 mb-3 d-flex justify-content-center mt-5">
       
       <img src='/misc/icons/Project_Unity.png' alt='Project Unity' className="logo" />
        
      </div>
      <div className="col-12 p-0">
        <span className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} d-block title`}>{t('Login.title')}</span>
        
      </div>
      <div className={`${DisplayUtils.isMobile() ? 'my-4' : 'my-5'} row inputs-container`}>
        <div className={`${DisplayUtils.isMobile() ? '' : ''} col-12 p-0 usename-input`}>
          <img alt="mail-icon" src="/misc/icons/envelope_black.svg" />
          <input
            name="email"
            value={state.email}
            type="text"
            placeholder={t('Login.email')}
            className={`${state.errors.email ? 'is-invalid' : ''} ${state.email &&
              !constants.EMAIL_PATTERN.test(state.email) ?
              'is-invalid' : ''} ${constants.EMAIL_PATTERN.test(state.email) ? 'is-valid' : ''} form-control`}
            onBlur={e => dispatch({ type: e.target.name, payload: e.target.value })}
            onChange={e => dispatch({ type: e.target.name, payload: e.target.value })}
          />
        </div>
        
        <div className={`${DisplayUtils.isMobile() ? '' : ''} mt-2 col-12 p-0 password-input`}>
          <img alt="pass-icon" src="/misc/icons/key.svg" />
          <input
            name="password"
            value={state.password}
            type="password"
            placeholder={t('Login.password')}
            className={`${state.errors.password && 'is-invalid'} ${state.password.length > 5 &&
              'is-valid'} form-control`}
            onBlur={e => dispatch({ type: e.target.name, payload: e.target.value })}
            onChange={e => dispatch({ type: e.target.name, payload: e.target.value })}
          />
        </div>
        {state.errors.email ? (
          <span className="red mb-2 error">{t('Errors.userRequired')}</span>
        ) : (
          state.email &&
          !constants.EMAIL_PATTERN.test(state.email) && <span className="red mb-2 error">{t('Errors.notValid')}</span>
        )}
        {state.errors.password && <span className="red error">{t('Errors.passRequired')}</span>}
        {errorResponse && <span className="red error">{errorResponse}</span>}
      </div>
      
      <div
        className={`${
          DisplayUtils.isMobile() ? 'd-flex justify-content-center mobile' : ' d-flex justify-content-center desktop'
        } row mb-4 mx-0 w-100`}
      >
        <button onClick={e => handleSubmit(e)} className="btn btn-login btn-block" disabled={isValid()}>
          {t('Login.login').toUpperCase()}
        </button>
      </div>
      <div className="w-100 mb-5 d-flex justify-content-center">
        <div className={`${DisplayUtils.isMobile() ? '' : ''} recover`} onClick={() => showRecoverPassModal()}>
          <span>{t('Login.recover')}</span>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
