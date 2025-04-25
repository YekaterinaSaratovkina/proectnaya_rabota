import React, { useEffect, useState } from 'react';
import styles from './WatchLater.module.css';
import BackButton from '../../components/UI/BackButton/BackButton';
import { getWatchLater } from '../../features/films/services/watchLaterService';
import CardMovie from '../../components/CardMovie/CardMovie';

const WatchLater = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const storedFilms = getWatchLater();
    setFilms(storedFilms);
  }, []);

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.header}>
        <h2 className={styles.title}>Список "Посмотреть позже"</h2>
      </div>

      {films.length === 0 ? (
        <p className={styles.filmsList}>Здесь пока пусто</p>
      ) : (
        <div>
          {films.map(film => (
            <CardMovie key={film.id} {...film} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchLater;
