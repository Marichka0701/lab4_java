import React from 'react';

import styles from './PizzaItem.module.scss';
import pizza from '../../../assets/images/pizza/pepperoni.svg';

const PizzaItem = () => {
    const [pizzaType, setPizzaType] = React.useState('тонке');
    const [pizzaSize, setPizzaSize] = React.useState('26см');

    const handleSelectPizzaType = (type) => {
        setPizzaType(type);
    }

    const handleSelectPizzaSize = (size) => {
        setPizzaSize(size);
    }

    return (
        <div className={styles.pizza}>
            <div className={styles.pizza_icon}>
                <img src={pizza} alt="pizza icon"/>
            </div>

            <div className={styles.pizza_info}>
                <h3>Пепероні</h3>

                <div className={styles.pizza_info_additional}>
                    <ul className={styles.pizza_info_additional_type}>
                        <li
                            className={pizzaType === 'тонке' ? styles.active : null}
                            onClick={() => handleSelectPizzaType('тонке')}
                        >тонке</li>
                        <li
                            className={pizzaType === 'традиційне' ? styles.active : null}
                            onClick={() => handleSelectPizzaType('традиційне')}
                        >традиційне</li>
                    </ul>

                    <ul className={styles.pizza_info_additional_size}>
                        <li
                            className={pizzaSize === '26см' ? styles.active : null}
                            onClick={() => handleSelectPizzaSize('26см')}
                        >26см</li>
                        <li
                            className={pizzaSize === '30см' ? styles.active : null}
                            onClick={() => handleSelectPizzaSize('30см')}
                        >30см</li>
                        <li
                            className={pizzaSize === '40см' ? styles.active : null}
                            onClick={() => handleSelectPizzaSize('40см')}
                        >40см</li>
                    </ul>
                </div>

                <div className={styles.pizza_info_priceContainer}>
                    <p className={styles.pizza_info_priceContainer_price}>від 199грн</p>
                    <button className={styles.pizza_info_priceContainer_add}>У корзину</button>
                </div>
            </div>
        </div>
    );
};

export default PizzaItem;