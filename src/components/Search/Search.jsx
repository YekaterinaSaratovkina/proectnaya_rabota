import React, { useEffect, useState } from 'react';
import styles from './Search.module.css';
import { SearchIcon, X } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce/useDebounce';

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState(searchParams.get("query") || "");
    const debouncedSearch = useDebounce(search, 500);

    const handleSearchSubmit = () => {
        const currentParams = Object.fromEntries(searchParams.entries());

        if (search) {
            const newParams = { ...currentParams, query: search };

            if (location.pathname !== '/') {
                navigate({
                    pathname: '/',
                    search: `?${new URLSearchParams(newParams).toString()}`
                });
            } else {
                setSearchParams(newParams);
            }
        } else {
            const { query, ...rest } = currentParams;
            setSearchParams(rest);
        }
    };

    useEffect(() => {
        handleSearchSubmit();
    }, [debouncedSearch]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    return (
        <div className={styles.wrapper}>
            <input
                type="search"
                className={styles.input}
                placeholder='Поиск...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            {search && (
                <div
                    className={styles.clearIconWrapper}
                    onClick={() => setSearch("")}
                    role="button"
                    tabIndex={0}
                >
                    <X className={styles.clearIcon} />
                </div>
            )}
            <div
                className={styles.iconWrapper}
                onClick={handleSearchSubmit}
                role="button"
                tabIndex={0}
            >
                <SearchIcon className={styles.icon} />
            </div>
        </div>
    );
};

export default Search;