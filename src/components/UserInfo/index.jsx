import React from 'react';
import styles from './UserInfo.module.scss';

export const UserInfo = ({ imageUrl, fullName, additionalText,phoneNumber }) => {
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={`http://localhost:4444${imageUrl}` || '/noavatar.png'} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{additionalText}</span>
        <span className={styles.phoneNumber}>{phoneNumber}</span>
      </div>
    </div>
  );
};