import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { getGenresFilmsApi } from '../../features/films/api/getGenresFilmsApi/getGenresFilmsApi';
import { getCountriesFilmsApi } from '../../features/films/api/getCountriesFilmsApi/getCountriesFilmsApi';
import Button from '../UI/Button/Button';
import styles from './Filters.module.css';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: genres = [], isLoading: loadingGenres } = useQuery({
    queryKey: ['genresFilms'],
    queryFn: getGenresFilmsApi,
  });
  const { data: countries = [], isLoading: loadingCountries } = useQuery({
    queryKey: ['countriesFilms'],
    queryFn: getCountriesFilmsApi,
  });

  const [selectedGenre, setSelectedGenre] = useState(searchParams.get('genre') || '');
  const [selectedCountry, setSelectedCountry] = useState(searchParams.get('country') || '');
  const [selectedAge, setSelectedAge] = useState(searchParams.get('age') || '');
  const [selectedRating, setSelectedRating] = useState(searchParams.get('rating') || '');

  const ageOptions = [6, 12, 16, 18];
  const ratingOptions = [
    { label: '0–5', value: '0-5' },
    { label: '5–7', value: '5-7' },
    { label: '7–10', value: '7-10' },
  ];

  const handleApply = e => {
    e.preventDefault();

    const params = {};
    if (selectedGenre) params.genre = selectedGenre;
    if (selectedCountry) params.country = selectedCountry;
    if (selectedAge) params.age = selectedAge;
    if (selectedRating) params.rating = selectedRating;
    params.apply = 'true';

    const searchString = new URLSearchParams(params).toString();

    if (location.pathname !== '/') {
      navigate({
        pathname: '/',
        search: `?${searchString}`,
      });
    } else {
      setSearchParams(params);
    }
  };

  const handleReset = () => {
    setSelectedGenre('');
    setSelectedCountry('');
    setSelectedAge('');
    setSelectedRating('');
    setSearchParams({});
  };

  if (loadingGenres || loadingCountries) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  return (
    <form className={styles.wrapper} onSubmit={handleApply}>
      <h2 className={styles.heading}>Поиск по фильтрам:</h2>

      <div className={styles.filterRow}>
        <label className={styles.label}>Возраст:</label>
        <div className={styles.buttonGroup}>
          {ageOptions.map(age => (
            <Button
              key={age}
              name={`${age}+`}
              onClick={() =>
                setSelectedAge(prev => (prev === String(age) ? '' : String(age)))
              }
              variant={selectedAge === String(age) ? 'dark' : 'light'}
            />
          ))}
        </div>
      </div>

      <div className={styles.filterRow}>
        <label className={styles.label}>Рейтинг:</label>
        <div className={styles.buttonGroup}>
          {ratingOptions.map(({ label, value }) => (
            <Button
              key={value}
              name={label}
              onClick={() =>
                setSelectedRating(prev => (prev === value ? '' : value))
              }
              variant={selectedRating === value ? 'dark' : 'light'}
            />
          ))}
        </div>
      </div>

      <div className={styles.dropdownWrapper}>
        <label htmlFor="countryInput" className={styles.label}>Страна:</label>
        <input
          id="countryInput"
          list="countryList"
          className={styles.dropdownInput}
          placeholder="- не выбрано -"
          value={selectedCountry}
          onChange={e => setSelectedCountry(e.target.value)}
        />
        <datalist id="countryList">
          {countries.flat().map((c, i) => (
            <option key={i} value={c.name} />
          ))}
        </datalist>
      </div>

      <div className={styles.dropdownWrapper}>
        <label htmlFor="genreInput" className={styles.label}>Жанр:</label>
        <input
          id="genreInput"
          list="genreList"
          className={styles.dropdownInput}
          placeholder="- не выбрано -"
          value={selectedGenre}
          onChange={e => setSelectedGenre(e.target.value)}
        />
        <datalist id="genreList">
          {genres.map(g => (
            <option key={g.id} value={g.name} />
          ))}
        </datalist>
      </div>

      <div className={styles.actions}>
        <Button
          type="submit"
          className={styles.applyButton}
          name="Применить"
        />
        <Button
          type="button"
          className={styles.resetButton}
          variant="light"
          onClick={handleReset}
          name="Сбросить"
        />
      </div>
    </form>
  );
};

export default Filters;