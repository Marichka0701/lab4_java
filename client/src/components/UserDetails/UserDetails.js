import React from 'react';
import {useNavigate} from "react-router-dom";

import styles from './UserDetails.module.scss';
import logout from '../../assets/images/log-out.svg';
import {MAIN_ROUTES} from "../../routing/mainRoutes";

const UserDetails = () => {
    const user = {};

    const navigate = useNavigate();
    
    const handleLogOutFromAccount = () => {
      
    }

    return (
        <div
            className={styles.user_wrapper}
            onClick={() => navigate(MAIN_ROUTES.SETTINGS)}
        >
            <div className={styles.user_wrapper_user}>
                <p className={styles.user_wrapper_user_fullName}>Марічка Танечник</p>
            </div>

            <div onClick={handleLogOutFromAccount}>
                <img className={styles.logout} src={logout} alt="log out"/>
            </div>
        </div>
    );
};

export default UserDetails;