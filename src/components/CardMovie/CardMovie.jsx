import React, { useState, useEffect, useRef } from 'react';
import Poster from '../../assets/images/poster.jpg'
import styles from './CardMovie.module.css'
import Button from '../UI/Button/Button'
import { useNavigate } from 'react-router-dom'
import { addToWatchLater, isInWatchLater, removeFromWatchLater } from '../../features/films/services/watchLaterService.js';
import { Eye, Bookmark } from 'lucide-react';

const CardMovie = ({
    id,
    title,
    alternativeTitle,
    rating,
    poster,
    countries,
    year,
    genres,
    description,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [showToggle, setShowToggle] = useState(false);
    const descriptionRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (descriptionRef.current) {
            const isOverflowing = descriptionRef.current.scrollHeight > 120;
            setShowToggle(isOverflowing);
        }
    }, [description]);

    const handleCardClick = () => {
        navigate(`/film/${id}`);
    };

    const [inWatchLater, setInWatchLater] = useState(isInWatchLater(id));

    const handleAddToWatchLater = (e) => {
        e.stopPropagation();
        if (inWatchLater) {
            removeFromWatchLater(id);
        } else {
            addToWatchLater({
                id,
                title,
                rating,
                poster,
                countries,
                year,
                genres,
                description,
            });
        }
        setInWatchLater(!inWatchLater);
    };

    return (
        <div className={styles.container} onClick={handleCardClick}>
            <img className={styles.poster} src={poster ?? Poster} alt={title} />
            <div className={styles.info}>
                <h1 className={styles.movie_title}>
                    <b>{title ?? alternativeTitle}</b>
                </h1>
                <h1 className={styles.rating}>
                    Рейтинг: <b>{rating ?? 'N/A'}</b>
                </h1>
                <h2>Страна: <strong>{countries ?? 'нет информации'}</strong></h2>
                <h2>Год выпуска: <strong>{year ?? 'нет информации'}</strong></h2>
                <h3><strong>Жанр:</strong> {genres ?? 'нет информации'}</h3>
                <div
                    ref={descriptionRef}
                    className={`${styles.clampBlock} ${expanded ? styles.expanded : ''}`}
                >
                    <h3><strong>Описание:</strong> {description ?? 'нет информации'}</h3>
                </div>

                {showToggle && (
                    <button
                        className={styles.showMore}
                        onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(!expanded);
                        }}
                    >
                        {expanded ? 'Скрыть' : 'Показать больше'}
                    </button>
                )}

                <div className={styles.buttonGroup}>
                    <div>
                        <Button
                            name={
                                <div className={styles.button_watchLater}>
                                    <Eye style={{ marginRight: '6px', minWidth: '18px' }} />
                                    Смотреть
                                </div>
                            }
                            variant="light" />
                    </div>

                    <div onClick={handleAddToWatchLater}>
                        <Button
                            name={
                                <div className={styles.button_watchLater}>
                                    <Bookmark style={{ marginRight: '6px', minWidth: '18px' }} />
                                    {inWatchLater ? 'Удалить из "Посмотрю позже"' : 'Посмотрю позже'}
                                </div>
                            }
                            variant="outline"
                            onClick={handleAddToWatchLater}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardMovie;