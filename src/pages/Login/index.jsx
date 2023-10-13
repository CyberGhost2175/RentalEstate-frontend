import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useForm} from 'react-hook-form';
import styles from "./Login.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {Link, Navigate} from "react-router-dom";
import {fetchAuth, selectIsAuth} from "../../redux/slices/auth";
import MuiAlert from "@mui/material/Alert";
import {Snackbar} from "@mui/material";

export const Login = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const isAdmin = useState(false);

    const {
        register, handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            email: 'asanali.itstep@mail.ru',
            password: 'ReactDev222',
        },
        mode: 'onChange'

    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));

        if (!data.payload) {
            setSnackbarOpen(true);
        }
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }

    }
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (isAuth) {
        return <Navigate to="/"/>;
    }
    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    type="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {required: 'Укажите почту'})}

                    fullWidth
                />
                <TextField className={styles.field} label="Пароль"
                           error={Boolean(errors.password?.message)}
                           helperText={errors.password?.message}
                           fullWidth
                           type="password"
                           {...register('password', {required: 'Укажите пароль'})}

                />

                <Link className={styles.forgetBlock} to="/ForgetPass">Забыли пароль ?</Link>

                <Button type="submit" size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert onClose={handleSnackbarClose} severity="error" sx={{width: "100%"}}>
                    Неверный логин или пароль
                </MuiAlert>
            </Snackbar>
        </Paper>
    );
};
