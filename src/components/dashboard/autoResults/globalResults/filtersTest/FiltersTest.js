import React, { useState, useEffect, Fragment, useCallback, useRef } from 'react';
import 'date-fns';

import {
  ChartTest,
  RangeTest,
  ModalError,
  MapTest,
  FiltersBar,
  SintomaticMain,
  Loading
} from '../../../../index';

import { filtersService } from '../../../../../services';

import constants from '../../../../../utils/constants';
import DateUtils from '../../../../../utils/DateUtils';
import DisplayUtils from '../../../../../utils/DisplayUtils';
 import mapUtils from '../../../../../utils/mapUtils';
 import './FiltersTest.css';

const FiltersTest = () => {
  const actuallyDate = new Date();
  const initDate = DateUtils.stringToDate('2020-01-01');

  const [selectedDateEnd, setSelectedDateEnd] = useState(actuallyDate);
  const [selectedDateInit, setSelectedDateInit] = useState(initDate);
  const [districts, setDistricts] = useState(null);
  const [dataTimeline, setTimeLine] = useState(null);
  const [selectedRadio, setSelectedRadio] = useState('Sin síntomas compatibles');
  const [selectedAgeRadio, setSelectedAgeRadio] = useState('total');
  const [dataAge, setDataAge] = useState([]);
  const [ageValues, setAgeValues] = useState([0, 100]);
  const [chartAgeValues, setChartAgeValues] = useState([0, 100]);
  const [dataSeries, setDataSeries] = useState([]);
  const [dataGender, setDataGender] = useState(null);
  const [showError, setShowError] = useState(false);
  const [mapData, setMapData] = useState([]);
  const mountedRef = useRef(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mountedRef.current = true;
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
        const response = await filtersService.getCasesTimeline(options);
        mountedRef.current && response.status === 200 && setMapData(response.data);
      } catch (error) {
        showErrorModal();
      }
    };
    getRegistersData();
    return() => {
      mountedRef.current = false;
    }
  }, [districts, selectedDateInit, selectedDateEnd]);

  useEffect(() => {
    mountedRef.current = true;
    const options = {
      startDate: DateUtils.getEpochDate(
        DateUtils.dateToString(selectedDateInit)
      ),
      endDate: DateUtils.setEndDay(DateUtils.dateToString(selectedDateEnd)),
      stateID: constants.STATE_MADRID[0].id,
      municipalityID: constants.PROVINCE_MADRID[0].id,
      suburbID: districts === 'Todos los municipios' ? null : districts,
      ageStart: chartAgeValues[0] === 0 ? null : chartAgeValues[0],
      ageEnd: chartAgeValues[1] === 100 ? null : chartAgeValues[1]
    };
    const getData = async () => {
      try {
        const response = await filtersService.getDataTimeline(options);
        mountedRef.current && setTimeLine(response);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        showErrorModal();
      }
    };
    getData();
    return() => {
      mountedRef.current = false;
    }
  }, [districts, selectedDateInit, selectedDateEnd, chartAgeValues]);

  useEffect(() => {
    mountedRef.current = true;
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
        mountedRef.current && setDataAge(ageResponse);
      } catch (error) {
        showErrorModal();
      }
    };
    getData();
    return() => {
      mountedRef.current = false;
    }
  }, [districts, selectedDateInit, selectedDateEnd])

  useEffect(() => {
    mountedRef.current = true;
    const options = {
      startDate: DateUtils.getEpochDate(
        DateUtils.dateToString(selectedDateInit)
      ),
      endDate: DateUtils.setEndDay(DateUtils.dateToString(selectedDateEnd)),
      stateID: constants.STATE_MADRID[0].id,
      municipalityID: constants.PROVINCE_MADRID[0].id,
      suburbID: districts === 'Todos los municipios' ? null : districts,
      minAge: chartAgeValues[0] === 0 ? null : chartAgeValues[0],
      maxAge: chartAgeValues[1] === 100 ? null : chartAgeValues[1]
    };
    const getGenderData = async () => {
      try {
        const response = await filtersService.getDataGender(options);
        mountedRef.current && setDataGender(response);
      } catch (error) {
        showErrorModal();
      }
    };
    getGenderData();
    return() => {
      mountedRef.current = false;
    }
  }, [districts, selectedDateInit, selectedDateEnd, chartAgeValues]);

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

  const dataCategories =
    dataTimeline &&
    dataTimeline.items &&
    dataTimeline.items.map(item => {
      const format = new Date(item.date);
      return DateUtils.getShortDate(format);
    });
  const dataInputs = [
    {
      name: 'Sin síntomas compatibles',
      data: dataTimeline && dataTimeline['level-0'],
      color: '#7C6EF0'
    },
    {
      name: 'Con síntomas compatibles',
      data: dataTimeline && dataTimeline['level-1'],
      color: '#FFA551'
    },
    {
      name: 'Total',
      data: dataTimeline && dataTimeline.total,
      color: '#EA5455'
    }
  ];

  
   const newData = mapData && mapData.map(data => {
      return{
        ...data,
        level0: data.level['level-0'],
        level1: data.level['level-1'],
        total: data.level.total
  
      }
    })


  const getAllSeries = useCallback(
    () => {
      const withoutData = dataTimeline && dataTimeline.items.map(item => item.level['level-0']);
      const withData = dataTimeline && dataTimeline.items.map(item => item.level['level-1']);
      const totalData = dataTimeline && dataTimeline.items.map(item => item.level['total']);
      setDataSeries([
        {name: "Sin síntomas compatibles", data: withoutData, color: "#7C6EF0"},
        {name: "Con síntomas compatibles", data: withData, color: "#FFA551"},
        {name: "Total", data: totalData, color: "#EA5455"}
      ])
    },
    [dataTimeline]
  );

  const handleSelect = useCallback(
    item => {
      switch (item) {
        case 'Sin síntomas compatibles':
          setSelectedRadio(item);
          break;
        case 'Con síntomas compatibles':
          setSelectedRadio(item);
          break;
        case 'Total':
          setSelectedRadio(item);
          break;
        default:
          break;
      }
      getAllSeries()
    },
    [ getAllSeries]
  );

  const handleAgeSelect = useCallback(item => {
    setSelectedAgeRadio(item);
    if (item === 'total') {
      setChartAgeValues([0, 100]);
    } else {
      const newValues = item.split('-').map((num, index) => {
        if (index === 0 && num === '*') num = 0;
        if (index === 1 && num === '*') num = 100;
        if (index === 0) return Number(num);
        if (num === 100) return Number(num);
        return Number(num - 1);
      });
      setChartAgeValues(newValues);
    }
  }, []);

  const onChangeAgeValues = (event, newValue) => {
    setAgeValues(newValue);
    setSelectedAgeRadio(false);
  };

  const onChangeChartAgeValues = (event, newValue) => {
    setChartAgeValues(newValue);
    setSelectedAgeRadio(false);
  };

  return (
    <Fragment>
      {showError && <ModalError hideErrorModal={hideErrorModal} />}
      {loading ? (
        <div style={DisplayUtils.isMobile() ? { height: '600px' } : { width: '100%', height: '80vh' }}>
          <Loading white={true} />
        </div>
      ) : (
        <Fragment>
          <FiltersBar 
            title="Resultados autodiagnósticos GLOBAL" 
            showFilters
            setDistrictsResult={setDistricts} 
            setSelectedDateInitResult={setSelectedDateInit}
            setSelectedDateEndResult={setSelectedDateEnd}
            showErrorModal={showErrorModal}
            showAge
            ageValues={chartAgeValues}
            onChangeAgeValues={onChangeChartAgeValues}
          />
          <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'mobile' : 'desktop'} chart-test-box`}>
            <SintomaticMain initDate={selectedDateInit} endDate={selectedDateEnd} />
            {dataCategories && dataSeries && (
              <ChartTest
                strokeColor={'grey'}
                primary={'red'}
                purple={'red'}
                handleSelect={handleSelect}
                dataCategories={dataCategories}
                dataInputs={dataInputs}
                selectedRadio={selectedRadio}
                dataSeries={dataSeries}
                initDate={DateUtils.dateToCustomString(selectedDateInit)}
                endDate={DateUtils.dateToCustomString(selectedDateEnd)}
                ageValues={chartAgeValues}
              />
            )}
            <RangeTest
              dataAge={dataAge}
              ageValues={chartAgeValues}
              onChangeAgeValues={onChangeAgeValues}
              handleAgeSelect={handleAgeSelect}
              selectedAgeRadio={selectedAgeRadio}
              dataGender={dataGender}
              initDate={DateUtils.dateToCustomString(selectedDateInit)}
              endDate={DateUtils.dateToCustomString(selectedDateEnd)}
              showSimptoms
            />
            {newData && (
              <MapTest
                mapData={newData ? newData : []}
                initDate={DateUtils.dateToCustomString(selectedDateInit)}
                endDate={DateUtils.dateToCustomString(selectedDateEnd)}
                grades={mapUtils.GRADES} 
                getColor={mapUtils.GET_COLOR}
                colorGrades={mapUtils.COLOR_GRADES}
                globalResults
              />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default FiltersTest;
