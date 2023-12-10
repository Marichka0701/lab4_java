import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import styles from './PizzaItemCart.module.scss';
import PizzaItem from "../Pizza/PizzaItem/PizzaItem";
import Button from "../UI/Button/Button";
import {pizzaActions} from "../../store/slices/pizzaSlice";
import {pizzaService} from "../../services/pizza.service";

const PizzaItemCart = ({pizza}) => {
    const dispatch = useDispatch();
    const {orders} = useSelector(state => state.pizza);
    const handleDeleteOrder = () => {
        const filteredOrders = orders.filter(item => item.id !== pizza.id);
        dispatch(pizzaActions.setOrders(filteredOrders));
    }

    const handleCreateOrder = async () => {
        await pizzaService.createOrder(pizza);
    }

    return (
        <div className={styles.pizzaItemCart}>
            <PizzaItem pizza={pizza}/>

            <div className={styles.pizzaItemCart_buttons}>
                <Button text={'Delete from cart'} handleClick={handleDeleteOrder}/>
                <Button text={'Order a pizza'} handleClick={handleCreateOrder}/>
            </div>
        </div>
    );
};

export default PizzaItemCart;