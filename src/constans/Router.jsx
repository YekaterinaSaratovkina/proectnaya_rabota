import { createBrowserRouter } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import { PageRoutes } from "./PageRoutes";
import Home from "../pages/Home/Home";
import WatchLater from "../pages/WatchLater/WatchLater"
import AboutTheFilm from "../pages/AboutTheFilm/AboutTheFilm"
import NotFound from "../pages/NotFound/NotFound";

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
                element: <WatchLater />,
            },
            {
                path: PageRoutes.DETAILS.MAIN,
                element: <AboutTheFilm />,
            },
            {
                path: '*', element: <NotFound />
            },
        ],
    }
]);

export default Router;