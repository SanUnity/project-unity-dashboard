import React from 'react';
import DisplayUtils from '../../../utils/DisplayUtils';
import { useTranslation } from 'react-i18next';
import './Pagination.css';

const Pagination = ({ ItemsPerPage, totalItems, paginate, currentPage }) => {

  const { t } = useTranslation();
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / ItemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {currentPage !== 1 && (
          <li key={'left'} className="page-item">
            <button
              onClick={() => paginate('left')}
              className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} btn-pagination p-0`}
            >
              <img src="/misc/icons/baseline_arrow_back_black_18dp.png" alt="back-icon" className="icon-pagination" />
            </button>
          </li>
        )}

        <li className="page-item">
          <button className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} number-active btn-pagination mx-3`}>
            {t('Pagination.page')} {currentPage} {t('Pagination.of')} {pageNumbers.length}
          </button>
        </li>
        {currentPage !== pageNumbers.length && (
          <li key={'right'} className="page-item">
            <button
              onClick={() => paginate('right')}
              className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} btn-pagination p-0`}
            >
              <img
                src="/misc/icons/baseline_arrow_forward_black_18dp.png"
                alt="forward-icon"
                className="icon-pagination"
              />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
