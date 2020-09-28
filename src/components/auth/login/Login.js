import React, { useReducer, useContext, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { authService } from '../../../services/index';
import {
  ModalInput,
  ModalSimple,
  Loading,
  ModalError,
  FormLogin
} from '../../index';
import './Login.css';
import DisplayUtils from '../../../utils/DisplayUtils';
import constants from '../../../utils/constants';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../../contexts/AuthContext';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

const initialState = {
  email: '',
  password: '',
  errors: {}
};

const Login = () => {
  const { t } = useTranslation();
  const [errorResponse, setErrorResponse] = useState(null);
  const { currentToken, setCurrentToken } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useLocalStorage( constants.CURRENT_USER_KEY,// eslint-disable-line
    null
  );
  const reducer = (state, action) => {
    setErrorResponse(null);
    state.errors[action.type] = !action.payload;
    switch (action.type) {
      case 'email':
        return { ...state, email: action.payload };
      case 'password':
        return { ...state, password: action.payload };
      default:
        return initialState;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [showRecoverModal, setShowRecoverModal] = useState(false);
  const [showRecoverOkModal, setShowRecoverOkModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const isValid = () => {
    return (
      Object.values(state).some(item => item === '') ||
      !constants.EMAIL_PATTERN.test(state.email) ||
      state.password.length < 6
    );
  };
  const showErrorModal = async () => {
    await setShowError(true);
    window.$('#errorModal').modal('show');
  };
  const hideErrorModal = () => {
    setShowError(false);
    window.$('#errorModal').modal('hide');
    window.$('.modal-backdrop').remove();
    window.$('body').removeClass('modal-open');
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    const user = { email: state.email, password: state.password };
    try {
      const data = await authService.authenticate(user);
      if (data) {
        const newData = {
          id: data.id,
          name: data.name,
          role: data.role,
          roleDescription: data.roleDescription
        };
        setCurrentUser(newData);
        setCurrentToken(data.jwt);
        setLoading(false);
      } else {
        setLoading(false);
        setErrorResponse(t('Errors.errorLogin'));
      }
      
    } catch (error) {
      setLoading(false);
      if(error.response.status === 401) setErrorResponse(t('Errors.errorLogin'));
      else showErrorModal();
    }
  };

  const onRecover = async email => {
    setShowRecoverModal(false);
    try {
      const response = await authService.recover({ email });
      response === 200 && showRecoverPassOkModal();
    } catch (error) {
      showErrorModal();
    }
  };

  const showRecoverPassModal = async () => {
    await setShowRecoverModal(true);
    window.$('#inputModal').modal('show');
  };

  const hideRecoverPassModal = () => {
    setShowRecoverModal(false);
    window.$('#inputModal').modal('hide');
    window.$('.modal-backdrop').remove();
    window.$('body').removeClass('modal-open');
  };

  const showRecoverPassOkModal = async () => {
    await setShowRecoverOkModal(true);
    window.$('#simpleModal').modal('show');
  };

  const hideRecoverPassOkModal = () => {
    setShowRecoverOkModal(false);
    window.$('#simpleModal').modal('hide');
    window.$('.modal-backdrop').remove();
    window.$('body').removeClass('modal-open');
  };

  if (currentToken) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div
      className={`${
        DisplayUtils.isMobile() ? 'mobile' : 'row m-0'
      } h-100 login-container`}
    >
      {showError && <ModalError hideErrorModal={hideErrorModal} />}
      {showRecoverModal && (
        <ModalInput
          title={t('RememberPassModal.title')}
          description={t('RememberPassModal.description')}
          mainBtnText={t('Globals.send')}
          mainAction={onRecover}
          closeModal={hideRecoverPassModal}
        />
      )}
      {showRecoverOkModal && (
        <ModalSimple
          title={t('RememberPassOkModal.title')}
          description={t('RememberPassOkModal.description')}
          mainBtnText={t('Globals.ok')}
          mainAction={hideRecoverPassOkModal}
          closeModal={hideRecoverPassOkModal}
        />
      )}

      <div
        className={`${
          DisplayUtils.isMobile()
            ? 'mobile'
            : 'col-12 desktop '
        } login-form d-flex align-items-center`}
      >
        {loading ? (
          <div
            style={
              DisplayUtils.isMobile() ? { height: '600px' } : { width: '100%' }
            }
          >
            <Loading white={true} />
          </div>
        ) : (
          <FormLogin
            state={state}
            dispatch={dispatch}
            errorResponse={errorResponse}
            handleSubmit={handleSubmit}
            showRecoverPassModal={showRecoverPassModal}
            isValid={isValid}
          />
        )}
      </div>
    </div>
  );
};

export default withRouter(Login);
