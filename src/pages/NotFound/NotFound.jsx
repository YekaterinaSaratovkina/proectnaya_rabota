import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => (
    <div className={styles.wrapper}>
        <div className={styles.card}>
            <h1 className={styles.code}>Ошибка 404</h1>
            <p className={styles.message}>Упс… страницы не существует</p>
            <Link to="/" className={styles.button}>
                На главную
            </Link>
        </div>
    </div>
);

export default NotFound;
