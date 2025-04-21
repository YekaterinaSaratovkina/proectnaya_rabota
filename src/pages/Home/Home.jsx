import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { useQuery } from '@tanstack/react-query';
import { getRandomFilmsApi } from '../../features/films/api/getRandomFilmsApi/getRandomFilmsApi';
import CardMovie from '../../components/CardMovie/CardMovie';
import { getSearchFilmsApi } from '../../features/films/api/getSearchFilmsApi/getSearchFilmsApi';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const searchValue = searchParams.get("query");

  const { data: randomFilmsData, isLoading: filmsIsLoading } = useQuery({
    queryKey: ["randomFilms"],
    queryFn: getRandomFilmsApi,
    enabled: !searchValue,
  });

  const { data: searchFilmsData, isLoading: searchIsLoading } = useQuery({
    queryKey: ["searchFilms", searchValue, page],
    queryFn: () => getSearchFilmsApi(searchValue, page),
    enabled: !!searchValue,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, searchValue]);

  if (filmsIsLoading || searchIsLoading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.titel}>
          {searchValue
            ? `Результаты поиска по запросу: "${searchValue}"`
            : "Возможно вам понравится:"}
        </h1>
        {searchValue && searchFilmsData?.docs.length === 0 && (
          <div className={styles.noResults}>По вашему запросу ничего не найдено.</div>
        )}
      </div>

      {searchFilmsData && searchFilmsData.docs.length > 0 ? (
        <>
          <div className={styles.cards}>
            {searchFilmsData.docs.map((film) => (
              <CardMovie
                key={film.id}
                title={film.name}
                alternativeTitle={film.alternativeName}
                poster={film.poster?.url}
                year={film.year}
                description={film.description}
                persons={film.persons?.map((a) => a.name).join(", ")}
                rating={film.rating?.imdb}
                countries={film.countries?.map((b) => b.name)}
                genres={film.genres?.map((c) => c.name).join(", ")}
              />
            ))}
          </div>
        </>
      ) : (
        randomFilmsData && (
          <CardMovie
            key={randomFilmsData.id}
            title={randomFilmsData.name}
            alternativeTitle={randomFilmsData.alternativeName}
            poster={randomFilmsData.poster?.url}
            year={randomFilmsData.year}
            description={randomFilmsData.description}
            persons={randomFilmsData.persons?.map((a) => a.name).join(", ")}
            rating={randomFilmsData.rating?.imdb}
            countries={randomFilmsData.countries?.map((b) => b.name)}
            genres={randomFilmsData.genres?.map((c) => c.name).join(", ")}
          />
        )
      )}
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
    </div>
  );
};

export default Home;
//переход на рандомный фильм при удалении параметров поиска
// перенос кнопок и дизайн
// переход к началу страницы при перелистывании страницы