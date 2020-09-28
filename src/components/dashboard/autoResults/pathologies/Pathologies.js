import React, { useEffect, useState } from 'react';
import DisplayUtils from '../../../../utils/DisplayUtils';
import { DonutChart, FiltersBar, Loading } from '../../../index';
import constants from '../../../../utils/constants';
import DateUtils from '../../../../utils/DateUtils';
import { statsService } from '../../../../services';
import './Pathologies.css';

const Pathologies = () => {

    const actuallyDate = new Date();
    const customHeight = 250
    const [dayPathologies, setDayPathologies] = useState(0)
    const [totalPathologies, setTotalPathologies] = useState(0)
    const [totalTest, setTotalTests] = useState(0)
    const [dayTest, setDayTests] = useState(0)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const options = {
            startDate: DateUtils.getEpochDate(DateUtils.dateToString(actuallyDate)),
            endDate: DateUtils.setEndDay(DateUtils.dateToString(actuallyDate)),
            stateID: constants.STATE_MADRID[0].id,
            municipalityID: null,
            suburbID: null,
            postalCode: null,
            type: "profile"
        };
        const getPathologies = async () => {
            try {
                const response = await statsService.getSymptoms(options);
                setDayPathologies(response.conditions);
            } catch (error) {}
        };
        const getIndicators = async () => {
            try {
                const response = await statsService.getIndicators(options);
                setDayTests(response.totalProfiles);
            } catch (error) {}
        };
        getPathologies();
        getIndicators();
    }, []); // eslint-disable-line

    useEffect(() => {
        const options = {
            startDate: null,
            endDate: null,
            stateID: constants.STATE_MADRID[0].id,
            municipalityID: null,
            suburbID: null,
            postalCode: null,
            type: "profile"
        };
        const getPathologies = async () => {
            try {
                const response = await statsService.getSymptoms(options);
                setTotalPathologies(response.conditions);
            }     catch (error) {}
        };
        const getIndicators = async () => {
            try {
                const response = await statsService.getIndicators(options);
                setTotalTests(response.totalProfiles);
            } catch (error) {}
        };
        getPathologies();
        getIndicators();
    }, []); // eslint-disable-line

    const calculatePercents = (type) => {
        let dataSeries = []
        if(type === "total") {
            let withPath = totalPathologies === 0 ? 0 : (totalPathologies * 100) / totalTest;
            let withoutPath = ( totalTest - totalPathologies ) === 0 ? 0 : ( ( totalTest - totalPathologies ) * 100) / totalTest;
            dataSeries.push(parseFloat(withPath.toFixed(withPath % 1 && 1)), parseFloat(withoutPath.toFixed(withoutPath % 1 && 1)))
        } else if(type === "day") {
            let withPath = dayPathologies === 0 ? 0 : (dayPathologies * 100) / dayTest;
            let withoutPath = ( dayTest - dayPathologies ) === 0 ? 0 : ( ( dayTest - dayPathologies ) * 100) / dayTest;
            dataSeries.push(withPath.toFixed(withPath % 1 && 1), withoutPath.toFixed(withoutPath % 1 && 1))
        }
        return dataSeries;
    }

    return(
        <div>
            <FiltersBar title="Patologías"/>
            <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'mobile' : 'desktop'} row m-0 w-100 mb-5 pathologies-main-container`}>
                <div className={`${DisplayUtils.isMobile() ? 'col-12 mb-4 px-0' : 'col-6 pl-0'}`}>
                    <div className="pathologies-card-content p-2">
                        <span className="m-3 d-block data-title">Gráfico con/sin patologías TOTAL</span>
                        <DonutChart 
                            series={calculatePercents("total")}
                            colors={["#7D70F3", "#EA5455"]}
                            labels={["Sin patologías", "Con patologías"]} 
                            type={"pie"} 
                            customHeight={DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? null : customHeight}/>
                            <span className="m-3 d-block info-data-text">*Está gráfica muestra los datos totales por usuarios con síntomas compatibles con/sin patologías anteriores</span>
                    </div>
                </div>
                <div className={`${DisplayUtils.isMobile() ? 'col-12 px-0' : 'col-6 pr-0'}`}>
                    <div className="pathologies-card-content p-2">
                        <span className="m-3 d-block data-title">Gráfico con/sin patologías DIARIO</span>
                        <DonutChart 
                            series={calculatePercents("day")}
                            colors={["#7D70F3", "#EA5455"]}
                            labels={["Sin patologías", "Con patologías"]} 
                            type={"radialBar"} 
                            customHeight={DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? null : customHeight-6}/>
                            <span className="m-3 d-block info-data-text">*Está gráfica muestra los datos de hoy por usuarios con síntomas compatibles con/sin patologías anteriores</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pathologies