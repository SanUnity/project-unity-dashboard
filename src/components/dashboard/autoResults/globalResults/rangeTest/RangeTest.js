import React from 'react';
import constants from '../../../../../utils/constants';
import DisplayUtils from '../../../../../utils/DisplayUtils';
import { BubbleChartTest, AgeList } from '../../../../index';
import './RangeTest.css'

const RangeTest = ({
  dataAge,
  handleAgeSelect,
  selectedAgeRadio,
  dataGender,
  initDate,
  endDate,
  showSimptoms
}) => {
  const newData =
    dataAge && 
    dataAge.map((data, index) => {
      return {
        ...data,
        color: constants.GET_AGE_COLOR(index),
        isActive: !selectedAgeRadio ? false : selectedAgeRadio === data.range
      };
    });

  return (
    <div className={`${
      DisplayUtils.isMobile() ? '' : 'justify-content-between'
    } row mx-0 mt-4`}>
      <div
      className={`${
        DisplayUtils.isMobile() ? 'col-12' : 'w-55'
      } select-component`}
    >
      <AgeList data={newData} handleAgeSelect={handleAgeSelect} showSimptoms={showSimptoms} />
      {showSimptoms ? 
        <span className="m-3 d-block info-data-text mt-5">*Está gráfica muestra los totales por edad en el rango de fechas {initDate} - {endDate}, y en rojo el porcentaje de los que tienen síntomas compatibles</span> 
        :
        <span className="m-3 d-block info-data-text mt-5">*Está gráfica muestra los usuarios por edad en el rango de fechas {initDate} - {endDate} </span>
      }
    </div>
      <div
      className={`${
        DisplayUtils.isMobile() ? 'col-12' : 'w-40'
      } select-component gender-card`}
    >
      <BubbleChartTest dataGender={dataGender} showSimptoms={showSimptoms}/>
      {showSimptoms ?
        <span className="m-3 d-block info-data-text mt-5">*Está gráfica muestra los totales por género en el rango de fechas {initDate} - {endDate} y por el rango de edad seleccionado, mostrando el porcentaje de los que tienen síntomas compatibles</span>
        :
        <span className="m-3 d-block info-data-text mt-5">*Está gráfica muestra los usuarios por género en el rango de fechas {initDate} - {endDate} y por el rango de edad seleccionado</span>
      }
    </div>
    </div>
    
  );
};

export default RangeTest;
