import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import styles from './Pizza.module.scss';
import PizzaItem from "./PizzaItem/PizzaItem";
import {pizzaActions} from "../../store/slices/pizzaSlice";

const Pizza = () => {
    const dispatch = useDispatch();
    const {pizzas} = useSelector(state => state.pizza);

    useEffect(() => {
        const getPizzas = async () => {
            await dispatch(pizzaActions.getAll());
        }

        getPizzas();
    }, [])

    console.log(pizzas)

    return (
        <div className={styles.pizza}>
            {
                pizzas.map((item, key) => <PizzaItem pizza={item} key={key}/>)
            }
        </div>
    );
};

export default Pizza;