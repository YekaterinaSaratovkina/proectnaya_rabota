import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { ChevronLeft, Bell, User, Star } from 'lucide-react';
import Search from '../Search/Search';
import Logo from '../../assets/images/Logo.png'
import { headerData } from './Header.data';

const Header = ({
    heading,
    proccessBack,
}) => {
    return (
        <header className={styles.header}>
            <div className={styles.content}>
                <img
                    src={Logo}
                    alt="Logo"
                    className={styles.logo}
                />
                <h1>КИНО</h1>
            </div>
            <div className={styles.headerBtns}>
                <Search />
                <button className={styles.favorites}>
                    <Star className={styles.favoritesIcon} width={16} height={16} />
                </button>
            </div>

        </header>
    )
}
export default Header
