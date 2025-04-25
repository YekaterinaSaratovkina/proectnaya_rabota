import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { Bookmark } from 'lucide-react';
import Search from '../Search/Search';
import Logo from '../../assets/images/Logo.svg'
import { PageRoutes } from '../../constans/PageRoutes';

const Header = () => {
    const navigate = useNavigate();

    const handleFavoritesClick = () => {
        navigate(PageRoutes.CHOSEN.MAIN);
    };

    return (
        <header className={styles.header}>
            <div className={styles.brand} onClick={() => navigate('/')}>
                <img src={Logo} alt="Logo" className={styles.logo} />
                <h1 className={styles.title}>КИНО</h1>
            </div>
            <div className={styles.headerBtns}>
                <Search />
                <div className={styles.favorites} onClick={handleFavoritesClick}>
                    <Bookmark className={styles.favoritesIcon} />
                </div>
            </div>
        </header>
    )
}
export default Header