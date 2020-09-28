import React, { useEffect, useRef, useState, useReducer } from 'react';
import { FiltersBar, NotificationsFilters, ModalDouble, ModalError, Loading, ModalSimple } from '../../../index';
import DisplayUtils from '../../../../utils/DisplayUtils';
import DateUtils from '../../../../utils/DateUtils';
import { adminService, filtersService } from '../../../../services';
import constants from '../../../../utils/constants';
import './Notifications.css'

const initialState = {
    formTitle: "",
    formMessage: "",
    errors: {}
}
  
const reducer = (state, action) => {
    state.errors[action.type] = !action.payload
    switch (action.type) {
        case "formTitle":
            return { ...state, formTitle: action.payload }
        case "formMessage":
            return { ...state, formMessage: action.payload }
        default:
            return initialState
    }
}

const Notifications = () => {

    const mountedRef = useRef(false);
    const [pushInfo, setPushInfo] = useState(0)
    const [districts, setDistricts] = useState(["Todos los municipios"]);
    const [listDistricts, setListDistricts] = useState(null);
    const [genders, setGenders] = useState(null);
    const [listGenders] = useState(constants.GENDERS);
    const [symptoms, setSymptoms] = useState(["Ninguna"]);
    const [listSymptoms] = useState(constants.SYMTOMPS_FILTER);
    const [states] = useState([constants.STATE_MADRID[0].id]);
    const [provinces] = useState([constants.PROVINCE_MADRID[0].id]);
    const actuallyDate = new Date();
    const initDate = DateUtils.stringToDate('2020-01-01');
    const [selectedDateEnd, setSelectedDateEnd] = useState(actuallyDate);
    const [selectedDateInit, setSelectedDateInit] = useState(initDate);
    const [ageValues, setAgeValues] = useState([0, 100]);
    const [formState, formDispatch] = useReducer(reducer, initialState);
    const [sendModal, setSendModal] = useState(false);
    const [sendOkModal, setSendOkModal] = useState(false);
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const data = {
        state: states[0],
        province: provinces[0]
    };

    useEffect(() => {
        mountedRef.current = true;
        const getDistricts = async () => {
          try {
            const response = await filtersService.getDistricts(data);
            mountedRef.current && setListDistricts(response);
          } catch (error) {
            //showErrorModal();
          }
        };
        getDistricts();
        return() => {
            mountedRef.current = false;
        }
    }, []); // eslint-disable-line

    useEffect(() => {
        mountedRef.current = true;
        const getData = async () => {
            const options = {
                states: states,
                municipalitys: provinces,
                suburbs: districts.filter(item => item !== "Todos los municipios"),
                startDate: DateUtils.getEpochDate(
                    DateUtils.dateToString(selectedDateInit)
                ),
                endDate: DateUtils.setEndDay(DateUtils.dateToString(selectedDateEnd)),
                ageStart: ageValues[0] === 0 ? null : ageValues[0],
                ageEnd: ageValues[1] === 100 ? null : ageValues[1],
                gender: genders,
                conditions: checkSymptoms("conditions") ? 1 : null,
                breathing: checkSymptoms("breathing") ? 1 : null,
                fever: checkSymptoms("fever") ? 1 : null,
                cough: checkSymptoms("cough") ? 1 : null,
                meet: checkSymptoms("meet") ? 1 : null,
                snot: checkSymptoms("snot") ? 1 : null,
                pain: checkSymptoms("pain") ? 1 : null,
                gastrointestinal: checkSymptoms("gastrointestinal") ? 1 : null,
                lossSmellTaste: checkSymptoms("lossSmellTaste") ? 1 : null
            }
            try {
                const response = await adminService.getPushData(options);
                mountedRef.current && setPushInfo(response.data.profiles);
            } catch (error) {}
        };
        getData();
        return() => {
            mountedRef.current = false;
        }
    }, [districts, selectedDateInit, selectedDateEnd, ageValues, genders, symptoms]) // eslint-disable-line

    const checkSymptoms = (symptom) => {
        return symptoms.filter(item => item === symptom).length > 0
    }

    const handleChange = (event, label) => {
        const { value } = event.target;
        switch (label) {
            case 'Municipio':
                if(value[value.length-1] === "Todos los municipios") setDistricts(["Todos los municipios"])
                else if(value.length === 0) setDistricts(["Todos los municipios"])
                else setDistricts(value.filter(item => item !== "Todos los municipios"));
                break;
            case 'Géneros':
                if(value === "Todos") setGenders(null)
                else setGenders(value)
                break;
            case 'Sintomatologías':
                if(value[value.length-1] === "Ninguna") setSymptoms(["Ninguna"])
                else if(value.length === 0) setSymptoms(["Ninguna"])
                else setSymptoms(value.filter(item => item !== "Ninguna"));
                break;
            default:
                break;
        }
    };

    const handleDateChange = (date, label) => {
        switch (label) {
          case 'init':
            setSelectedDateInit(date);
            break;
          case 'end':
            setSelectedDateEnd(date);
            break;
          default:
            break;
        }
    };

    const onChangeAgeValues = (event, newValue) => {
        setAgeValues(newValue);
    };

    const onSendNotification = async () => {
        showSendModal()
    }

    const sendPushNotification = async () => {
        hideSendModal()
        setLoading(true);
        const options = {
            states: states,
            municipalitys: provinces,
            suburbs: districts.filter(item => item !== "Todos los municipios"),
            startDate: DateUtils.getEpochDate(
                DateUtils.dateToString(selectedDateInit)
            ),
            endDate: DateUtils.setEndDay(DateUtils.dateToString(selectedDateEnd)),
            ageStart: ageValues[0] === 0 ? null : ageValues[0],
            ageEnd: ageValues[1] === 100 ? null : ageValues[1],
            gender: genders,
            conditions: checkSymptoms("conditions") ? 1 : null,
            breathing: checkSymptoms("breathing") ? 1 : null,
            fever: checkSymptoms("fever") ? 1 : null,
            cough: checkSymptoms("cough") ? 1 : null,
            meet: checkSymptoms("meet") ? 1 : null,
            snot: checkSymptoms("snot") ? 1 : null,
            pain: checkSymptoms("pain") ? 1 : null,
            gastrointestinal: checkSymptoms("gastrointestinal") ? 1 : null,
            lossSmellTaste: checkSymptoms("lossSmellTaste") ? 1 : null,
            title: formState.formTitle,
            message: formState.formMessage
        }

        try {
            const response = await adminService.sendPushNot(options);
            if(response.status === 200) {
                setLoading(false);
                showSendOkModal();
                formDispatch({ type: "initialState" })
            } else {
                setLoading(false);
                showErrorModal();
            }
        } catch (error) {
            setLoading(false);
            showErrorModal();
        }
    }

    const showSendModal = async (id) => {
        await setSendModal(true);
        window.$('#doubleModal').modal('show');
    };
    
    const hideSendModal = async () => {
        await setSendModal(false);
        window.$('#doubleModal').modal('hide');
        window.$('.modal-backdrop').remove();
        window.$('body').removeClass('modal-open');
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

    const showSendOkModal = async () => {
        await setSendOkModal(true);
        window.$('#simpleModal').modal('show');
      };
    
      const hideSendOkModal = () => {
        setSendOkModal(false);
        window.$('#simpleModal').modal('hide');
        window.$('.modal-backdrop').remove();
        window.$('body').removeClass('modal-open');
      };

    return (
        <div className="h-100 w-100">
            {showError && <ModalError hideErrorModal={hideErrorModal} />}
            {sendModal && (
                <ModalDouble
                    title={`¿Estás seguro?`}
                    description={`La notificación se mandará a ${pushInfo} perfiles`}
                    mainBtnText="Si"
                    secondaryBtnText="No"
                    mainAction={sendPushNotification}
                    secondaryAction={hideSendModal}
                    closeModal={hideSendModal}
                />
            )}
            {sendOkModal && (
                <ModalSimple
                    title="Notificación enviada"
                    description={`La notificación se ha enviado a ${pushInfo} perfiles`}
                    mainBtnText="Aceptar"
                    mainAction={hideSendOkModal}
                    closeModal={hideSendOkModal}
                />
            )}
            <FiltersBar title="Notificaciones"/>
            {loading ? (
                <div style={DisplayUtils.isMobile() ? { height: '600px' } : { width: '100%', height: '80%' }}>
                    <Loading white={true} />
                </div>
                ) : (
                    <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? "mobile" : "desktop"} notifications-container`}>
                        <NotificationsFilters 
                            handleChange={handleChange}
                            districts={districts}
                            listDistricts={listDistricts}
                            genders={genders}
                            listGenders={listGenders}
                            symptoms={symptoms}
                            listSymptoms={listSymptoms}
                            selectedDateInit={selectedDateInit}
                            handleDateChange={handleDateChange}
                            selectedDateEnd={selectedDateEnd}
                            ageValues={ageValues}
                            onChangeAgeValues={onChangeAgeValues}
                            formState={formState}
                            formDispatch={formDispatch}
                            onSendNotification={onSendNotification}
                            pushInfo={pushInfo}
                        />
                    </div>
                )}
        </div>   
    )
}

export default Notifications;