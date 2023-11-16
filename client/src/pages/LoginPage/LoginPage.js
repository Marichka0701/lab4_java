import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useNavigate} from "react-router-dom";

import styles from './LoginPage.module.scss';
import {authService} from "../../services/auth.service";
import {loginValidator} from "../../validators/login.validator";
import {getHttpErrorMessageByStatus} from "../../assets/getHttpErrorMessageByStatus";
import {MAIN_ROUTES} from "../../routing/mainRoutes";

const LoginPage = () => {
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (data) => {
        try {
            const {data: resData} = await authService.login(data);

            navigate(MAIN_ROUTES.MAIN)

            localStorage.setItem("token", JSON.stringify(resData));
        }
        catch (error) {
            const errorMessage = getHttpErrorMessageByStatus(error);
            setError(errorMessage);
        }
    };

    const {
        register,
        handleSubmit,
        formState: {errors, isValid},
        reset,
        setValue
    } = useForm({
        resolver: joiResolver(loginValidator),
        mode: 'all',
    });

    return (
        <div className={styles.loginPage_wrapper}>
            <div className={styles.loginPage_wrapper_login}>
                <div className={styles.loginPage_wrapper_login_title}>
                        <h1 className={styles.title}>Login to your account</h1>
                </div>

                <form
                    onSubmit={handleSubmit(handleLogin)}
                    action="#"
                    className={styles.loginPage_wrapper_login_form}>
                    <div className={styles.loginPage_wrapper_login_form_block}>
                        <label>
                            <span>Email <sup>*</sup></span>
                            <input
                                type="text"
                                placeholder="Email"
                                {...register('email')}
                                className={styles.input}
                            />
                        </label>
                        {errors && <span className={styles.error}>{errors?.email?.message}</span>}
                    </div>

                    <div className={styles.loginPage_wrapper_login_form_block}>
                        <label>
                            <span>Password <sup>*</sup></span>
                            <input
                                type="password"
                                placeholder="Password"
                                {...register('password')}
                                className={styles.input}
                            />
                        </label>
                        {errors && <span className={styles.error}>{errors?.password?.message}</span>}
                        {error && <span className={styles.error}>{error}</span>}
                    </div>
                    <button
                        disabled={!isValid}
                        type={"submit"}
                        className={styles.loginPage_wrapper_login_form_button}
                    >Sign in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;