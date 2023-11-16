import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import styles from './SignUpPage.module.scss';
import {authService} from "../../services/auth.service";
import {registrationValidator} from "../../validators/registration.validator";
import {getHttpErrorMessageByStatus} from "../../assets/getHttpErrorMessageByStatus";

const SignUpPage = () => {
    const [error, setError] = useState(null);

    const handleSignUp = async (data) => {
        try {
            await authService.signUp(data);
        } catch (error) {
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
        resolver: joiResolver(registrationValidator),
        mode: 'all',
    });

    return (
        <div className={styles.signUpPage_wrapper}>
            <div className={styles.signUpPage_wrapper_signUp}>
                <div className={styles.signUpPage_wrapper_signUp_title}>
                    <h1 className={styles.title}>Sign up</h1>
                </div>

                <form
                    onSubmit={handleSubmit(handleSignUp)}
                    action="#"
                    className={styles.signUpPage_wrapper_signUp_form}>
                    <div className={styles.signUpPage_wrapper_signUp_form_block}>
                        <label>
                            <span>First name <sup>*</sup></span>
                            <input
                                type="text"
                                placeholder="First name"
                                {...register('first_name')}
                                className={styles.input}
                            />
                        </label>
                        {errors && <span className={styles.error}>{errors?.first_name?.message}</span>}
                    </div>

                    <div className={styles.signUpPage_wrapper_signUp_form_block}>
                        <label>
                            <span>Last name <sup>*</sup></span>
                            <input
                                type="text"
                                placeholder="Last name"
                                {...register('last_name')}
                                className={styles.input}
                            />
                        </label>
                        {errors && <span className={styles.error}>{errors?.last_name?.message}</span>}
                    </div>

                    <div className={styles.signUpPage_wrapper_signUp_form_block}>
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

                    <div className={styles.signUpPage_wrapper_signUp_form_block}>
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
                        {error && <div className={styles.error}>{error}</div>}
                    </div>
                    <button
                        disabled={!isValid}
                        type={"submit"}
                        className={styles.signUpPage_wrapper_signUp_form_button}
                    >Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;