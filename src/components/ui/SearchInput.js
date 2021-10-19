import React, { useState, useRef } from 'react';

const SearchInput = ({ onChange = () => { } }) => {
    const [keyword, setKeyword] = useState('');
    const typingTimeoutRef = useRef(null);

    const handleChangeKeyword = (e) => {
        const value = e.target.value;
        setKeyword(value);

        if (!onChange) return;

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            onChange(value);
        }, 600);
    }

    return (
        <input
            className="form-control mb-3"
            type="search"
            placeholder="Search"
            style={{ maxWidth: '300px' }}
            value={keyword}
            onChange={handleChangeKeyword} />
    )
}

export default SearchInput;