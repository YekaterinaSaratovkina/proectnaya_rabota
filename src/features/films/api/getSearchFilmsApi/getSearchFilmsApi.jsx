import axios from "axios"
import { API_KEY, FILMS_URL } from "../../../../constans/api"

export const getSearchFilmsApi = async (searchValue, page = 1) => {

    const { data } = await axios.get(`${FILMS_URL}v1.4/movie/search?page=${page}&limit=10&query=${searchValue}`, {
        headers: {
            "X-API-KEY": API_KEY,
        },
    }
    );
    return data;
}