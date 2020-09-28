import React from 'react';
import { Link } from 'react-router-dom';
import DisplayUtils from '../../../../utils/DisplayUtils';
import { useTranslation } from 'react-i18next';
import './ModalCookies.css';

const ModalCookies = ({ acceptCookies, closeCookies }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`${
        !DisplayUtils.isMobile() ? 'desktop' : 'mobile pr-5 pl-2 pt-2'
      } w-100 white cookie-modal align-middle bounceInUp animated`}
    >
      <span className={`${!DisplayUtils.isMobile() ? 'desktop' : 'mobile '} `}>{t('Cookies.modal')}</span>
      <Link
        to={{ pathname: '/cookies', state: { footer: true } }}
        className={`${!DisplayUtils.isMobile() ? 'desktop mb-1 ml-1' : 'mobile ml-1'} white`}
      >
        {' '}
        <span>
          <u>{t('Cookies.information')}</u>
        </span>
      </Link>
      <button
        className={`${!DisplayUtils.isMobile() ? 'mb-1 ml-1' : ' ml-1'} btn-transparent white accept-btn`}
        onClick={acceptCookies}
      >
        {t('Cookies.accept')}
      </button>
      <button type="button" className="btn-transparent btn-close" onClick={closeCookies}>
        <img src="/misc/icons/close_button.png" alt="logo_navbar" className="icon-close" />
      </button>
    </div>
  );
};
export default ModalCookies;
