export const getSearchFilmsApi = async ({ year, genre, rating, age }) => {
    const { data } = await axios.get(`${FILMS_URL}v1.4/movie`, {
      params: {
        page: 1,
        limit: 10,
        type: 'movie',
        year,
        'rating.kp': rating,
        ageRating: age,
        'genres.name': genre,
      },
      headers: {
        'X-API-KEY': API_KEY,
      },
    });
  
    return data;
  };
  