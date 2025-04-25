import React, { useEffect, useState } from 'react';
import styles from './AboutTheFilm.module.css';
import { Bookmark } from 'lucide-react';
import Player from '../../assets/images/player.png';
import { useParams } from 'react-router-dom';
import { getFilmByIdApi } from '../../features/films/api/getFilmByIdApi/getFilmByIdApi';
import BackButton from '../../components/UI/BackButton/BackButton';
import Button from '../../components/UI/Button/Button';
import { addToWatchLater, isInWatchLater, removeFromWatchLater } from '../../features/films/services/watchLaterService';

const AboutTheFilm = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [inWatchLater, setInWatchLater] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFilmByIdApi(id);
        console.log(data);

        setFilm(data);
        setInWatchLater(isInWatchLater(data.id));
      } catch (error) {
        console.error('Ошибка при загрузке фильма:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleToggleWatchLater = () => {
    if (!film) return;

    if (inWatchLater) {
      removeFromWatchLater(film.id);
    } else {
      addToWatchLater({
        id: film.id,
        title: film.name,
        rating: film.rating?.kp,
        poster: film.poster?.url,
        countries: film.countries?.map(c => c.name).join(', '),
        year: film.year,
        genres: film.genres?.map(g => g.name).join(', '),
        description: film.description,
      });
    }
    setInWatchLater(!inWatchLater);
  };

  if (!film) return <div className={styles.loading}>Загрузка...</div>;

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.content}>
        <img
          src={film.poster?.url}
          alt={film.name}
          className={styles.poster}
        />
        <div className={styles.info}>
          <div className={styles.buttonGroup}>
            <Button
              name={
                <div className={styles.button_watchLater}>
                  <Bookmark style={{ marginRight: '6px', minWidth: '18px' }} />
                  {inWatchLater ? 'Удалить из "Посмотрю позже"' : 'Посмотрю позже'}
                </div>
              }
              variant="outline"
              onClick={handleToggleWatchLater}
            />
          </div>

          <h1>{film.name}</h1>
          <p>{film.description || 'Нет описания'}</p>
          <h3><strong>Жанры:</strong> {film.genres?.map(g => g.name).join(', ') || 'Нет информации'}</h3>
          <h3><strong>Год:</strong> {film.year || 'Нет информации'}</h3>
          <h3><strong>Рейтинг:</strong> {Number((film.rating?.kp ?? film.rating?.imdb)?.toFixed(1)) || 'Нет информации'}</h3>
          <h3>
            <strong>Режисер:</strong>{' '}
            {film.persons
              ?.filter(p => p.enProfession === 'director')
              .map(p => p.name)
              .join(', ') || 'Нет информации'}
          </h3>

          <h3>
            <strong>Актеры:</strong>{' '}
            {film.persons
              ?.filter(p => p.enProfession === 'actor')
              .slice(0, 5)
              .map(p => p.name)
              .join(', ') || 'Нет информации'}
          </h3>

        </div>
      </div>

      <h1 className={styles.watchTitle}>Смотреть:</h1>
      <div className={styles.playerWrapper}>
        <img
          src={Player}
          alt="player"
          className={styles.playerImage}
        />
      </div>
    </div>
  );
};

export default AboutTheFilm;