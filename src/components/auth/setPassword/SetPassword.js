import React, { useEffect, useReducer, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { adminService } from '../../../services/index';
import './SetPassword.css';
import { ModalSimple } from '../../index';
import DisplayUtils from '../../../utils/DisplayUtils';

const initialState = {
  password: '',
  repeatPassword: '',
  errors: {}
};

const SetPassword = ({ history }) => {

    const [showPassErrors, setShowPassErrors] = useState(false)

    const reducer = (state, action) => {
        setShowPassErrors(false)
        state.errors[action.type] = !action.payload;
        switch (action.type) {
          case 'password':
            return { ...state, password: action.payload };
          case 'repeatPassword':
            return { ...state, repeatPassword: action.payload };
          default:
            return initialState;
        }
    };

    const [hash, setHash] = useState(null)
    const [checked, setChecked] = useState(false)
    const [redirectToLogin, setRedirectToLogin] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialState);
    const [passwordErrors, setPasswordErrors] = useState([])
    const [okModal, setOkModal] = useState(false)
    const [errorModal, setErrorModal] = useState(false)

    useEffect(() => {
        const checkHash = async () => {
            let lastSegment = await history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1)
            if(!lastSegment || lastSegment === "password") {
                setHash(null)
            } else {
                setHash(lastSegment)
            }
            setChecked(true)
        }
        checkHash();
    }, []); // eslint-disable-line

    if((!hash && checked) || redirectToLogin) {
        return <Redirect to="/" />
    }

    const isValid = () => {
        return (
          Object.values(state).some(item => item === '') ||
          state.password !== state.repeatPassword
        );
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const dataPass = {
            hash: hash,
            password: state.repeatPassword
        };
        try {
            const data = await adminService.setUserPassword(dataPass);
            if(data.status === 200) {
                showOkModal()
            } else if(data.response.status === 400) {
                setPasswordErrors(data.response.data.password)
                setShowPassErrors(true)
            } else {
                showErrorModal()
            }
        } catch (error) {
            showErrorModal()
        }
    };

    const redirect = () => {
        hideOkModal()
        hideErrorModal()
        setRedirectToLogin(true);
    }

    const showOkModal = async () => {
        await setOkModal(true);
        window.$('#simpleModal').modal('show');
    };

    const hideOkModal = () => {
        setOkModal(false);
        window.$('#simpleModal').modal('hide');
        window.$('.modal-backdrop').remove();
        window.$('body').removeClass('modal-open');
    };

    const showErrorModal = async () => {
        await setErrorModal(true);
        window.$('#simpleModal').modal('show');
    };

    const hideErrorModal = () => {
        setErrorModal(false);
        window.$('#simpleModal').modal('hide');
        window.$('.modal-backdrop').remove();
        window.$('body').removeClass('modal-open');
    };

    return(
        <div className={`${DisplayUtils.isMobile() ? 'mobile' : 'row m-0'} h-100 password-container`}>
            {okModal && (
                <ModalSimple
                    title="Contraseña creada"
                    description="Contraseña creada correctamente, ya puedes acceder con tu cuenta."
                    mainBtnText="Aceptar"
                    mainAction={redirect}
                    closeModal={redirect}
                />
            )}
            {errorModal && (
                <ModalSimple
                    title="Error"
                    description="Error al crear su contraseña. Por favor intente acceder de nuevo desde el enlace proporcionado en su correo electrónico."
                    mainBtnText="Aceptar"
                    mainAction={redirect}
                    closeModal={redirect}
                />
            )}
            <div className={`${DisplayUtils.isMobile() ? 'mobile' : 'col-12 desktop '} password-form d-flex align-items-center`}>
                <div className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} justify-content-center row m-0 box-inputs select-component`}>
                    <div className="col-12 p-0">
                        <span className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} d-block title`}>Introduce tu nueva contraseña</span>
                    </div>
                    <div className={`${DisplayUtils.isMobile() ? 'mt-4 mb-3' : 'mt-5 mb-4'} row inputs-container`}>
                        <div className={`${DisplayUtils.isMobile() ? '' : ''} col-12 p-0 password-input`}>
                            <img alt="mail-icon" src="/misc/icons/key.svg" />
                            <input
                                name="password"
                                value={state.password}
                                type="password"
                                placeholder="Contraseña"
                                className={`${state.errors.password ? 'is-invalid' : ''} ${state.password &&
                                    (state.password !== state.repeatPassword) &&
                                    'is-invalid'} form-control`}
                                onBlur={e => dispatch({ type: e.target.name, payload: e.target.value })}
                                onChange={e => dispatch({ type: e.target.name, payload: e.target.value })}
                            />
                        </div>
                        <div className={`${DisplayUtils.isMobile() ? '' : ''} mt-2 col-12 p-0 repeat-password-input`}>
                            <img alt="pass-icon" src="/misc/icons/key.svg" />
                            <input
                                name="repeatPassword"
                                value={state.repeatPassword}
                                type="password"
                                placeholder="Confirmar contraseña"
                                className={`${state.errors.repeatPassword && 'is-invalid'} ${state.repeatPassword &&
                                    (state.password !== state.repeatPassword) &&
                                    'is-invalid'} form-control`}
                                onBlur={e => dispatch({ type: e.target.name, payload: e.target.value })}
                                onChange={e => dispatch({ type: e.target.name, payload: e.target.value })}
                            />
                        </div>
                        {showPassErrors && passwordErrors.map(error => (
                            <span className="red mb-1 error w-100">{error}</span>
                        ))}
                        {(state.password || state.repeatPassword) && (state.password !== state.repeatPassword) && <span className="red error">Las contraseñas no coinciden</span>}
                    </div>
                    <div className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} row m-0 w-100 password-info-container`}>
                        <ul className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'mobile p-0' : 'desktop'}`}>
                            <li>La contraseña debe tener por lo menos 10 caracteres</li>
                            <li>Debe contener al menos dos letras minúsculas</li>
                            <li>Debe contener al menos dos letras mayúsculas</li>
                            <li>Debe contener al menos dos números</li>
                            <li>Debe contener al menos dos caracteres especiales</li>
                            <li>No usar alguna de tus últimas 6 contraseñas</li>
                        </ul>
                    </div>
                    <div className={`${DisplayUtils.isMobile() ? 'd-flex justify-content-center mobile' : ' d-flex justify-content-center desktop'} row mb-4 mx-0 w-100`}>
                        <button onClick={e => handleSubmit(e)} className="btn btn-password btn-block" disabled={isValid()}>
                        Continuar
                        </button>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default SetPassword