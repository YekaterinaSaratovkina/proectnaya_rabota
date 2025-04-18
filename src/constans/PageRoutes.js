const home = "/";

const CommonRoutes = {
    MAIN: home,
}

const favorites = "/favorites"

const ChosenRouter = {
    MAIN: favorites,
}

const details = "/film/:id"

const DetailsRouter = {
    MAIN: details,
}

export const PageRoutes = {
    COMMON: CommonRoutes,
    CHOSEN: ChosenRouter,
    DETAILS: DetailsRouter,
};