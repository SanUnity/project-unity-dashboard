import React, { useEffect, useState, useRef } from 'react';
import { statsService } from '../../../../../services';
import DisplayUtils from '../../../../../utils/DisplayUtils';
import { DonutChart, StatsCard } from '../../../../index';
import DateUtils from '../../../../../utils/DateUtils';
import './SintomaticMain.css';

const SintomaticMain = ({ initDate, endDate  }) => {

    const [dayTimeLine, setDayTimeLine] = useState(null);
    const [totalTimeLine, setTotalTimeLine] = useState(null);
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        const getData = async () => {
            const options = {
                startDate: DateUtils.getEpochDate(
                    DateUtils.dateToString(initDate)
                ),
                endDate: DateUtils.setEndDay(DateUtils.dateToString(endDate))
            }
            try {
                const response = await statsService.getMainSymptoms(options);
                mountedRef.current && setTotalTimeLine(response.total);
                mountedRef.current && setDayTimeLine(response.today);
            } catch (error) {}
        };
        getData();
        return() => {
            mountedRef.current = false;
        }
    }, [initDate, endDate]); // eslint-disable-line


    const calculatePercents = (data) => {
        let dataSeries = []
        if(data) {
            let dataTotal = data['level-0'] + data['level-1']
            let withSimp = data['level-0'] === 0 ? 0 : (data['level-0'] * 100) / dataTotal;
            let withoutSimp = data['level-1'] === 0 ? 0 : (data['level-1'] * 100) / dataTotal;
            dataSeries.push(withSimp, withoutSimp)
        }
        return dataSeries;
    }

    return (
        <div className="row m-0 w-100 mb-5 sintomatics-main-container">
            <div className={`${DisplayUtils.isMobile() ? 'col-12 mb-4 px-0' : 'col-6 pl-0 pr-4'}`}>
                <div className="sintomatics-card-content p-2">
                    <span className="m-3 d-block data-title">Gráfico con síntomas compatibles y sin síntomas compatibles TOTALES</span>
                    <div className="row m-0 w-100 mt-5 justify-content-center">
                        <div className="col-4 p-0">
                            <StatsCard
                                icon="/misc/icons/activity.svg"
                                stat={totalTimeLine && totalTimeLine['level-0']}
                                statTitle="Sin síntomas compatibles TOTAL"
                                hideChart
                            />
                        </div>
                        <div className="col-4 p-0">
                            <StatsCard
                                icon="/misc/icons/activity.svg"
                                stat={totalTimeLine && totalTimeLine['level-1']}
                                statTitle="Con síntomas compatibles TOTAL"
                                hideChart
                            />
                        </div>
                    </div>
                    <div className="row m-0 w-100 justify-content-center mt-4">
                        <DonutChart  
                            series={calculatePercents(totalTimeLine).map(data => parseFloat(data.toFixed(data % 1 && 1)))}
                            colors={["#7D70F3", "#FFA551"]} 
                            labels={["Sin síntomas compatibles", "Con síntomas compatibles"]} 
                            type={"donut"} 
                            />
                    </div>
                    <span className="m-3 d-block info-data-text">
                        *Está gráfica muestra los datos por persona con y sin síntomas compatibles en total en el rango de fechas {DateUtils.dateToCustomString(initDate)} - {DateUtils.dateToCustomString(endDate)}
                    </span>
                </div>
            </div>
            <div className={`${DisplayUtils.isMobile() ? 'col-12 px-0' : 'col-6 pr-0 pl-4'}`}>
                <div className="sintomatics-card-content p-2">
                    <span className="m-3 d-block data-title">Gráfico con síntomas compatibles y sin síntomas compatibles HOY</span>
                    <div className="row m-0 w-100 mt-5 justify-content-center">
                        <div className="col-4 p-0">
                            <StatsCard
                                icon="/misc/icons/activity.svg"
                                stat={dayTimeLine && dayTimeLine['level-0']}
                                statTitle="Sin síntomas compatibles HOY"
                                hideChart
                            />
                        </div>
                        <div className="col-4 p-0">
                            <StatsCard
                                icon="/misc/icons/activity.svg"
                                stat={dayTimeLine && dayTimeLine['level-1']}
                                statTitle="Con síntomas compatibles HOY"
                                hideChart
                            />
                        </div>
                    </div>
                    <div className="row m-0 w-100 justify-content-center mt-4">
                        <DonutChart 
                            series={calculatePercents(dayTimeLine).map(data => parseFloat(data.toFixed(data % 1 && 1)))}
                            colors={["#7D70F3", "#FFA551"]}
                            labels={["Sin síntomas compatibles", "Con síntomas compatibles"]} 
                            type={"radialBar"}
                            />
                    </div>
                    <span className="m-3 d-block info-data-text">*Está gráfica muestra los datos por persona con y sin síntomas compatibles de hoy</span>
                </div>
            </div>
        </div>
    )
}

export default SintomaticMain 