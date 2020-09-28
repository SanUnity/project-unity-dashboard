import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import Chart from 'react-apexcharts';
import { RadioChart } from '../../../../index';
import DisplayUtils from '../../../../../utils/DisplayUtils';
import './ChartTest.css';

const ChartTest = ({
  strokeColor,
  handleSelect,
  dataCategories,
  dataInputs,
  dataSeries,
  selectedRadio,
  initDate,
  endDate,
  ageValues
}) => {

  useEffect(() => {
    handleSelect(selectedRadio)
  }, [selectedRadio, handleSelect])

  const showCategories = dataCategories.length <= 8;
  const colors = dataSeries && dataSeries.map(item => (
    item.name === selectedRadio ? item.color : item.color+"55"
  ))
  const gradientColors = dataSeries && dataSeries.map(item => (
    item.name === selectedRadio ? item.color : item.color+"55"
  ))
  const allSeries = dataSeries && dataSeries.map(item => (
    {
      name: item.name,
      data: item.data
    }
  ))

  const state = {
    options: {
      chart: {
        dropShadow: {
          enabled: true,
          top: 5,
          left: 2,
          blur: 2,
          opacity: 0.1
        },
        toolbar: { show: false }
      },
      stroke: {
        curve: 'smooth',
        width: 4
      },
      
      legend: {
        show: false
      },
      colors: colors,
      fill: {
        type: 'gradient',
        gradient: {
          enabled: true,
            type: "horizontal",
            gradientToColors: gradientColors,
            inverseColors: true,
            stops: [0, 70]
        }
      },
      markers: {
        size: 0,
        hover: {
          size: 5
        }
      },
      xaxis: {
        labels: {
          show: showCategories,
          style: {
            colors: strokeColor
          }
        },
        axisTicks: {
          show: false
        },
        categories: dataCategories,
        axisBorder: {
          show: false
        },
        tickPlacement: 'on'
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          style: {
            color: strokeColor
          },
          formatter: val => {
            return val > 999 ? (val / 1000).toFixed(1) + 'k' : val;
          }
        }
      },
      tooltip: {
        x: { show: false }
      }
    },
    series: allSeries
  };

  const newData =
  dataInputs &&
  dataInputs.map(data => {
      return {
        ...data,
        isActive: !selectedRadio ? false : selectedRadio === data.name
      };
    });


  return (
    <Card>
      <CardHeader
        className={`${
          DisplayUtils.isMobile()
            ? 'mobile px-5'
            : 'justify-content-between px-5'
        } d-flex align-middle box-inputs-chart`}
      >
        {newData &&
          newData.map(item => (
            <RadioChart
              key={item.name}
              title={item.name}
              total={item.data}
              color={item.color}
              handleSelect={handleSelect}
              isSelected={item.isActive}
            />
          ))}
      </CardHeader>
          <span className="m-3 d-block info-data-text-chart">*Está gráfica muestra todos los datos por personas comprendidas entre {ageValues[0]} a {ageValues[1]} años, en el rango de fechas {initDate} - {endDate}, resaltando {selectedRadio.toLowerCase()} </span>
      <CardBody>
        <Chart
          options={state.options}
          series={state.series}
          type="line"
          height={300}
        />
      </CardBody>
    </Card>
  );
};
export default ChartTest;
