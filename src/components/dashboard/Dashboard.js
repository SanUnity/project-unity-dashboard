import React, { useState, useReducer, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import DisplayUtils from '../../utils/DisplayUtils';
import {
  NavBar,
  MainMenu,
  GlobalResults,
  Pathologies,
  Symptoms,
  AppUsage,
  AutoEvolution,
  AdminUsers,
  Notifications,
  Loading
} from '../index';
import { authService } from '../../services/index';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import constants from '../../utils/constants';
import './Dashboard.css';

const initialState = {
  showGlobalResults: true,
  showPathologies: false,
  showSymptoms: false,
  showAutoEvolution: false,
  showAppUse: false,
  showAdminUsers: false,
  showAdminNotifications: false
};

const Dashboard = ({ history }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'Resultado global':
        return { showGlobalResults: action.payload };
      case 'Patologías':
        return { showPathologies: action.payload };
      case 'Sintomatología':
        return { showSymptoms: action.payload };
      case 'Evolución autodiagnósticos':
        return { showAutoEvolution: action.payload };
      case 'Uso de la app':
        return { showAppUse: action.payload };
      case 'Usuarios':
        return { showAdminUsers: action.payload };
      case 'Notificaciones':
        return { showAdminNotifications: action.payload };
      default:
        return initialState;
    }
  };

  const [option, setOption] = useState( // eslint-disable-line
    constants.MENU_DATA.children[0].children[0]
  );
  const screenHeight = window.innerHeight - (DisplayUtils.isMobile() ? 60 : 80);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentUser, setCurrentUser] = useLocalStorage(
    constants.CURRENT_USER_KEY, // eslint-disable-line
    null
  );
  const [loading, setLoading] = useState(true);

  const selectOption = option => {
    setLoading(true);
    setOption(option);
    dispatch({ type: option.name, payload: true });
  };

  useEffect(() => {
    const refreshSession = async () => {
      try {
        const data = await authService.getRefreshToken();

        data && !currentUser && setCurrentUser(data);
      } catch (error) {}
    };
    refreshSession();
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [currentUser, setCurrentUser]);

  return (
    <div
      className={`${
        DisplayUtils.isMobile() ? 'mobile' : 'desktop'
      } dashboard-container bg-main-background`}
    >
      <NavBar selectOption={selectOption} currentUser={currentUser} />
      <div
        className="row m-0 dashboard-content"
        style={DisplayUtils.isMobile() ? {} : { height: screenHeight }}
      >
        {!DisplayUtils.isMobile() && (
          <div
            style={{ height: screenHeight }}
            className="col-2 p-0 main-menu bg-cards"
          >
            <MainMenu selectOption={selectOption} currentUser={currentUser} />
          </div>
        )}
        <div
          style={DisplayUtils.isMobile() ? {} : { height: screenHeight }}
          className={`${
            DisplayUtils.isMobile() ? 'mobile col-12 p-0' : 'desktop col-10 p-0'
          } components-container bg-main-background`}
        >
          {state.showGlobalResults && <GlobalResults />}
          {loading ? (
            <div style={DisplayUtils.isMobile() ? { height: '600px' } : { width: '100%', height: '80vh' }}>
              <Loading white={true} />
            </div>
          ) : (
            <Fragment>
              {state.showPathologies && <Pathologies />}
              {state.showSymptoms && <Symptoms />}
              {state.showAutoEvolution && <AutoEvolution/>}
              {state.showAppUse && <AppUsage />}
              {state.showAdminUsers && <AdminUsers/>}
              {state.showAdminNotifications && <Notifications/>}
            </Fragment>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
