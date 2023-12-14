import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../axios";
import Typography from "@mui/material/Typography";
import {Box, FormControl, Input, InputAdornment, InputLabel, Button, Snackbar} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import styles from './UserDetails.module.scss';
import MuiAlert from "@mui/material/Alert";

export const UserDetails = () => {
    const [userData, setUserData] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/users/me');
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);


    const fetchUserData = async () => {
        try {
            const response = await axios.get('/users/me');
            setUserData(response.data);
            setFullName(response.data.fullName);
            setEmail(response.data.email);
            setPhoneNumber(response.data.phoneNumber);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    const handleUpdateProfile = async () => {
        try {
            await axios.patch('/users/me', {
                fullName,
                email,
                phoneNumber,
            });
            fetchUserData();
            setIsSnackbarOpen(true);
            console.log('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };
    const handleCloseSnackbar = () => {
        setIsSnackbarOpen(false);
    };



    React.useEffect(() => {
        fetchUserData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Box className={styles.BoxInfo}>
                        <Avatar src={`http://localhost:4444${userData.imageUrl}`} alt="User Avatar"
                                sx={{width: 120, height: 120, mx: 'auto'}}/>

                <Typography variant="h6" align="center">
                    Edit profile
                </Typography>
                <div className={styles.info}>


                    <FormControl margin="normal">
                        <InputLabel htmlFor="fullName">Full name</InputLabel>
                        <Input
                            id="fullName"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </FormControl>
                    <br/>
                    <FormControl margin="normal">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <br/>
                    <FormControl margin="normal">
                        <InputLabel htmlFor="phoneNumber">Phone number</InputLabel>
                        <Input
                            id="phoneNumber"
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </FormControl>
                    <br/>
                    <Button variant="contained" onClick={handleUpdateProfile}>
                        Save
                    </Button>
                </div>

            </Box>

            <Snackbar open={isSnackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{width: '100%'}}>
                    Изменения успешно сохранены
                </MuiAlert>
            </Snackbar>

        </>
    );

}


