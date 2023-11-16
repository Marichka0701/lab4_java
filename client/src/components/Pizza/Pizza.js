import React from 'react';

import styles from './Pizza.module.scss';
import PizzaItem from "./PizzaItem/PizzaItem";

const Pizza = () => {
    return (
        <div className={styles.pizza}>
            <PizzaItem/>
            <PizzaItem/>
            <PizzaItem/>
            <PizzaItem/>
            <PizzaItem/>
        </div>
    );
};

export default Pizza;