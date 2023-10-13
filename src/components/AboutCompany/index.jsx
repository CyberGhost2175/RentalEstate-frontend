import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "../../axios";
import Typography from "@mui/material/Typography";
import {Box, FormControl, Input, InputAdornment, InputLabel, Button, Snackbar} from "@mui/material";
import styles from './about.module.scss'
export const AboutCo=()=>{



    return (
        <>
            <section className={styles.info}>

                <span className={styles.logo}>Rental Estate</span>
                <br/>
                <p>

                    Rental Estate™ открывает новые возможности и
                    упрощает процесс аренды жилья для отдыха. Владельцы
                    недвижимости доверяют нашей проверенной способности
                    обеспечить всесторонний уход за недвижимостью и непревзойденный
                    доход. Гости бронируют Rental Estate с уверенностью, полагаясь
                    на профессионально
                    обученный персонал, который поможет им найти именно то, что они ищут, и
                    точно знают, что они получат.

                </p>
            </section>



        </>
    );
}