import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import { PageRoutes } from "./PageRoutes";
import Home from "../pages/Home/Home";
import Favorites from "../pages/Favorites/Favorites"
import AboutTheFilm from "../pages/AboutTheFilm/AboutTheFilm"

const Router = createBrowserRouter([
    {
        path: "/",
        element: <PageLayout />,
        children: [
            {
                path: PageRoutes.COMMON.MAIN,
                element: <Home />,
            },
            {
                path: PageRoutes.CHOSEN.MAIN,
                element: <Favorites />,
            },
            {
                path: PageRoutes.DETAILS.MAIN,
                element: <AboutTheFilm />,
            },
        ],
    }
]);

export default Router;