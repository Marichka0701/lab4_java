import React from 'react';
import {useSelector} from "react-redux";

import styles from './CurrentOrders.module.scss';
import PizzaItemCart from "../PizzaItemCart/PizzaItemCart";

const CurrentOrders = () => {
    const {orders} = useSelector(state => state.pizza);

    return (
        <div className={styles.currentOrders}>
            {
                orders?.map((item, key) => <PizzaItemCart pizza={item} key={key}/>)
            }
        </div>
    );
};

export default CurrentOrders;