import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { useQuery } from '@tanstack/react-query';
import { getRandomFilmsApi } from '../../features/films/api/getRandomFilmsApi/getRandomFilmsApi';
import CardMovie from '../../components/CardMovie/CardMovie';
import { getSearchFilmsApi } from '../../features/films/api/getSearchFilmsApi/getSearchFilmsApi';
import { useSearchParams } from 'react-router-dom';
import { getFilmByFilters } from '../../features/films/api/getFilmBuFilters/getFilmBuFilters';

const Home = () => {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("query");

  const [filters, setFilters] = useState({
    genre: null,
    rating: null,
    age: null,
    country: null,
  });

  useEffect(() => {
    setFilters({
      genre: searchParams.get("genre"),
      rating: searchParams.get("rating"),
      age: searchParams.get("age"),
      country: searchParams.get("country"),
    });
  }, [searchParams]);

  useEffect(() => {
    setPage(1);
  }, [filters, searchValue]);

  const { data: randomFilmsData, isLoading: filmsIsLoading } = useQuery({
    queryKey: ["randomFilms"],
    queryFn: getRandomFilmsApi,
    enabled: !searchValue && !Object.values(filters).some(Boolean),
  });

  const { data: searchFilmsData, isLoading: searchIsLoading } = useQuery({
    queryKey: ["searchFilms", searchValue, page],
    queryFn: () => getSearchFilmsApi(searchValue, page),
    enabled: !!searchValue
  });


  const apply = searchParams.get("apply") === "true";
  const shouldUseFilters = apply && Object.values(filters).some(Boolean) && !searchValue;

  const { data: filteredFilmsData, isLoading: filterIsLoading } = useQuery({
    queryKey: ["filteredFilms", filters, page],
    queryFn: () => getFilmByFilters(filters, page),
    enabled: shouldUseFilters,
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });
  console.log(filteredFilmsData);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, searchValue]);

  if (filmsIsLoading || searchIsLoading || filterIsLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }
  const renderFilms = () => {
    if (searchValue && searchFilmsData?.docs?.length > 0) {
      return searchFilmsData.docs.map((film) => (
        <CardMovie
          key={film.id}
          id={film.id}
          title={film.name}
          alternativeTitle={film.alternativeName}
          poster={film.poster?.url}
          year={film.year}
          description={film.description}
          rating={Number((film.rating?.kp ?? film.rating?.imdb)?.toFixed(1))}
          countries={film.countries?.map((b) => b.name)}
          genres={film.genres?.map((c) => c.name).join(", ")}
        />
      ));
    }

    if (shouldUseFilters && filteredFilmsData?.docs?.length > 0) {
      return filteredFilmsData.docs.map((film) => (
        <CardMovie
          key={film.id}
          id={film.id}
          title={film.name}
          alternativeTitle={film.alternativeName}
          poster={film.poster?.url}
          year={film.year}
          description={film.description}
          rating={Number((film.rating?.kp ?? film.rating?.imdb)?.toFixed(1))}
          countries={film.countries?.map((b) => b.name)}
          genres={film.genres?.map((c) => c.name).join(", ")}
        />
      ));
    }

    if (randomFilmsData) {
      return (
        <CardMovie
          key={randomFilmsData.id}
          id={randomFilmsData.id}
          title={randomFilmsData.name}
          alternativeTitle={randomFilmsData.alternativeName}
          poster={randomFilmsData.poster?.url}
          year={randomFilmsData.year}
          description={randomFilmsData.description}
          rating={Number((randomFilmsData.rating?.kp ?? randomFilmsData.rating?.imdb)?.toFixed(1))}
          countries={randomFilmsData.countries?.map((b) => b.name)}
          genres={randomFilmsData.genres?.map((c) => c.name).join(", ")}
        />
      );
    }

    return <div className={styles.noResults}>Ничего не найдено.</div>;
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.titel}>
          {searchValue
            ? `Результаты поиска по запросу: "${searchValue}"`
            : shouldUseFilters
              ? "Результаты по фильтрам:"
              : "Возможно вам понравится:"}
        </h1>
        {searchValue && searchFilmsData?.docs?.length === 0 && (
          <div className={styles.noResults}>По вашему запросу ничего не найдено.</div>
        )}
      </div>

      <div className={styles.cards}>{renderFilms()}</div>

      {searchValue && (
        <div className={styles.pagination}>
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Назад
          </button>
          <span>Страница: {page}</span>
          <button
            disabled={page === searchFilmsData.pages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Вперёд
          </button>
        </div>
      )}

      {shouldUseFilters && filteredFilmsData?.pages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Назад
          </button>
          <span>Страница: {page}</span>
          <button
            disabled={page === filteredFilmsData.pages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Вперёд
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;