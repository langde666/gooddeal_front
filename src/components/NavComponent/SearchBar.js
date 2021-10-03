import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const SearchBar = (props) => {
    let location = useLocation();
    const search = location.search;
    const currentQuery = new URLSearchParams(search).get('keyword') || '';
    const pathname = location.pathname;
    const currentOption = pathname.split('/')[1] || 'products';

    const [query, setQuery] = useState(currentQuery);
    const [option, setOption] = useState(currentOption);

    let history = useHistory();

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSelectChange = (e) => {
        setOption(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (option != 'products' && option != 'stores' && option != 'users')
            return;
        if (query != '') {
            history.push(`/${option}/search?keyword=${query}`);
        }
    };

    return (
        <form
            className="search-bar m-0 input-group"
            onSubmit={handleFormSubmit}
        >
            <select
                className="form-select"
                value={option}
                onChange={handleSelectChange}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Tooltip on top"
            >
                <option value="products">Product</option>
                <option value="stores">Store</option>
                <option value="users">User</option>
            </select>

            <input
                className="form-control"
                type="search"
                placeholder="Search"
                value={query}
                onChange={handleInputChange}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Tooltip on top"
            />

            <button
                className="btn btn-outline-light text-white ripple"
                type="button"
                onClick={handleFormSubmit}
            >
                <i className="fas fa-search"></i>
            </button>
        </form>
    );
};

export default SearchBar;
