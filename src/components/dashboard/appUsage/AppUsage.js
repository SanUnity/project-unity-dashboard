import React, { useEffect, useState, useCallback } from 'react';
import { ModalError, MapTest, InfoUsersCard, RangeTest, FiltersBar } from '../../index';
import { filtersService, statsService } from '../../../services';
import constants from '../../../utils/constants';
import DateUtils from '../../../utils/DateUtils';
import DisplayUtils from '../../../utils/DisplayUtils';
import mapUtils from '../../../utils/mapUtils';
import './AppUsage.css';

const AppUsage = () => {
  const actuallyDate = new Date();
  const initDate = DateUtils.stringToDate('2020-01-01');

  const [selectedDateEnd, setSelectedDateEnd] = useState(actuallyDate);
  const [selectedDateInit, setSelectedDateInit] = useState(initDate);
  const [districts, setDistricts] = useState(null);
  const [showError, setShowError] = useState(false);
  const [mapData, setMapData] = useState(null);
  const [indicators, setIndicators] = useState(null);
  const [dataAge, setDataAge] = useState([]);
  const [ageValues, setAgeValues] = useState([0, 100]);
  const [selectedAgeRadio, setSelectedAgeRadio] = useState('total');
  const [dataGender, setDataGender] = useState(null);

  useEffect(() => {
    const options = {
      startDate: DateUtils.getEpochDate(
        DateUtils.dateToString(selectedDateInit)
      ),
      endDate: DateUtils.setEndDay(DateUtils.dateToString(selectedDateEnd)),
      stateID: constants.STATE_MADRID[0].id,
      municipalityID: constants.PROVINCE_MADRID[0].id
    };
    const getRegistersData = async () => {
      try {
        const response = await filtersService.getRegistersTimeline(options);
        setMapData(response);
      } catch (error) {
        showErrorModal();
      }
    };
    getRegistersData();
  }, [districts, selectedDateInit, selectedDateEnd]);

  useEffect(() => {
    const options = {
      startDate: DateUtils.getEpochDate(
        DateUtils.dateToString(selectedDateInit)
      ),
      endDate: DateUtils.setEndDay(DateUtils.dateToString(selectedDateEnd)),
      stateID: constants.STATE_MADRID[0].id,
      municipalityID: constants.PROVINCE_MADRID[0].id,
      suburbID: districts === 'Todos los municipios' ? null : districts
    };
    const getIndicators = async () => {
        try {
            const response = await statsService.getIndicators(options);
            setIndicators(response);
        } catch (error) {}
    };
    getIndicators();
}, [districts, selectedDateInit, selectedDateEnd]); // eslint-disable-line

useEffect(() => {
  const options = {
    startDate: DateUtils.getEpochDate(
      DateUtils.dateToString(selectedDateInit)
    ),
    endDate: DateUtils.setEndDay(DateUtils.dateToString(selectedDateEnd)),
    stateID: constants.STATE_MADRID[0].id,
    municipalityID: constants.PROVINCE_MADRID[0].id,
    suburbID: districts === 'Todos los municipios' ? null : districts
  };
  const getData = async () => {
    try {
      const ageResponse = await filtersService.getDataAge(options);
      setDataAge(ageResponse);
    } catch (error) {
      showErrorModal();
    }
  };
  getData();
}, [districts, selectedDateInit, selectedDateEnd])

useEffect(() => {
  const options = {
    startDate: DateUtils.getEpochDate(
      DateUtils.dateToString(selectedDateInit)
    ),
    endDate: DateUtils.setEndDay(DateUtils.dateToString(selectedDateEnd)),
    stateID: constants.STATE_MADRID[0].id,
    municipalityID: constants.PROVINCE_MADRID[0].id,
    suburbID: districts === 'Todos los municipios' ? null : districts,
    minAge: ageValues[0] === "0" ? null : ageValues[0],
    maxAge: ageValues[1] === "100" ? null : ageValues[1]
  };
  const getGenderData = async () => {
    try {
      const response = await filtersService.getDataGender(options);
      setDataGender(response);
    } catch (error) {
      showErrorModal();
    }
  };
  getGenderData();
}, [districts, selectedDateInit, selectedDateEnd, ageValues]);

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

  const handleAgeSelect = useCallback(item => {
    setSelectedAgeRadio(item);
    if (item === 'total') {
      setAgeValues([0, 100]);
    } else {
      const newValues = item.split('-').map((num, index) => {
        if (index === 0 && num === '*') num = 0;
        if (index === 1 && num === '*') num = 100;
        if (index === 0) return Number(num).toString();
        if (num === 100) return Number(num).toString();
        return Number(num - 1).toString();
      });
      setAgeValues(newValues);
    }
  }, []);

  const onChangeAgeValues = (event, newValue) => {
    setAgeValues(newValue);
    setSelectedAgeRadio(false);
  };

  return (
    <div>
      <FiltersBar 
        title="Uso de la App" 
        showFilters setDistrictsResult={setDistricts} 
        setSelectedDateInitResult={setSelectedDateInit} 
        setSelectedDateEndResult={setSelectedDateEnd}
        showErrorModal={showErrorModal}
      />
      <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'mobile' : 'desktop'} app-usage-container`}>
        {showError && <ModalError hideErrorModal={hideErrorModal} />}
        <InfoUsersCard 
          totalUsers={indicators && indicators.totalUsers ? indicators.totalUsers : 0}
          usersMultiplesProfiles={indicators && indicators.usersMultiplesProfiles ? indicators.usersMultiplesProfiles : 0}
          avgProfiles={indicators && indicators.avgProfiles ? indicators.avgProfiles : 0}
          totalProfiles={indicators && indicators.totalProfiles ? indicators.totalProfiles : 0}
        />
        <RangeTest
          dataAge={dataAge}
          ageValues={ageValues}
          onChangeAgeValues={onChangeAgeValues}
          handleAgeSelect={handleAgeSelect}
          selectedAgeRadio={selectedAgeRadio}
          dataGender={dataGender}
          initDate={DateUtils.dateToCustomString(selectedDateInit)}
          endDate={DateUtils.dateToCustomString(selectedDateEnd)}
        />
        {mapData && (
          <MapTest
          mapData={mapData}
          initDate={DateUtils.dateToCustomString(selectedDateInit)}
          endDate={DateUtils.dateToCustomString(selectedDateEnd)}
          grades={mapUtils.GRADES_REGISTER} 
          getColor={mapUtils.GET_COLOR_REGISTER}
          colorGrades={mapUtils.COLOR_REGISTERS_GRADES}
          info={'registros'}
        />
        )}
      </div>
    </div>
  );
};

export default AppUsage;
