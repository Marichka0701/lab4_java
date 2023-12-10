import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useDispatch, useSelector} from "react-redux";

import styles from './SettingsPage.module.scss';
import cart from '../../assets/images/cart.svg';
import {updateUserValidator} from "../../validators/updateUser.validator";
import {userActions} from "../../store/slices/userSlice";
import CurrentOrders from "../../components/CurrentOrders/CurrentOrders";

const SettingsPage = () => {
    const [error, setError] = useState(null);
    const [option, setOption] = useState('Корзина');

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

    const dispatch = useDispatch();
    const {user, id} = useSelector(state => state.user);

    const handleUpdateUser = async (data) => {
        await dispatch(userActions.updateById({id, data}));

        alert('You have successfully updated your profile');
    }

    useEffect(() => {
        reset({
            first_name: user.first_name,
            last_name: user.last_name,
        });
    }, [user])

    const handleSelectOption = (option) => {
        setOption(option);
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
                    <div className={styles.settingsPage_wrapper_settingsPage_cart_container}>
                        <div
                            className={`${styles.settingsPage_wrapper_settingsPage_cart_container_title} ${option === 'Корзина' ? styles.active : ''}`}
                            onClick={() => handleSelectOption('Корзина')}
                        >
                            <img src={cart} alt="shopping cart"/>
                            <h3>Корзина</h3>
                        </div>

                        <div
                            className={`${styles.settingsPage_wrapper_settingsPage_cart_container_title} ${option === 'Історія замовлень' ? styles.active : ''}`}
                            onClick={() => handleSelectOption('Історія замовлень')}
                        >
                            Історія замовлень
                        </div>
                    </div>

                    {
                        option === 'Корзина' && <CurrentOrders/>
                    }

                    {
                        // option === 'Корзина' && <HistoryOrders/>
                    }
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;