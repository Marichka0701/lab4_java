import React from 'react';

import styles from './MainPage.module.scss';
import UserDetails from "../../components/UserDetails/UserDetails";
import TypesOfPizza from "../../components/TypesOfPizza/TypesOfPizza";
import Pizza from "../../components/Pizza/Pizza";

const MainPage = () => {
    return (
        <div className={styles.mainPage_wrapper}>
            <div className={styles.mainPage}>
                <div className={styles.mainPage_titleContainer}>
                    <div className={styles.mainPage_titleContainer_title}>
                        <p>REACT PIZZA</p>
                        <p>найкраща піца у світі</p>
                    </div>

                    <UserDetails/>
                    {/*<div className={styles.mainPage_titleContainer_info}>*/}
                    {/*    <div>*/}
                    {/*        <p>199 грн</p>*/}
                    {/*    </div>*/}
                    {/*    <div>*/}
                    {/*        <p>8</p>*/}
                    {/*        <img src={cart} alt="shopping cart"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

                <TypesOfPizza/>

                <Pizza/>
            </div>
        </div>
    );
};

export default MainPage;