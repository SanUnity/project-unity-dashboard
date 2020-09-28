import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import DisplayUtils from '../../../utils/DisplayUtils';
import constants from '../../../utils/constants';
import { authService } from '../../../services/index';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import './NavBar.css';

const NavBar = ({ selectOption, currentUser }) => {

  const [currentMenuOption, setCurrentMenuOption] = useSessionStorage(constants.CURRENT_MENU_OPTION_KEY, null);
  const [closeOption, setCloseOption] = useState(false);
  const [optionSelected, setOptionSelected] = useState(constants.MENU_DATA.children[0])
  const [childrenSelected, setChildrenSelected] = useState(constants.MENU_DATA.children[0].children[0])

  const openNav = () => {
    if (document.getElementById('mySidenav')) {
      document.getElementById('mySidenav').style.width = '260px';
    }
  };


  const closeNav = () => {
    if (document.getElementById('mySidenav')) {
      document.getElementById('mySidenav').style.width = '0';
    }
  };

  const closeSession = () => {
    authService.logout();
  }

  const selectedMenuOption = (selected, parent) => {
    if(parent) {
      if(optionSelected && optionSelected.name === selected.name && childrenSelected) {
        setOptionSelected(null)
      } else {
        setOptionSelected(selected)
        if(childrenSelected && selected.children && selected.children.length > 0 && selected.children.filter((item) => item.name ===  childrenSelected.name).length > 0) {
          setChildrenSelected(childrenSelected)
          selectOption(childrenSelected)
          setCurrentMenuOption(childrenSelected)
        } else if(selected.children && selected.children.length > 0) {
          setChildrenSelected(selected.children[0])
          selectOption(selected.children[0])
          setCurrentMenuOption(selected.children[0])
        } else {
          selectOption(selected)
          setCurrentMenuOption(selected)
        }
      }
      if(!selected.children || selected.children.length === 0) {
        setChildrenSelected(null)
        closeNav()
      }
    } else {
      setChildrenSelected(selected)
      selectOption(selected)
      setCurrentMenuOption(selected)
      closeNav()
    }
  }

  useEffect(() => {
    if(currentMenuOption && currentMenuOption.name) {
      selectedMenuOption(currentMenuOption,!currentMenuOption.children || currentMenuOption.children.length === 0)
      constants.MENU_DATA.children.map(parent => { // eslint-disable-line
        parent.children && parent.children.map(children => { // eslint-disable-line
          if(children.name === currentMenuOption.name) {
            setOptionSelected(parent)
            setChildrenSelected(currentMenuOption)
          }
        })
      })
    } else {
      setCurrentMenuOption(constants.MENU_DATA.children[0].children[0])
      setOptionSelected(constants.MENU_DATA.children[0])
      setChildrenSelected(constants.MENU_DATA.children[0].children[0])
    }
  }, []) // eslint-disable-line

  const getUserImage = () => {
    switch(currentUser && currentUser.roleDescription) {
      case "admin":
        return "/misc/icons/admin_red.svg"
      default:
        return "/misc/icons/person_red.svg"
    }
  }

  const menu = currentUser.role === 2 ? constants.MENU_DATA.children.filter(item => !item.onlyAdmin) : constants.MENU_DATA.children

  return (
    <div className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} nav-bar-container bg-main-covid`}>
      <div className="row p-0 m-0 h-100 w-100 d-flex align-content-center">
        {DisplayUtils.isMobile() && (
          <div className="col-1 d-flex align-items-center justify-content-start p-0 pl-2">
            <button type="button" className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} menu-btn btn-transparent align-items-center d-flex white`} onClick={() => openNav()}>
              <img src="/misc/icons/nav_menu.svg" alt="menu_navbar" className="menu-icon" />
            </button>
          </div>
        )}
        <div className={`${DisplayUtils.isMobile() ? 'col-5 pl-2 mobile' : 'col-9 pl-5 desktop'} d-flex align-items-center p-0 logo-container`}>
            {!DisplayUtils.isMobile() && <img alt="logo" className="main-logo" src="/misc/icons/project-unity-logo.svg"/>}
            <div className={`${DisplayUtils.isMobile() ? 'ml-2' : 'ml-3'}`}>
              <span className="d-block white bold">Project Unity</span>
              <span className="d-block white alpha">App autoevaluación</span>
            </div>
        </div>
        <div className={`${DisplayUtils.isMobile() ? 'col-6 mobile' : 'col-3 desktop pr-3'} d-flex align-items-center nav-box-profile p-0`}>
            <div className="row m-0 w-100 justify-content-end align-items-center">
              <img alt="profile-icon" className={`${DisplayUtils.isMobile() ? 'mr-2' : 'mr-3'} profile-icon bg-white rounded-circle`} src={getUserImage()}/>
              <div className={`${DisplayUtils.isMobile() ? 'mr-1' : 'mr-3'} d-flex flex-column justify-content-start align-middle`}>
                <span className="white bold">{currentUser && currentUser.name}</span>
                <span className="white alpha">{currentUser && currentUser.roleDescription}</span>
              </div>
              <button type="button" className="btn-transparent white btn-navbar" onClick={() => setCloseOption(!closeOption)}>
                <img src={closeOption ? "/misc/icons/arrow_up_white.svg" : "/misc/icons/arrow_down_white.svg" } alt="arrow_navbar" className="icon-nav-close"/>
              </button>
            </div>
        </div>
      </div>
      {closeOption && (
        <div className={`${DisplayUtils.isMobile() ? 'mobile' : 'desktop'} box-close fadeInDown animated white d-flex bg-main-covid justify-content-center align-items-center`}>
          <button className="title-close btn-transparent white" onClick={() => closeSession()}>
            <span className="white">Cerrar sesión</span>
          </button>
        </div>
      )}
      <div className={'box-menu d-flex justify-content-center align-items-center'}>
        <div id="mySidenav" className="sidenav bg-cards">
          <div className="logo-mobile-container bg-main-covid d-flex align-items-center">
            <img alt="logo" className="nav-main-logo p-1" src="/misc/icons/project-unity-logo.svg" />
            <img alt="closebtn" className="closebtn" src="/misc/icons/close_button@2x.png" onClick={(e) => closeNav(e)}/>
          </div>
          <ul className="p-0">
            {menu.map((option, index) => (
              <div key={index}>
              <li className={`${optionSelected && optionSelected.name === option.name && (!optionSelected.children || optionSelected.children.length === 0) ? 'selected' : ''} black`} onClick={(e) => selectedMenuOption(option, true)}>
                <span className="h-100 align-middle">{option.name}</span>
                <img alt="menu-icon" className="nav-icon-expand"
                  src={
                    option.children && option.children.length > 0 ? 
                    (optionSelected && optionSelected.name === option.name ? "/misc/icons/arrow_up_black.svg" : "/misc/icons/arrow_down_black.svg")
                    : "/misc/icons/check-clear.png"}
                />
              </li>
              {optionSelected && optionSelected.name === option.name && option.children && option.children.length > 0 && (
                <div className="fadeInDownMenu animatedMenu">
                  <ul className="p-0 bg-grey">
                  {
                    option.children.map((children, index) => (
                      <li key={index} className={`${childrenSelected && childrenSelected.name === children.name ? 'selected' : ''} black`} onClick={(e) => selectedMenuOption(children, false)}>
                        <span className="h-100 align-middle">{children.name}</span>
                      </li>
                    ))
                  }
                  </ul>
                </div>
              )}
              </div>  
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
};

export default withRouter(NavBar);