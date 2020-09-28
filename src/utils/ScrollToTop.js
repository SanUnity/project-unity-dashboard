import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const ScrollToTop = ({ history }) => {
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            history.location.hash === "" && unlisten();
        }
    }, [history]);

    return (null);
}

export default withRouter(ScrollToTop);