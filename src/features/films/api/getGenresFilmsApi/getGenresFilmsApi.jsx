import axios from "axios"
import { API_KEY, FILMS_URL } from "../../../../constans/api"

export const getGenresFilmsApi = async () => {
    const { data } = await axios.get(`${FILMS_URL}v1/movie/possible-values-by-field?field=genres.name`, {
        headers: {
            "X-API-KEY": API_KEY,
        }
    }
    );
    
    return data;
}
//https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name