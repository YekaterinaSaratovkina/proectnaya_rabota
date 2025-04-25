import axios from "axios"
import { API_KEY, FILMS_URL } from "../../../../constans/api"

export const getFilmByIdApi = async (id) => {
    const { data } = await axios.get(`${FILMS_URL}v1.4/movie/${id}`, {
        headers: {
            "X-API-KEY": API_KEY,
        }
    }
    );
    return data;
}