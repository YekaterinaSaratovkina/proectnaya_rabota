import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { getGenresFilmsApi } from '../../features/films/api/getGenresFilmsApi/getGenresFilmsApi';
import Button from '../UI/Button/Button';
import styles from './Filters.module.css'
import { getCountriesFilmsApi } from '../../features/films/api/getCountriesFilmsApi/getCountriesFilmsApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import { PageRoutes } from '../../constans/PageRoutes';

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: getGenresFilms, isLoading: genersIsLoading, } = useQuery({
    queryKey: ["genresFilms"],
    queryFn: getGenresFilmsApi,
  });

  const { data: getCountriesFilms, isLoading: countriesIsLoading, } = useQuery({
    queryKey: ["countriesFilms"],
    queryFn: getCountriesFilmsApi,
  });

  const allCountries = getCountriesFilms ? getCountriesFilms.flat() : [];
  const [selectedGenre, setSelectedGenre] = useState(() => searchParams.get("genre") || "");
  const [selectedCountry, setSelectedCountry] = useState(() => searchParams.get("country") || "");
  const [selectedAge, setSelectedAge] = useState(() => searchParams.get("age") || "");
  const [selectedRating, setSelectedRating] = useState(() => searchParams.get("rating") || "");


  const ageOptions = [6, 12, 16, 18];
  const ratingOptions = [
    { label: '0–5', value: '0-5' },
    { label: '5–7', value: '5-7' },
    { label: '7–10', value: '7-10' },
  ];

  const navigate = useNavigate();

  const handleApply = (e) => {
    e.preventDefault()
    const params = {};

    if (selectedGenre) params.genre = selectedGenre;
    if (selectedCountry) params.country = selectedCountry;
    if (selectedAge) params.age = selectedAge;
    if (selectedRating) params.rating = selectedRating;
    console.log("УСТАНАВЛИВАЮ ПАРАМЕТРЫ:", params);
    // navigate(PageRoutes.COMMON.MAIN);
    setSearchParams(params);
  };

  const handleReset = () => {
    setSelectedGenre('');
    setSelectedCountry('');
    setSelectedAge('');
    setSelectedRating('');
    setSearchParams({});
  };


  if (genersIsLoading || countriesIsLoading) {
    return <div>"Загрузка..."</div>
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Поиск по фильтрам:</h1>
      </div>

      <div className={styles.filterBlock}>
        <label className={styles.dropdownLabel}>Возраст:</label>
        <div className={styles.buttonGroup}>
          {ageOptions.map((age) => (
            <Button
              key={age}
              name={`${age}+`}
              onClick={() =>
                setSelectedAge((prev) => (prev === String(age) ? '' : String(age)))
              }
              variant={selectedAge === String(age) ? 'dark' : 'light'}
            />
          ))}

        </div>
      </div>

      <div className={styles.filterBlock}>
        <label className={styles.dropdownLabel}>Рейтинг:</label>
        <div className={styles.buttonGroup}>
          {ratingOptions.map(({ label, value }) => (
            <Button
              key={value}
              name={label}
              onClick={() =>
                setSelectedRating((prev) => (prev === value ? '' : value))
              }
              variant={selectedRating === value ? 'dark' : 'light'}
            />
          ))}


        </div>
      </div>

      <div className={styles.dropdownWrapper}>
        <label htmlFor="countrySelect" className={styles.dropdownLabel}>Страна:</label>
        <select
          id="countrySelect"
          className={styles.dropdownSelect}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">-не выбрано-</option>
          {allCountries.map((country, index) => (
            <option key={index} value={country.name}>{country.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.dropdownWrapper}>
        <label htmlFor="genreSelect" className={styles.dropdownLabel}>Жанр:</label>
        <select
          id="genreSelect"
          className={styles.dropdownSelect}
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">-не выбрано-</option>
          {getGenresFilms?.map((g) => (
            <option key={g.id} value={g.name}>{g.name}</option>
          ))}
        </select>
      </div>

      <button className={styles.applyButton} onClick={handleApply}>Применить</button>
      <button className={styles.resetButton} onClick={handleReset}>Сбросить</button>

    </div>
  );
};

export default Filters