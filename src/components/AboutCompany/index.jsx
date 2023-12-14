import React, {useEffect, useState} from 'react';

import styles from './about.module.scss'
export const AboutCo=()=>{



    return (
        <>
            <section className={styles.info}>

                <span className={styles.logo}>Rental Estate</span>
                <br/>
                <p>

                    Rental Estate
                    Rental Estate ™ opens up new opportunities and simplifies
                    the process of renting a holiday home. Property owners trust
                    our proven ability to provide comprehensive property care and
                    an unsurpassed income. Guests book a Rental Estate with confidence,
                    relying on professionally
                    trained staff who will help them find exactly what they are looking
                    for and know exactly what they will get.

                </p>
            </section>



        </>
    );
}