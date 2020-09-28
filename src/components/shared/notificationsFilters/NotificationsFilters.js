import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { SelectUi, SliderRange } from '../../index';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { es } from 'date-fns/locale';
import DisplayUtils from '../../../utils/DisplayUtils';
import constants from '../../../utils/constants';
import './NotificationsFilters.css';

const NotificationsFilters = ({
  handleChange,
  districts,
  listDistricts,
  genders,
  listGenders,
  symptoms,
  listSymptoms,
  selectedDateInit,
  handleDateChange,
  selectedDateEnd,
  ageValues,
  onChangeAgeValues,
  formState,
  formDispatch,
  onSendNotification,
  pushInfo
}) => {

  const isValid = () => {
    return !Object.values(formState).some(item => item === "")
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
      <div className="row m-0 justify-content-center notifications-filters-container">
        <div className="row box-filters select-component w-100 m-0">
          <span className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'mobile' : 'desktop'} mb-4 d-block data-title`}>Enviar notificación push (para {pushInfo} perfiles)</span>
          <div className="row m-0 w-100">
            <div className={`${DisplayUtils.isMobile() ? 'col-12 p-0 justify-content-center' : 'col-4 justify-content-start pl-0'} d-flex`}>
              <SelectUi
                label="Comunidad autónoma"
                handleChange={handleChange}
                val={[constants.STATE_MADRID[0].name]}
                initSelect={constants.STATE_MADRID[0].name}
                listItems={constants.STATE_MADRID}
                multiple
              />
            </div>
            <div className={`${DisplayUtils.isMobile() ? 'col-12 p-0 justify-content-center' : 'col-4 justify-content-center'} d-flex`}>
              <SelectUi
                label="Provincia"
                handleChange={handleChange}
                val={[constants.PROVINCE_MADRID[0].name]}
                initSelect={constants.PROVINCE_MADRID[0].name}
                listItems={constants.PROVINCE_MADRID}
                multiple
              />
            </div>
            <div className={`${DisplayUtils.isMobile() ? 'col-12 p-0 justify-content-center' : 'col-4 justify-content-end pr-0'} d-flex`}>
              <SelectUi
                label="Municipio"
                handleChange={handleChange}
                val={districts}
                initSelect="Todos los municipios"
                listItems={listDistricts}
                multiple
              />
            </div>
          </div>
          <div className="filter-date row m-0 w-100">
            <div className={`${DisplayUtils.isMobile() ? 'col-12' : 'col-6'} filter-date-calendar p-0 d-flex`}>
              <div className="row m-0 w-100">
                <div className={`${DisplayUtils.isMobile() ? 'col-6 justify-content-end' : 'col-6 justify-content-start'} pl-0 date d-flex`}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-init"
                    label="Desde"
                    format="dd/MM/yyyy"
                    value={selectedDateInit}
                    onChange={e => handleDateChange(e, 'init')}
                    disableFuture={true}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </div>
                <div className={`${DisplayUtils.isMobile() ? 'col-6 pr-0' : 'col-6'} date justify-content-start col-6 d-flex`}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-end"
                    label="Hasta"
                    format="dd/MM/yyyy"
                    value={selectedDateEnd}
                    disableFuture={true}
                    onChange={e => handleDateChange(e, 'end')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </div>
              </div>
            </div>
            <div className={`${DisplayUtils.isMobile() ? 'col-12' : 'col-6'} p-0 d-flex`}>
              <div className="row m-0 w-100">
                <div className={`${DisplayUtils.isMobile() ? 'col-12 p-0 justify-content-center' : 'col-6 justify-content-end'} date d-flex pt-3`}>
                  <SelectUi
                    label="Géneros"
                    handleChange={handleChange}
                    val={genders}
                    initSelect="Todos"
                    listItems={listGenders}
                  />
                </div>
                <div className={`${DisplayUtils.isMobile() ? 'col-12 p-0 justify-content-center' : 'col-6 justify-content-end pr-0 pt-3'} date d-flex`}>
                  <SelectUi
                    label="Sintomatologías"
                    handleChange={handleChange}
                    val={symptoms}
                    initSelect="Ninguna"
                    listItems={listSymptoms}
                    multiple
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={`${DisplayUtils.isMobile() ? 'mobile w-100' : 'desktop'} filter-age row m-0`}>
            <span className="col-12 p-0 pt-1 title-label">Edades</span>
            <SliderRange ageValues={ageValues} onChangeAgeValues={onChangeAgeValues}/>
          </div>
          <div className="row m-0 w-100 message-content">
            <div className={`${!DisplayUtils.isMobile() ? "col-6 pr-2" : "col-12"} contactus-name p-0`}>
                <input
                    name="formTitle"
                    value={formState.formTitle}
                    type="text"
                    placeholder="Título notificación"
                    className={`${formState.errors.formTitle && "is-invalid"} w-100`}
                    onBlur={e => formDispatch({ type: e.target.name, payload: e.target.value })}
                    onChange={e => formDispatch({ type: e.target.name, payload: e.target.value })} 
                  />
                {formState.errors.formTitle && <span className="red">Campo obligatorio</span>}
            </div>
            <div className="col-12 p-0">
              <textarea
                  name="formMessage"
                  value={formState.formMessage}
                  placeholder="Mensaje..."
                  className={`${formState.errors.formMessage && "is-invalid"} w-100`}
                  onBlur={e => formDispatch({ type: e.target.name, payload: e.target.value })}
                  onChange={e => formDispatch({ type: e.target.name, payload: e.target.value })} 
              />
              {formState.errors.formMessage && <span className="red">Campo obligatorio</span>}
            </div>
          </div>
          <button 
            onClick={() => onSendNotification()}
            disabled={!isValid()} 
            className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'mobile' : 'desktop'} send-btn bg-main-covid white btn-transparent d-flex align-items-center justify-content-center`}>
            <span>ENVIAR NOTIFICACIÓN</span>
          </button>
        </div>
      </div>
    </MuiPickersUtilsProvider>
  )
};

export default NotificationsFilters;
