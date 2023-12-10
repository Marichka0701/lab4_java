import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import styles from './PizzaItem.module.scss';
import pizzaIcon from '../../../assets/images/pizza/pepperoni.svg';
import {MAIN_ROUTES} from "../../../routing/mainRoutes";
import {pizzaActions} from "../../../store/slices/pizzaSlice";

const PizzaItem = ({pizza}) => {
    const navigate = useNavigate();

    const {customPizza} = useSelector(state => state.pizza);
    const dispatch = useDispatch();

    const {pathname} = useLocation();

    const handleSelectPizzaType = (event, type) => {
        if (pathname !== MAIN_ROUTES.MAIN && pathname !== MAIN_ROUTES.SETTINGS) {
            event.stopPropagation();
            dispatch(pizzaActions.setCustomPizza({...customPizza, type}));
        }
    }

    const handleSelectPizzaSize = (event, size) => {
        if (pathname !== MAIN_ROUTES.MAIN && pathname !== MAIN_ROUTES.SETTINGS) {
            event.stopPropagation();
            dispatch(pizzaActions.setCustomPizza({...customPizza, size}));
        }
    }

    const handleNavigateToDetailedPizzaItem = () => {
        if (pathname === MAIN_ROUTES.MAIN) {
            navigate(`${MAIN_ROUTES.DETAILED_INFO_PIZZA}/${pizza._id}`, {state: {pizza}});
        }
    }

    return (
        <div
            className={styles.pizza}
            onClick={handleNavigateToDetailedPizzaItem}
        >
            <div className={styles.pizza_icon}>
                <img src={pizzaIcon} alt="pizza icon"/>
            </div>

            <div className={styles.pizza_info}>
                <h3>{pizza.name}</h3>

                <div className={styles.pizza_info_additional}>
                    <ul className={styles.pizza_info_additional_type}>
                        <li
                            className={customPizza.type === 'тонке' ? styles.active : null}
                            onClick={(event) => handleSelectPizzaType(event, 'тонке')}
                        >тонке
                        </li>
                        <li
                            className={customPizza.type === 'традиційне' ? styles.active : null}
                            onClick={(event) => handleSelectPizzaType(event, 'традиційне')}
                        >традиційне
                        </li>
                    </ul>

                    <ul className={styles.pizza_info_additional_size}>
                        <li
                            className={customPizza.size === '26см' ? styles.active : null}
                            onClick={(event) => handleSelectPizzaSize(event, '26см')}
                        >26см
                        </li>
                        <li
                            className={customPizza.size === '30см' ? styles.active : null}
                            onClick={(event) => handleSelectPizzaSize(event, '30см')}
                        >30см
                        </li>
                        <li
                            className={customPizza.size === '40см' ? styles.active : null}
                            onClick={(event) => handleSelectPizzaSize(event, '40см')}
                        >40см
                        </li>
                    </ul>
                </div>

                <div className={styles.pizza_info_priceContainer}>
                    <p className={styles.pizza_info_priceContainer_price}>{pizza.price} $</p>
                </div>
            </div>
        </div>
    );
};

export default PizzaItem;