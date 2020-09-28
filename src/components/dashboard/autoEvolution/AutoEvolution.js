import React, { useEffect, useState } from 'react';
import DisplayUtils from '../../../utils/DisplayUtils';
import { statsService } from '../../../services';
import { StatsCard, FiltersBar } from '../../index';
import './AutoEvolution.css';

const AutoEvolution = () => {

    const [avg, setAvg] = useState(null);
    const [dayTimeLine, setDayTimeLine] = useState(null);
    const [totalTimeLine, setTotalTimeLine] = useState(null);

    useEffect(() => {
        const options = {}
        const getData = async () => {
          try {
            const response = await statsService.getMainSymptoms(options);
            setAvg(response.avgTest)
            setTotalTimeLine(response.total);
            setDayTimeLine(response.today);
          } catch (error) {}
        };
        getData();
    }, []); // eslint-disable-line

    return(
        <div>
            <FiltersBar title="Evolución autodiagnósticos" />
            <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'mobile' : 'desktop'} auto-evo-container`}>
                <div className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} row m-0 w-100 justify-content-start app-usage-cards`}>
                    <span className="col-12 mb-2 subtitle-header">TOTAL</span>
            
                    <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'col-6 pl-0' : 'col-3 pl-0'}`}>
                        <StatsCard
                            icon="/misc/icons/activity.svg"
                            stat={totalTimeLine && totalTimeLine.firstTest}
                            statTitle="Número de primeras evaluaciones"
                            hideChart
                        />
                    </div>
                    <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'col-6 pr-0' : 'col-3'}`}>
                        <StatsCard
                            icon="/misc/icons/activity.svg"
                            stat={totalTimeLine && totalTimeLine.reTest}
                            statTitle="Número de re-evaluaciones"
                            hideChart
                        />
                    </div>
                    <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'col-6 pl-0 mt-4' : 'col-3'}`}>
                        <StatsCard
                            icon="/misc/icons/activity.svg"
                            stat={avg && avg.toFixed(2)}
                            statTitle="Promedio de re-evaluaciones por usuario"
                            hideChart
                        />
                    </div>
                </div>
                <div className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} row m-0 w-100 mt-5 justify-content-start app-usage-cards`}>
                    <span className="col-12 mb-2 subtitle-header">DIARIO</span>
                    
                    <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'col-6 pl-0' : 'col-3 pl-0'}`}>
                        <StatsCard
                            icon="/misc/icons/users.svg"
                            stat={dayTimeLine && dayTimeLine.firstTest}
                            statTitle="Número de primeras evaluaciones"
                            hideChart
                            bg={"#7D70F3"}
                        />
                    </div>
                    <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'col-6 pr-0' : 'col-3'}`}>
                        <StatsCard
                            icon="/misc/icons/users.svg"
                            stat={dayTimeLine && dayTimeLine.reTest}
                            statTitle="Número de re-evaluaciones"
                            hideChart
                            bg={"#7D70F3"}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AutoEvolution