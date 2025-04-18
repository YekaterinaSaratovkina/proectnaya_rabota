import axios from "axios"
import { API_KEY, FILMS_URL } from "../../../../constans/api"

export const getRandomFilmsApi = async () => {
    const { data } = await axios.get(`${FILMS_URL}v1.4/movie/random?notNullFields=name&type=movie&year=2024-2025&rating.kp=7.0-10`, {
        headers: {
            "X-API-KEY": API_KEY,
        }
    }
    );
    return data;
}
// https://api.kinopoisk.dev/v1.4/movie/random?notNullFields=name&type=movie&year=2024-2025&rating.kp=7.0-10