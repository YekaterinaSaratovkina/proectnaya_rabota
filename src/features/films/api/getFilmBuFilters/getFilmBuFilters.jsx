import axios from 'axios';
import { API_KEY, FILMS_URL } from "../../../../constans/api";

export const getFilmByFilters = async (filters) => {
  console.log("Отправка фильтров в API:", filters);
  const params = new URLSearchParams();

  params.set("page", "1");
  params.set("limit", "10");
  params.set("type", "movie");

  if (filters.rating) params.set("rating.kp", filters.rating);
  if (filters.age) params.set("ageRating", filters.age);
  if (filters.genre) params.set("genres.name", filters.genre);
  if (filters.country) params.set("countries.name", filters.country);

  const { data } = await axios.get(`${FILMS_URL}v1.4/movie?${params.toString()}`, {
    headers: {
      'X-API-KEY': API_KEY,
    },
  });

  console.log("ФИНАЛЬНЫЙ URL: ", `${FILMS_URL}v1.4/movie?${params.toString()}`);
  console.log("ДАННЫЕ: ", data);
  return data;

};
