import React, {useRef, useState} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {fetchRegister, selectIsAuth} from "../../redux/slices/auth";
import {useForm} from "react-hook-form";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "../../axios";
import {Alert, Snackbar} from "@mui/material";

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth);
    const [isRegistered, setIsRegistered] = useState(false);
    const dispatch = useDispatch();
    const inputFileRef =useRef(null);
    const {
        register, handleSubmit,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            imageUrl: '',
            password: '',
            phoneNumber:'+7',
        },
        mode: 'onChange'

    });
    const navigate = useNavigate();
    const [isDuplicateUser, setIsDuplicateUser] = useState(false);
    const [imageUrl, setAvatarUrl] = useState('');
    const isValidPhoneNumber = (phoneNumber) => {
        const numericRegex = /^[0-9]+$/;
        const kzPhoneNumberRegex = /^(\+7|8)?[7-7]\d{9}$/;

        return numericRegex.test(phoneNumber) && kzPhoneNumberRegex.test(phoneNumber);
    };
    const onSubmit = async (values) => {
        try {
            let data = values;
            if (imageUrl) {
                data = { ...values, imageUrl: imageUrl };
            }
            const response = await dispatch(fetchRegister(data));
            if (!response.payload) {
                setIsDuplicateUser(true);
                return;
            }

            if ('token' in response.payload) {
                window.localStorage.setItem('token', response.payload.token);
                setIsRegistered(true);



                await axios.post('/send-registration-email', {
                    email: values.email,
                });

                navigate('/');
                return;
            }
        } catch (err) {
            console.warn(err)
        }
    }

    const handleAvatarClick = () => {
        inputFileRef.current.click();
    };
    const handleSnackbarClose = () => {
        setIsDuplicateUser(false);
    };
    const handleAvatarUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('/upload-avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { url } = response.data;
            setAvatarUrl(url);
        } catch (error) {
            console.error('Error uploading avatar:', error);
        }
    };
    if (isAuth) {
        return <Navigate to="/" />;
    }

    const onClickRemoveImage = async () => {

        setAvatarUrl('');
    };

    console.log(imageUrl)
    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Creating an account
            </Typography>

                <div className={styles.avatar} onClick={handleAvatarClick}>

                    {imageUrl ? (
                        <Avatar
                            src={`http://localhost:4444${imageUrl}`}  sx={{ width: 100, height: 100 }} />
                    ) : (
                        <Avatar sx={{ width: 100, height: 100 }} />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        ref={inputFileRef}
                        style={{ display: 'none' }}
                        onChange={handleAvatarUpload}

                    />
                </div>


            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    name="fullName"
                    {...register('fullName', {required: 'enter the name'})}
                    className={styles.field} label="Full name" fullWidth/>
                <TextField
                    type="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {required: 'enter the  email'})}
                    className={styles.field} label="E-Mail" fullWidth/>



                <TextField
                    {...register('phoneNumber', {
                        required: 'enter the phone number',
                        pattern: {
                            value: /^\+7\d{10}$/,

                            message: 'Invalid format of phone number',
                        },
                    })}
                    inputMode="numeric"
                    className={styles.field}
                    label="phone number"
                    error={Boolean(errors.phoneNumber?.message)}
                    helperText={errors.phoneNumber?.message}
                    fullWidth
                />




                <TextField
                    type="password"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', {required: 'enter the  password'})}

                    className={styles.field} label="password" fullWidth/>

                <Button disabled={!isValid}
                        type="submit" size="large" variant="contained" fullWidth>
                    Sign up
                </Button>
            </form>
            <Snackbar open={isDuplicateUser} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="warning">
                    user with that email or phone number already exsist !

                </Alert>
            </Snackbar>
        </Paper>

    );

};
