import axios from 'axios';
import { API_KEY, FILMS_URL } from "../../../../constans/api";

export const getFilmByFilters = async (filters, page = 1) => {
  const params = new URLSearchParams();

  params.set("page", page.toString());
  params.set("limit", "10");
  params.set("type", "movie");

  if (filters.rating) params.set("rating.kp", filters.rating);
  if (filters.age) params.set("ageRating", filters.age);
  if (filters.genre) params.set("genres.name", filters.genre);
  if (filters.country) params.set("countries.name", filters.country);
  if (filters.year) params.set("year", filters.year);

  const { data } = await axios.get(`${FILMS_URL}v1.4/movie?${params.toString()}`, {
    headers: {
      'X-API-KEY': API_KEY,
    },
  });

  return data;
};