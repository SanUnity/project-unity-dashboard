import React, { useState, useEffect, useRef } from 'react';
import { Filters } from '../../index';
import DisplayUtils from '../../../utils/DisplayUtils';
import DateUtils from '../../../utils/DateUtils';
import constants from '../../../utils/constants';
import { filtersService } from '../../../services';
import './FiltersBar.css';

const FiltersBar = ({ 
    title, 
    showFilters, 
    setDistrictsResult, 
    setSelectedDateInitResult, 
    setSelectedDateEndResult, 
    showErrorModal, 
    showAge,
    ageValues,
    onChangeAgeValues 
}) => {

    const actuallyDate = new Date();
    const initDate = DateUtils.stringToDate('2020-01-01');
    const [show, setShow] = useState(false)
    const [districts, setDistricts] = useState(null);
    const [listDistricts, setListDistricts] = useState(null);
    const [selectedDateEnd, setSelectedDateEnd] = useState(actuallyDate);
    const [selectedDateInit, setSelectedDateInit] = useState(initDate);
    const [btnSelected, setBtnSelected] = useState('total');
    const [states] = useState(constants.STATE_MADRID[0].id);
    const [provinces] = useState(constants.PROVINCE_MADRID[0].id);
    const mountedRef = useRef(false);

    const data = {
        state: states,
        province: provinces
    };

    useEffect(() => {
        mountedRef.current = true;
        const getDistricts = async () => {
          try {
            const response = await filtersService.getDistricts(data);
            mountedRef.current && setListDistricts(response);
          } catch (error) {
            showErrorModal();
          }
        };
        getDistricts();
        return() => {
          mountedRef.current = false;
        }
    }, []); // eslint-disable-line

    const handleChange = (event, label) => {
        const { value } = event.target;
        switch (label) {
          case 'Municipio':
            setDistricts(value);
            setDistrictsResult(value)
            break;
          default:
            break;
        }
    };

    const handleDateChange = (date, label) => {
        switch (label) {
          case 'init':
            setSelectedDateInit(date);
            setSelectedDateInitResult(date);
            break;
          case 'end':
            setSelectedDateEnd(date);
            setSelectedDateEndResult(date);
            break;
          default:
            break;
        }
    };

    const handleBtnChange = date => {
        let newDate = DateUtils.dateToString(selectedDateEnd);
        let formatDate = DateUtils.stringToDate(newDate);
    
        switch (date) {
          case 'week':
            formatDate.setDate(formatDate.getDate() - 6);
            setSelectedDateInit(formatDate);
            setSelectedDateInitResult(formatDate)
            setBtnSelected(date);
            break;
          case 'month':
            formatDate.setMonth(formatDate.getMonth() - 1);
            setSelectedDateInit(formatDate);
            setSelectedDateInitResult(formatDate)
            setBtnSelected(date);
            break;
          case 'threeMonth':
            formatDate.setMonth(formatDate.getMonth() - 3);
            setSelectedDateInit(formatDate);
            setSelectedDateInitResult(formatDate)
            setBtnSelected(date);
            break;
          case 'total':
            setSelectedDateEnd(new Date());
            setSelectedDateEndResult(new Date());
            formatDate = DateUtils.stringToDate('2020-01-01');
            setSelectedDateInit(formatDate);
            setSelectedDateInitResult(formatDate)
            setBtnSelected('total');
            break;
          default:
            break;
        }
    };

    return (
        <div className={`${DisplayUtils.isMobile() && !DisplayUtils.isTablet() ? 'mobile' : 'desktop'} bg-white filters-bar-container row m-0 w-100`}>
            <div className="row m-0 w-100 d-flex align-items-center">
                <span className="col title-header p-0">{title}</span>
                {showFilters && 
                    <div className="">
                        <button data-val="week" className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} btn-filters white bg-main-covid`} onClick={() => setShow(!show)}>
                            <img src={show ? "/misc/icons/arrow_up_white.svg" : "/misc/icons/arrow_down_white.svg" } alt="arrow_navbar" className="icon-nav-close"/>
                            FILTROS
                        </button>
                    </div>
                }
            </div>
            {show &&
                <Filters
                    handleChange={handleChange}
                    districts={districts}
                    listDistricts={listDistricts}
                    selectedDateInit={selectedDateInit}
                    handleDateChange={handleDateChange}
                    btnSelected={btnSelected}
                    selectedDateEnd={selectedDateEnd}
                    handleBtnChange={handleBtnChange}
                    showAge={showAge}
                    ageValues={ageValues}
                    onChangeAgeValues={onChangeAgeValues}
              />
            }
        </div>
    );
};

export default FiltersBar;