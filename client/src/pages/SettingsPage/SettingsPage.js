import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import styles from './SettingsPage.module.scss';
import cart from '../../assets/images/cart.svg';
import {updateUserValidator} from "../../validators/updateUser.validator";

const SettingsPage = () => {
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset,
        setValue
    } = useForm({
        resolver: joiResolver(updateUserValidator),
        mode: 'all',
    });

    const handleUpdateUser = () => {

    }

    return (
        <div className={styles.settingsPage_wrapper}>
            <div className={styles.settingsPage_wrapper_settingsPage}>
                <h1 className={styles.settingsPage_wrapper_settingsPage_title}>Особистий профіль</h1>

                <form
                    onSubmit={handleSubmit(handleUpdateUser)}
                    action={'#'}
                    className={styles.settingsPage_wrapper_settingsPage_form}
                >
                    <div className={styles.settingsPage_wrapper_settingsPage_form_block}>
                        <label>
                            <span>First name <sup>*</sup></span>
                            <input
                                type="text"
                                placeholder="First name"
                                {...register('first_name')}
                                className={styles.input}
                            />
                        </label>
                        {errors && <span className={styles.error}>{errors?.email?.message}</span>}
                    </div>

                    <div className={styles.settingsPage_wrapper_settingsPage_form_block}>
                        <label>
                            <span>Last name <sup>*</sup></span>
                            <input
                                type="text"
                                placeholder="Last name"
                                {...register('last_name')}
                                className={styles.input}
                            />
                        </label>
                        {errors && <span className={styles.error}>{errors?.password?.message}</span>}
                        {error && <span className={styles.error}>{error}</span>}
                    </div>
                    <button
                        disabled={!isValid}
                        type={"submit"}
                        className={styles.settingsPage_wrapper_settingsPage_form_button}
                    >Зберегти
                    </button>
                </form>

                <div className={styles.settingsPage_wrapper_settingsPage_cart}>
                    <div className={styles.settingsPage_wrapper_settingsPage_cart_title}>
                        <img src={cart} alt="shopping cart"/>
                        <h3>Корзина</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;