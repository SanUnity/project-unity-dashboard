import React from 'react';
import { StatsCard } from '../../../index';
import DisplayUtils from '../../../../utils/DisplayUtils';
import './InfoUsersCard.css';

const InfoUsersCard = ({ totalUsers, usersMultiplesProfiles, avgProfiles, totalProfiles }) => {

    return (
        <div className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} row m-0 w-100 justify-content-between app-usage-cards`}>
            <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'col-6 pl-0' : 'col-3 pl-0'}`}>
                <StatsCard
                    icon="/misc/icons/tablet.svg"
                    stat={totalUsers}
                    statTitle="Total Usuarios"
                    hideChart
                    bg={"#7D70F3"}
                />
            </div>
            <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'col-6 pr-0' : 'col-3'}`}>
                <StatsCard
                    icon="/misc/icons/tablet.svg"
                    stat={usersMultiplesProfiles}
                    statTitle="Usiarios con perfiles adicionales"
                    hideChart
                    bg={"#7D70F3"}
                />
            </div>
            <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'col-6 pl-0 mt-4' : 'col-3'}`}>
                <StatsCard
                    icon="/misc/icons/tablet.svg"
                    stat={avgProfiles.toFixed(2)}
                    statTitle="Promedio perfiles por usuario"
                    hideChart
                    bg={"#7D70F3"}
                />
            </div>
            <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'col-6 pr-0 mt-4' : 'col-3 pr-0'}`}>
                <StatsCard
                    icon="/misc/icons/tablet.svg"
                    stat={totalProfiles}
                    statTitle="Total Perfiles"
                    hideChart
                    bg={"#7D70F3"}
                />
            </div>
        </div>
    )

}

export default InfoUsersCard