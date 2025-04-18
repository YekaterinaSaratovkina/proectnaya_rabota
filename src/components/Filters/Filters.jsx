import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getGenresFilmsApi } from '../../features/films/api/getGenresFilmsApi/getGenresFilmsApi';
import Button from '../UI/Button/Button';
import styles from './Filters.module.css'

const Filters = () => {
  const { data: getGenresFilms, isLoading: genersIsLoading, } = useQuery({
    queryKey: ["genresFilms"],
    queryFn: getGenresFilmsApi,
  });

  if (genersIsLoading) {
    <div>"Загрузка..."</div>
  }
  console.log(getGenresFilms);
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.titel}>Поиск по жанрам:</h1>
      </div>
      <div className={styles.container}>
        {getGenresFilms && getGenresFilms.length > 0 &&
          getGenresFilms.map(item => (
            <Button
              ganer={item.name}
            />
          ))}
      </div>
    </div>
  )
}

export default Filters