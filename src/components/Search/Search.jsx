import React, { useEffect, useState } from 'react';
import styles from './Search.module.css';
import { SearchIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce/useDebounce'

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("query") || "");
    useDebounce(search, 500);

    useEffect(() => {
        if (search) {
            setSearchParams({ query: search })
        } else {
            setSearchParams({});
        }
    }, [search, setSearchParams]);

    return (
        <div className={styles.wrapper}>
            <input
                type="search"
                className={styles.input}
                placeholder='Поиск...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles.iconWrapper}>
                <SearchIcon className={styles.icon} />
            </div>
        </div>
    )
}

export default Search