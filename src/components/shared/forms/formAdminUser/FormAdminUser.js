import React, { useReducer, useState, useEffect } from 'react'
import DisplayUtils from '../../../../utils/DisplayUtils';
import constants from '../../../../utils/constants';
import { useTranslation } from 'react-i18next';
import { SelectUi, Loading, ModalSimple } from '../../../index';
import { adminService } from '../../../../services/index';
import './FormAdminUser.css'

const initialState = {
    formName: '',
    formRole: 2,
    formEmail: '',
    errors: {},
};

const reducer = (state, action) => {
    state.errors[action.type] = !action.payload;
    switch (action.type) {
        case 'formName':
            return { ...state, formName: action.payload };
        case 'formRole':
            return { ...state, formRole: action.payload };
        case 'formEmail':
            return { ...state, formEmail: action.payload };
        default:
            return initialState;
    }
};

const FormAdminUser = ({ user, setAddEditUser, reloadData }) => {

    const { t } = useTranslation();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [okModal, setOkModal] = useState(false);

    useEffect(() => {
        const fillData = user => {
            dispatch({ type: "formName", payload: user.name ? user.name : "" })
            dispatch({ type: "formRole", payload: user.role ? user.role : "" })
            dispatch({ type: "formEmail", payload: user.email ? user.email : "" })
        }
        user && fillData(user);
    }, []) // eslint-disable-line

    const isValid = () => {
        return (
            Object.values(state).some(item => item === '') ||
            !constants.EMAIL_PATTERN.test(state.formEmail)
        );
    };

    const handleSubmit = event => {
        const newUser = {
            name: state.formName,
            role: state.formRole,
            email: state.formEmail
        };
        event.preventDefault();
        user ? callToUpdate(newUser) : callToCreate(newUser)
    };

    const callToCreate = async newUser => {
        setLoading(true);
        try {
            const data = await adminService.inviteUser(newUser); // eslint-disable-line
            dispatch({ type: 'initialState' });
            setLoading(false);
            showOkModal();
        } catch (error) {
            setLoading(false);
            showErrorModal();
        }
    }

    const callToUpdate = async newUser => {
        setLoading(true);
        try {
            const data = await adminService.updateUser(user.id, newUser); // eslint-disable-line
            dispatch({ type: 'initialState' });
            setLoading(false);
            showOkModal();
        } catch (error) {
            setLoading(false);
            showErrorModal();
        }
    }

    const handleChange = (event) => {
        const { value } = event.target;
        dispatch({ type: "formRole", payload: value })
    };

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

    const addEditOk = () => {
        hideOkModal()
        reloadData()
    }

    return(
        <div className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} user-admin-form-container`}>
            {loading ? (
                <div style={DisplayUtils.isMobile() ? { height: '600px' } : { width: '100%', height: '100%' }}>
                    <Loading white={true} />
                </div>
            ) : (
                <div className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'}`}>
                    <button className={`${DisplayUtils.isMobile() ? 'mobile mb-2' : 'desktop m-3'} row m-0 btn-transparent back-btn d-flex align-items-start`} onClick={() => setAddEditUser(null)}>
                        <img src='/misc/icons/arrow_back_black.svg' alt="back-icon" className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} icon-back`}/>
                        <span className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} black align-middle back-text`}>
                            {t('Globals.back').toUpperCase()}
                        </span>
                    </button>
                    <div className="user-admin-form-content">
                        <div className={`${DisplayUtils.isMobile() ? 'mobile p-3' : 'desktop p-5'} row m-0 user-admin-form`}>
                            <div className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} col-12 p-0`}>
                                <span className="input-title">Nombre</span>
                                <input
                                    name="formName"
                                    value={state.formName}
                                    type="text"
                                    placeholder="Nombre"
                                    className={`${state.errors.formName && 'is-invalid'} form-control w-100`}
                                    onBlur={e => dispatch({ type: e.target.name, payload: e.target.value })}
                                    onChange={e => dispatch({ type: e.target.name, payload: e.target.value })}
                                    autoComplete="off"
                                />
                                {state.errors.formName && (<span className="red">{t('Errors.empty')}</span>)}
                            </div>
                            <div className={`${DisplayUtils.isMobile() ? 'mobile mt-2' : 'desktop mt-3'} col-12 p-0`}>
                                <span className="input-title d-block">Rol</span>
                                <SelectUi
                                    handleChange={(e) => handleChange(e)}
                                    val={state.formRole}
                                    listItems={constants.USER_ROLES}
                                />
                            </div>
                            <div className={`${DisplayUtils.isMobile() ? 'mobile mt-2' : 'desktop mt-3'} col-12 p-0`}>
                                <span className="input-title">Correo electrónico</span>
                                <input
                                    name="formEmail"
                                    value={state.formEmail}
                                    type="text"
                                    placeholder="Correo electrónico"
                                    className={`${state.errors.formEmail && 'is-invalid'} ${state.formEmail && !constants.EMAIL_PATTERN.test(state.formEmail) && 'is-invalid'} form-control w-100`}
                                    onBlur={e => dispatch({ type: e.target.name, payload: e.target.value })}
                                    onChange={e => dispatch({ type: e.target.name, payload: e.target.value })}
                                    autoComplete="off"
                                />
                                {state.errors.formEmail ? (
                                    <span className="red">{t('Errors.empty')}</span>
                                ) : state.formEmail && !constants.EMAIL_PATTERN.test(state.formEmail) && (
                                    <span className="red">{t('Errors.notValid')}</span>
                                )}
                            </div>
                        </div>
                        <button 
                            onClick={e => handleSubmit(e)}
                            disabled={isValid()}
                            className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop ml-auto'} white bg-main-covid user-admin-button btn-transparent align-items-center d-flex justify-content-center`}>
                            <span>{t('Globals.save')}</span>
                        </button>
                    </div>
                    {errorModal && (
                        <ModalSimple
                            title={user ? "Editar usuario" : "Añadir usuario"}
                            description={user ? "Error al editar el usuario. Por favor, inténtelo de nuevo más tarde." : "Error al añadir el usuario. Por favor, inténtelo de nuevo más tarde."}
                            mainBtnText={t('Globals.ok')}
                            mainAction={hideErrorModal}
                            closeModal={hideErrorModal}
                        />
                    )}
                    {okModal && (
                        <ModalSimple
                            title={user ? "Editar usuario" : "Añadir usuario"}
                            description={user ? "Usuario editado correctamente." : "Usuario creado correctamente. El usuario recibirá un correo electrónico para crear su contraseña."}
                            mainBtnText={t('Globals.ok')}
                            mainAction={addEditOk}
                            closeModal={hideOkModal}
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default FormAdminUser;