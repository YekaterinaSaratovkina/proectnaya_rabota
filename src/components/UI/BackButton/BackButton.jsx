import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import styles from './BackButton.module.css';

const BackButton = ({ label = "Назад" }) => {
    const navigate = useNavigate();

    return (
        <button className={styles.backButton} onClick={() => navigate(-1)}>
            <ChevronLeft className={styles.icon} />
            <span>{label}</span>
        </button>
    );
};

export default BackButton;
