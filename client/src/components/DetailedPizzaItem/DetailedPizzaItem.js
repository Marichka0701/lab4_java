import React, {useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import styles from './DetailedPizzaItem.module.scss';
import PizzaItem from "../Pizza/PizzaItem/PizzaItem";
import Button from "../UI/Button/Button";
import {MAIN_ROUTES} from "../../routing/mainRoutes";
import {pizzaActions} from "../../store/slices/pizzaSlice";

const DetailedPizzaItem = () => {
    const {pizza} = useLocation().state;

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {customPizza, orders} = useSelector(state => state.pizza);

    useEffect(() => {
        dispatch(pizzaActions.setCustomPizza({...customPizza, ingredients: pizza.ingredients}));
    }, [])

    const handleNavigateToMainPage = () => {
        dispatch(pizzaActions.setCustomPizza({type: 'тонке', size: '26см'}));
        navigate(MAIN_ROUTES.MAIN);
    }

    const handleAddToCart = () => {
        const order = {
            id: Math.floor(Math.random() * 1000000000),
            ...customPizza,
            name: pizza?.name,
            price: pizza?.price,
            isForMainPage: false,
            dough: 'Тонке',
        }

        if (orders?.length > 0) {
            dispatch(pizzaActions.setOrders([...orders, order]));
        } else {
            dispatch(pizzaActions.setOrders([order]));
        }
        navigate(MAIN_ROUTES.SETTINGS);
    }

    const handleDeleteIngredient = (ingredient) => {
        const filteredIngredients = customPizza.ingredients.filter(item => item !== ingredient);
        dispatch(pizzaActions.setCustomPizza({...customPizza, ingredients: filteredIngredients}));
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.detailedPizzaItem}>
                <div className={styles.detailedPizzaItem_row}>
                    <PizzaItem pizza={pizza}/>
                    <div className={styles.detailedPizzaItem_ingredients}>
                        <h1 className={styles.detailedPizzaItem_ingredients_title}>INGREDIENTS</h1>
                        <ul className={styles.detailedPizzaItem_ingredients_wrapper}>
                            {
                                customPizza?.ingredients?.map((item, key) =>
                                    <div className={styles.ingredient} key={key}>
                                        <div className={styles.dot}></div>
                                        <li>{item}</li>
                                        <div
                                            onClick={() => handleDeleteIngredient(item)}
                                            className={styles.delete}
                                        >
                                            <div></div>
                                        </div>
                                    </div>)
                            }
                        </ul>
                    </div>
                </div>

                <div className={styles.detailedPizzaItem_buttons}>
                    <Button text={'Add to cart'} handleClick={handleAddToCart}/>
                    <Button text={'Back'} handleClick={handleNavigateToMainPage}/>
                </div>
            </div>
        </div>
    );
};

export default DetailedPizzaItem;