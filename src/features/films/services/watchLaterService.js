const WATCH_LATER_KEY = 'watchLaterFilms';

export const getWatchLater = () => {
  const stored = localStorage.getItem(WATCH_LATER_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addToWatchLater = (film) => {
  const current = getWatchLater();
  const exists = current.some(item => item.id === film.id);
  if (!exists) {
    const updated = [...current, film];
    localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(updated));
  }
};

export const removeFromWatchLater = (id) => {
  const updated = getWatchLater().filter(film => film.id !== id);
  localStorage.setItem(WATCH_LATER_KEY, JSON.stringify(updated));
};

export const isInWatchLater = (id) => {
  return getWatchLater().some(film => film.id === id);
};
