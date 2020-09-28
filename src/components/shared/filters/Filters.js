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
import './Filters.css';

const Filters = ({
  handleChange,
  districts,
  listDistricts,
  selectedDateInit,
  handleDateChange,
  btnSelected,
  selectedDateEnd,
  handleBtnChange,
  showAge,
  ageValues,
  onChangeAgeValues
}) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
    <div className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} row m-0 justify-content-center filters-container`}>
      <div className="row box-filters select-component  m-0">
        <div className="row m-0 w-100 row-filters-select">
          <div
            className={`${
              DisplayUtils.isMobile() ? 'mobile' : 'desktop'
            } col-sm-4 d-flex justify-content-start p-0`}
          >
            <SelectUi
              label="Comunidad autónoma"
              handleChange={handleChange}
              val={constants.STATE_MADRID[0].name}
              initSelect={constants.STATE_MADRID[0].name}
              listItems={constants.STATE_MADRID}
            />
          </div>
          <div
            className={`${
              DisplayUtils.isMobile()
                ? 'justify-content-start'
                : 'justify-content-center'
            } col-sm-4 d-flex  p-0`}
          >
            <SelectUi
              label="Provincia"
              handleChange={handleChange}
              val={constants.PROVINCE_MADRID[0].name}
              initSelect={constants.PROVINCE_MADRID[0].name}
              listItems={constants.PROVINCE_MADRID}
            />
          </div>
          <div
            className={`${
              DisplayUtils.isMobile()
                ? 'justify-content-start p-0'
                : 'justify-content-end pr-0'
            } col-sm-4 d-flex  `}
          >
            <SelectUi
              label="Municipio"
              handleChange={handleChange}
              val={districts}
              initSelect="Todos los municipios"
              listItems={listDistricts}
            />
          </div>
        </div>

        <div className="filter-date row m-0 w-100">
          <div className={`${DisplayUtils.isMobile() ? 'col-12' : 'col-5'} filter-date-calendar p-0 d-flex`}>
            <div className="date mr-3">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-init"
                label="Desde"
                format="dd/MM/yyyy"
                value={selectedDateInit}
                onChange={e => handleDateChange(e, 'init')}
                disableFuture={true}
                maxDate={selectedDateEnd}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </div>
            <div className="date">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-end"
                label="Hasta"
                format="dd/MM/yyyy"
                value={selectedDateEnd}
                disableFuture={true}
                minDate={selectedDateInit}
                onChange={e => handleDateChange(e, 'end')}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </div>
          </div>
          <div className={`${DisplayUtils.isMobile() ? 'col-12 flex-wrap align-items-start' : 'col-7 align-items-end justify-content-end'} filter-date-btns p-0 d-flex mb-2`}>
              <button data-val="week" className={`${DisplayUtils.isMobile() ? 'mobile mt-2' : 'desktop'} ${btnSelected === 'week' ? 'bg-red selected' : 'bg-grey'} btn-modal white`} onClick={() => handleBtnChange('week')}>
                1 semana
              </button>
              <button data-val="month" className={`${DisplayUtils.isMobile() ? 'mobile mt-2' : 'desktop'} ${btnSelected === 'month' ? 'bg-red selected' : 'bg-grey'} btn-modal white`}onClick={() => handleBtnChange('month')}>
                1 mes
              </button>
              <button data-val="threeMonth" className={`${DisplayUtils.isMobile() ? 'mobile mt-2' : 'desktop'} btn-modal ${btnSelected === 'threeMonth' ? 'bg-red selected' : 'bg-grey'} white`}onClick={() => handleBtnChange('threeMonth')}>
                3 meses
              </button>
              <button data-val="total" className={`${DisplayUtils.isMobile() ? 'mobile mt-2' : 'desktop'} btn-modal ${btnSelected === 'total' ? 'bg-red selected' : 'bg-grey'} white`}onClick={() => handleBtnChange('total')}>
                total
              </button>
          </div>
        </div>
      
        {showAge && (
          <div className={`${DisplayUtils.isMobile() ? 'mobile w-100' : 'desktop'} filter-age row m-0`}>
            <span className="col-12 p-0 pt-1 title-label">Edades</span>
            <SliderRange ageValues={ageValues} onChangeAgeValues={onChangeAgeValues}/>
          </div>
        )}
      </div>
    </div>
  </MuiPickersUtilsProvider>
);

export default Filters;
