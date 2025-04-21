import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getGenresFilmsApi } from '../../features/films/api/getGenresFilmsApi/getGenresFilmsApi';
import Button from '../UI/Button/Button';
import styles from './Filters.module.css'
import { getCountriesFilmsApi } from '../../features/films/api/getCountriesFilmsApi/getCountriesFilmsApi';
import { getStudioFilmsApi } from '../../features/films/api/getStudioFilmsApi/getStudioFilmsApi';

const Filters = () => {
  const { data: getGenresFilms, isLoading: genersIsLoading, } = useQuery({
    queryKey: ["genresFilms"],
    queryFn: getGenresFilmsApi,
  });

  const { data: getCountriesFilms, isLoading: countriesIsLoading, } = useQuery({
    queryKey: ["countriesFilms"],
    queryFn: getCountriesFilmsApi,
  });

  const { data: getStudioFilms, isLoading: studioIsLoading, } = useQuery({
    queryKey: ["studioFilms"],
    queryFn: getStudioFilmsApi,
  });

  if (genersIsLoading || countriesIsLoading || studioIsLoading) {
    <div>"Загрузка..."</div>
  }

  const allCountries = getCountriesFilms ? getCountriesFilms.flat() : [];
  // const allStudio = getStudioFilms ? getStudioFilms.
  console.log(getStudioFilms);
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.titel}>Поиск по фильтрам:</h1>
      </div>
      <div className={styles.dropdownWrapper}>
        <label htmlFor="countrySelect" className={styles.dropdownLabel}>
          Страна:
        </label>
        <select id="countrySelect" className={styles.dropdownSelect}>
          <option value="">-Не выбрано-</option>
          {allCountries.map((country, index) => (
            <option key={index} value={country.slug}>
              {country.name}
            </option>
          ))}
        </select>

        <label htmlFor="countrySelect" className={styles.dropdownLabel}>
          Студия:
        </label>
        <select id="countrySelect" className={styles.dropdownSelect}>
          <option value="">-Не выбрано-</option>
          {allCountries.map((country, index) => (
            <option key={index} value={country.slug}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <label htmlFor="countrySelect" className={styles.dropdownLabel}>
        Жанр:
      </label>
      <div className={styles.container}>
        {getGenresFilms?.length > 0 &&
          getGenresFilms.map(item => (
            <Button
              name={item.name}
            />
          ))}
      </div>


    </div>
  )
}

export default Filters