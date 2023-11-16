import React from 'react';

import styles from './TypesOfPizza.module.scss';

const TypesOfPizza = () => {
    const [selectedPizzaType, setSelectedPizzaType] = React.useState('Всі');

    const handleSelectPizzaType = (type) => {
        setSelectedPizzaType(type);
    }

    return (
        <ul className={styles.types}>
            <li
                className={selectedPizzaType === 'Всі' ? styles.active : null}
                onClick={() => handleSelectPizzaType('Всі')}
            >Всі</li>
            <li
                className={selectedPizzaType === 'М\'ясні' ? styles.active : null}
                onClick={() => handleSelectPizzaType('М\'ясні')}
            >М'ясні</li>
            <li
                className={selectedPizzaType === 'Вегетаріанські' ? styles.active : null}
                onClick={() => handleSelectPizzaType('Вегетаріанські')}
            >Вегетаріанські</li>
            <li
                className={selectedPizzaType === 'Гриль' ? styles.active : null}
                onClick={() => handleSelectPizzaType('Гриль')}
            >Гриль</li>
            <li
                className={selectedPizzaType === 'Гострі' ? styles.active : null}
                onClick={() => handleSelectPizzaType('Гострі')}
            >Гострі</li>
        </ul>
    );
};

export default TypesOfPizza;