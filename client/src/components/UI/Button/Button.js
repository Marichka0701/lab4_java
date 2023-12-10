import React from 'react';

import styles from './Button.module.scss';

const Button = ({text, handleClick}) => {
    return (
        <div
            className={styles.button}
            onClick={handleClick}
        >
            {text}
        </div>
    );
};

export default Button;