import React, { Fragment } from 'react';
import { StatsCard, DonutChart } from '../../../../../index';

const manColor = "#7D70F3"
const womanColor = "#E7776B"

const BubbleChartTest = ({ dataGender, showSimptoms }) => {

  const data =
    dataGender && dataGender.length === 0 ? [0,0] :
        dataGender && dataGender.length === 1
          ? dataGender.map(item => {
          const newItem = [0];
          item.gender === 'male'
            ? newItem.unshift(item.percentage)
            : newItem.push(item.percentage);
          return newItem;
        })[0]
        : dataGender && dataGender.map(item => item.percentage);
  const male =
    dataGender &&
    dataGender.length === 2 &&
    dataGender.filter(item => item.gender === 'male')[0];
  const female =
    dataGender &&
    dataGender.length === 2 &&
    dataGender.filter(item => item.gender === 'female')[0]; 

  return (
    <div className="">
      <span className="mx-3 d-block data-title text-left">Usuarios por género</span>
      <div className="row m-0 w-100 mt-2">
        {dataGender && dataGender.length === 1 && (
          <Fragment>
            <div className="col-6 p-0" key={data.gender}>
              <StatsCard
                bg={manColor}
                icon="/misc/icons/hombre.svg"
                stat={dataGender[0].gender === 'male' ? dataGender[0].cases : 0}
                statTitle="Hombre"
                hideChart
              />
            </div>
            <div className="col-6 p-0" key={dataGender[0].gender}>
              <StatsCard
                bg={womanColor}
                icon="/misc/icons/mujer.svg"
                stat={
                  dataGender[0].gender === 'female' ? dataGender[0].cases : 0
                }
                statTitle="Mujer"
                hideChart
              />
            </div>
          </Fragment>
        )}
        {dataGender && dataGender.length === 2 && (
          <Fragment>
            <div className="col-6 p-0" key={male.gender}>
              <StatsCard
                bg={manColor}
                icon="/misc/icons/hombre.svg"
                stat={male.cases}
                statTitle="Hombre"
                hideChart
              />
            </div>
            <div className="col-6 p-0" key={female.gender}>
              <StatsCard
                bg={womanColor}
                icon="/misc/icons/mujer.svg"
                stat={female.cases}
                statTitle="Mujer"
                hideChart
              />
            </div>
          </Fragment>
        )}
        {!dataGender || dataGender.length === 0 && ( // eslint-disable-line
          <Fragment>
            <div className="col-6 p-0" key={male.gender}>
              <StatsCard
                bg={manColor}
                icon="/misc/icons/hombre.svg"
                stat={0}
                statTitle="0% con síntomas"
                hideChart
              />
            </div>
            <div className="col-6 p-0" key={female.gender}>
              <StatsCard
                bg={womanColor}
                icon="/misc/icons/mujer.svg"
                stat={0}
                statTitle="0% con síntomas"
                hideChart
              />
            </div>
          </Fragment>
        )}
      </div>
      <div className="row m-0 w-100 justify-content-center mt-4">
        {showSimptoms ? (
          <DonutChart
            series={[male && male["level-1"] > 0 ? ((male["level-1"]*100)/male.cases).toFixed(2) : 0,female && female["level-1"] > 0 ? ((female["level-1"]*100)/female.cases).toFixed(2) : 0]}
            colors={['#7D70F3', '#EA5455']}
            labels={['Hombres con síntomas compatibles', 'Mujeres con síntomas compatibles']}
            type={'radialBar'}
            gender
          />
        ) : (
          <DonutChart
            series={data}
            colors={['#7D70F3', '#EA5455']}
            labels={['Hombre', 'Mujer']}
            type={'radialBar'}
            gender
          />
        )}
      </div>
    </div>
  );
};

export default BubbleChartTest;
