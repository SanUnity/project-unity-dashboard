import React, { useState, useEffect } from 'react';
import constants from '../../../utils/constants';
import './MainMenu.css';
import { useSessionStorage } from '../../../hooks/useSessionStorage';

const MainMenu = ({ selectOption, currentUser }) => {

    const [currentMenuOption, setCurrentMenuOption] = useSessionStorage(constants.CURRENT_MENU_OPTION_KEY, null);
    const [optionSelected, setOptionSelected] = useState()
    const [childrenSelected, setChildrenSelected] = useState()
    const menu = currentUser.role === 2 ? constants.MENU_DATA.children.filter(item => !item.onlyAdmin) : constants.MENU_DATA.children

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
        }
      } else {
        setChildrenSelected(selected)
        selectOption(selected)
        setCurrentMenuOption(selected)
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

    return (
        <div className="main-menu-container">
            <ul className="p-0 pt-5">
                {menu.map((option, index) => (
                <div key={index}>
                    <li className={`${optionSelected && optionSelected.name === option.name && (!optionSelected.children || optionSelected.children.length === 0) ? 'selected' : ''} black parent`} onClick={() => selectedMenuOption(option, true)}>
                        <img alt="menu-icon" className="nav-icon" src={option.icon}/>
                        <span className="align-middle">{option.name}</span>
                        <img alt="menu-icon" className="nav-icon-expand"
                        src={
                            option.children && option.children.length > 0 ? 
                            (optionSelected && optionSelected.name === option.name ? "/misc/icons/arrow_up_black.svg" : "/misc/icons/arrow_down_black.svg")
                            : "/misc/icons/check-clear.png"}
                        />
                    </li>
                    {optionSelected && optionSelected.name === option.name && option.children && option.children.length > 0 && (
                        <div className="fadeInDownMenu animatedMenu">
                            <ul className="p-0 bg-grey py-2">
                                {option.children.map((children, index) => (
                                    <li key={index} className={`${childrenSelected && childrenSelected.name === children.name ? 'selected' : ''} black children`} onClick={() => selectedMenuOption(children, false)}>
                                        <img alt="menu-icon" className="nav-icon" src={children.icon}/>
                                        <span className="h-100 align-middle">{children.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>  
                ))}
            </ul>
        </div>
    );
};

export default MainMenu;