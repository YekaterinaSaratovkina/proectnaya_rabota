import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounceValue(value)
        }, delay)

        return () => {
            clearTimeout(timeout);
        }
    }, [value, delay]);

    return debounceValue;
}

export default useDebounce;