import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {Link, Navigate} from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {useSelector, useDispatch} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

export const Header = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        return <Navigate to="/" />;
    };
    const onClickLogout = () => {
        dispatch(logout());
        window.localStorage.removeItem('token')

        handleClose();
    };

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link className={styles.logo} to="/">
                        <div>RENTAL ESTATE</div>
                    </Link>
                    <div className={styles.buttons}>
                        {isAuth ? (
                            <>
                                <div className={styles.nav}>


                                <Link to="/add-post"  className={styles.buttons}>
                                    <div >Написать статью</div>
                                </Link>
                                <Link to="/profile"  className={styles.buttons} >
                                    <div >Профиль</div>
                                </Link>
                                <Button onClick={handleClickOpen} color="error">
                                    Выйти
                                </Button>
                                </div>



                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Выход из аккаунта</DialogTitle>
                                    <DialogContent>Вы действительно хотите выйти из аккаунта?</DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Отмена
                                        </Button>
                                        <Button onClick={onClickLogout} color="error">
                                            Выйти
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                        ) : (
                            <>
                            <div className={styles.nav}>
                                <Link to="/login" className={styles.buttons}>
                                    <div>Войти</div>
                                </Link>
                                <Link to="/register" className={styles.buttons}>
                                    <div >Создать аккаунт</div>
                                </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
