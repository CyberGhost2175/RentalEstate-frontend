import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {Link, Navigate} from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {useSelector, useDispatch} from "react-redux";
import {logout, selectIsAuth} from "../../redux/slices/auth";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
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
                    <div>
                        {isAuth ? (
                            <>
                                <div className={styles.nav}>


                                <Link to="/add-post"  className={styles.buttons}>
                                    <div> <FontAwesomeIcon icon={faCirclePlus}  className={styles.icons}/>Create post</div>
                                </Link>

                                <Link to="/profile"  className={styles.buttons} >

                                    <div><FontAwesomeIcon icon={faUser} className={styles.icons} />Profile</div>
                                </Link>
                                    <div className={styles.btnLogout}>
                                        <Button onClick={handleClickOpen} color="error" >
                                            <FontAwesomeIcon className={styles.icons} icon={faRightFromBracket} /> Log out
                                        </Button>
                                    </div>


                                </div>



                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Exit from an account</DialogTitle>
                                    <DialogContent>Do you really want to log out of your account?</DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={onClickLogout} color="error">
                                            Log out
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </>
                        ) : (
                            <>
                            <div className={styles.nav}>
                                <Link to="/login" className={styles.buttons}>
                                    <div>Sign in</div>
                                </Link>
                                <Link to="/register" className={styles.buttons}>
                                    <div >Sign up</div>
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
