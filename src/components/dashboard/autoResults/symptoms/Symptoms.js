import React, { useEffect, useState } from 'react';
import DisplayUtils from '../../../../utils/DisplayUtils';
import { BarChart, FiltersBar } from '../../../index';
import constants from '../../../../utils/constants';
import { statsService } from '../../../../services';
import './Symptoms.css';

const Symptoms = () => {
    const [totalPathologies, setTotalPathologies] = useState(0)

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
                setTotalPathologies(response);
            }     catch (error) {}
        };
        getPathologies();
    }, []); // eslint-disable-line

    const calculatePercents = () => {
        let dataSeries = []
        if(totalPathologies) {
            let totalData = Object.values(totalPathologies).reduce(function(lastValue, currentValue) { return lastValue + currentValue })
            let breathing = totalPathologies.breathing === 0 ? 0 : (totalPathologies.breathing * 100) / totalData;
            let conditions = totalPathologies.conditions === 0 ? 0 : (totalPathologies.conditions * 100) / totalData;
            let cough = totalPathologies.cough === 0 ? 0 : (totalPathologies.cough * 100) / totalData;
            let fever = totalPathologies.fever === 0 ? 0 : (totalPathologies.fever * 100) / totalData;
            let gastrointestinal = totalPathologies.gastrointestinal === 0 ? 0 : (totalPathologies.gastrointestinal * 100) / totalData;
            let lossSmellTaste = totalPathologies.lossSmellTaste === 0 ? 0 : (totalPathologies.lossSmellTaste * 100) / totalData;
            let meet = totalPathologies.meet === 0 ? 0 : (totalPathologies.meet * 100) / totalData;
            let pain = totalPathologies.pain === 0 ? 0 : (totalPathologies.pain * 100) / totalData;
            let snot = totalPathologies.snot === 0 ? 0 : (totalPathologies.snot * 100) / totalData;
            dataSeries.push(breathing,conditions,cough,fever,gastrointestinal,lossSmellTaste,meet,pain,snot)
        }
        return dataSeries;
    }

    const getSerieData = () => {
        let dataSeries = []
        if(totalPathologies) {
            let breathing = totalPathologies.breathing
            let conditions = totalPathologies.conditions
            let cough = totalPathologies.cough
            let fever = totalPathologies.fever
            let gastrointestinal = totalPathologies.gastrointestinal
            let lossSmellTaste = totalPathologies.lossSmellTaste
            let meet = totalPathologies.meet
            let pain = totalPathologies.pain
            let snot = totalPathologies.snot
            dataSeries.push(breathing,conditions,cough,fever,gastrointestinal,lossSmellTaste,meet,pain,snot)
        }
        return dataSeries;
    }

    return(
        <div>
            <FiltersBar title="Sintomatología"/>
            <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'mobile' : 'desktop'} row m-0 w-100 mb-5 symptoms-main-container`}>
                <div className={`${DisplayUtils.isMobile() ? 'col-12 mb-4 px-0' : 'col-6 pl-0'}`}>
                    <div className="symptoms-card-content p-2">
                        <span className="m-3 d-block data-title">Gráfico Prevalencia sintomatologías GLOBAL</span>
                        <BarChart
                            series={calculatePercents()}
                            colors={['#006CFF', '#FFCB3F', '#357CA0', '#C2549D', '#7D70F3', '#FFA551', '#EA5455', '#71BBF9','#35B6AC']}
                            labels={["Falta de aire", "Enfermedad crónica", "Tos", "Fiebre", "Gastrointestinal", "Pérdida de olfato", "Contacto estrecho", "Dolor muscular", "Mucosidad"]}
                            type={"bar"}
                            vertical/>
                        <span className="m-3 d-block info-data-text">*Está gráfica muestra los datos totales en % de los síntomas por persona</span>
                    </div>
                </div>
                <div className={`${DisplayUtils.isMobile() ? 'col-12 px-0' : 'col-6 pr-0'}`}>
                    <div className="symptoms-card-content p-2">
                        <span className="m-3 d-block data-title">Sintomatologías</span>
                        <BarChart
                            series={getSerieData()}
                            colors={['#006CFF', '#FFCB3F', '#357CA0', '#C2549D', '#7D70F3', '#FFA551', '#EA5455', '#71BBF9','#35B6AC']}
                            labels={["Falta de aire", "Enfermedad crónica", "Tos", "Fiebre", "Gastrointestinal", "Pérdida de olfato", "Contacto estrecho", "Dolor muscular", "Mucosidad"]}
                            type={"bar"}/>
                        <span className="m-3 d-block info-data-text">*Está gráfica muestra los datos totales de los síntomas por persona</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Symptoms