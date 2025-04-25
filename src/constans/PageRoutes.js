const home = "/";

const CommonRoutes = {
    MAIN: home,
}

const WatchLater = "/watch-later"

const ChosenRouter = {
    MAIN: WatchLater,
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