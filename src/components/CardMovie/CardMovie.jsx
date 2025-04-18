import React from 'react'
import Poster from '../../assets/images/poster.jpg'
import styles from './CardMovie.module.css'

const CardMovie = ({
    title,
    alternativeTitle,
    rating,
    poster,
    countries,
    year,
    genres,
    description,
    persons,
}) => {
    return (
        <div className={styles.container}>
            <img className={styles.poster} src={poster ?? Poster} alt={title} />
            <div className={styles.info}>
                <h1 className={styles.movie_title}>
                    <b>{title ?? alternativeTitle}</b>
                </h1>
                <h1 className={styles.rating}>
                    Рейтинг: <b>{rating}</b>
                </h1>
                <h2>
                    Страна: <strong>{countries ?? 'нет информации'}</strong>
                </h2>
                <h2>
                    Год выпуска: <strong>{year ?? 'нет информации'}</strong>
                </h2>
                <h3>
                    <strong>Жанр:</strong> {genres ?? 'нет информации'}
                </h3>
                <h3>
                    <strong>Описание:</strong> {description ?? 'нет информации'}
                </h3>
                <h3>
                    <strong>Актеры:</strong> {persons ?? 'нет информации'}
                </h3>
            </div>
        </div>
    )
}

export default CardMovie

//актеры сценаристы
//убрать мета с одними запятыми